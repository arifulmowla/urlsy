"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

type PostHogProviderProps = {
  children: ReactNode;
};

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function PostHogProvider({ children }: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);
  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!key || initializedRef.current) return;

    // Always-on tracking requested; update legal/cookie copy if policy scope changes later.
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
      autocapture: true,
      capture_pageview: false,
      capture_pageleave: true,
    });

    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!key || !initializedRef.current || !pathname) return;

    const query = searchParams?.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    if (lastUrlRef.current === currentUrl) return;

    posthog.capture("$pageview", {
      $current_url: `${window.location.origin}${currentUrl}`,
    });
    lastUrlRef.current = currentUrl;
  }, [pathname, searchParams]);

  return <>{children}</>;
}
