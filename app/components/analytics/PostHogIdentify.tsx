"use client";

import posthog from "posthog-js";
import { useEffect, useRef } from "react";

type PostHogIdentifyProps = {
  userId: string;
  email?: string | null;
  name?: string | null;
};

export function PostHogIdentify({ userId, email, name }: PostHogIdentifyProps) {
  const identifiedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (!userId || identifiedRef.current === userId) return;

    posthog.identify(userId, {
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    });
    identifiedRef.current = userId;
  }, [userId, email, name]);

  return null;
}
