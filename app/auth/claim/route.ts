import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPostHogClient } from "@/lib/posthog-server";

const GUEST_TOKEN_COOKIE = "lm_guest_token";

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const guestToken = request.cookies.get(GUEST_TOKEN_COOKIE)?.value;
  if (guestToken) {
    await db.link.updateMany({
      where: {
        ownerUserId: null,
        guestToken,
      },
      data: {
        ownerUserId: userId,
        guestToken: null,
      },
    });
  }

  const posthog = getPostHogClient();
  posthog.identify({
    distinctId: userId,
    properties: {
      email: session.user?.email ?? undefined,
      name: session.user?.name ?? undefined,
    },
  });
  posthog.capture({
    distinctId: userId,
    event: "user_signed_in",
    properties: {
      provider: "google",
      claimed_guest_links: Boolean(guestToken),
    },
  });

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set({
    name: GUEST_TOKEN_COOKIE,
    value: "",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
