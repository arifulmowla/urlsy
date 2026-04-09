import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async headers() {
    const securityHeaders = [
      { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; img-src 'self' data: https: blob:; font-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https: wss:; form-action 'self';" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    const marketingCacheHeaders = [
      { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: marketingCacheHeaders,
      },
      {
        source: "/blog/:path*",
        headers: marketingCacheHeaders,
      },
      {
        source: "/features/:path*",
        headers: marketingCacheHeaders,
      },
      {
        source: "/compare/:path*",
        headers: marketingCacheHeaders,
      },
      {
        source: "/use-cases/:path*",
        headers: marketingCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
