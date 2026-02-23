import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth-user";
import { normalizeUrl } from "@/lib/url";
import { canUseExpiry } from "@/lib/plans";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

const updateSchema = z.object({
  url: z.string().optional(),
  expiresAt: z.union([z.string(), z.null()]).optional(),
});

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest, context: RouteContext) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return unauthorized();

  const { id } = await Promise.resolve(context.params);
  const link = await db.link.findFirst({
    where: { id, ownerUserId: userId },
    select: {
      id: true,
      code: true,
      targetUrl: true,
      createdAt: true,
      expiresAt: true,
      _count: {
        select: {
          clicks: true,
        },
      },
    },
  });

  if (!link) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    id: link.id,
    code: link.code,
    targetUrl: link.targetUrl,
    createdAt: link.createdAt.toISOString(),
    expiresAt: link.expiresAt?.toISOString() ?? null,
    clickCount: link._count.clicks,
  });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const userId = await getUserIdFromRequest(_request);

  if (!userId) {
    return unauthorized();
  }

  const { id } = await Promise.resolve(context.params);
  const result = await db.link.deleteMany({
    where: {
      id,
      ownerUserId: userId,
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { url, expiresAt } = parsed.data;
  if (typeof url === "undefined" && typeof expiresAt === "undefined") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { planTier: true },
  });
  const plan = user?.planTier ?? "FREE";

  const updateData: { targetUrl?: string; expiresAt?: Date | null } = {};

  if (typeof url !== "undefined") {
    const normalized = normalizeUrl(url);
    if (!normalized.ok) {
      return NextResponse.json({ error: "invalid_url" }, { status: 400 });
    }
    updateData.targetUrl = normalized.url;
  }

  if (typeof expiresAt !== "undefined") {
    if (expiresAt === null || expiresAt === "") {
      updateData.expiresAt = null;
    } else {
      if (!canUseExpiry(plan)) {
        return NextResponse.json({ error: "pro_required" }, { status: 402 });
      }
      const parsedDate = new Date(expiresAt);
      const now = new Date();
      if (Number.isNaN(parsedDate.getTime()) || parsedDate <= now) {
        return NextResponse.json({ error: "invalid_expires_at" }, { status: 400 });
      }
      updateData.expiresAt = parsedDate;
    }
  }

  const { id } = await Promise.resolve(context.params);
  const updated = await db.link.updateMany({
    where: { id, ownerUserId: userId },
    data: updateData,
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const refreshed = await db.link.findFirst({
    where: { id, ownerUserId: userId },
    select: {
      id: true,
      code: true,
      targetUrl: true,
      createdAt: true,
      expiresAt: true,
    },
  });

  if (!refreshed) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    id: refreshed.id,
    code: refreshed.code,
    targetUrl: refreshed.targetUrl,
    createdAt: refreshed.createdAt.toISOString(),
    expiresAt: refreshed.expiresAt?.toISOString() ?? null,
  });
}
