import { PostHog } from "posthog-node";

type IdentifyPayload = {
  distinctId: string;
  properties?: Record<string, unknown>;
};

type CapturePayload = {
  distinctId: string;
  event: string;
  properties?: Record<string, unknown>;
};

type PostHogLike = {
  identify: (payload: IdentifyPayload) => void;
  capture: (payload: CapturePayload) => void;
};

class NoopPostHog implements PostHogLike {
  identify() {}
  capture() {}
}

let client: PostHogLike | null = null;

export function getPostHogClient(): PostHogLike {
  if (client) return client;

  const apiKey = process.env.POSTHOG_API_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    client = new NoopPostHog();
    return client;
  }

  client = new PostHog(apiKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}
