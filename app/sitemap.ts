import type { MetadataRoute } from "next";
import {
  blogPosts,
  comparisonPages,
  featurePages,
  useCasePages,
} from "@/lib/marketing-content";

export const revalidate = 86400;

const FALLBACK_LAST_MODIFIED = "2026-01-01";

function toSafeDate(value: string, fallback: string = FALLBACK_LAST_MODIFIED): Date {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  const fallbackParsed = new Date(fallback);
  if (!Number.isNaN(fallbackParsed.getTime())) {
    return fallbackParsed;
  }

  return new Date(FALLBACK_LAST_MODIFIED);
}

const staticPageLastModified: Record<string, string> = {
  "/": "2026-04-08",
  "/compare": "2026-04-08",
  "/features": "2026-04-08",
  "/use-cases": "2026-04-08",
  "/blog": "2026-04-08",
  "/privacy": "2026-04-08",
  "/terms": "2026-04-08",
  "/cookies": "2026-04-08",
  "/contact": "2026-04-08",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://urlsy.cc";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: toSafeDate(staticPageLastModified["/"]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: toSafeDate(staticPageLastModified["/compare"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: toSafeDate(staticPageLastModified["/features"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: toSafeDate(staticPageLastModified["/use-cases"]),
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: toSafeDate(staticPageLastModified["/blog"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: toSafeDate(staticPageLastModified["/privacy"]),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: toSafeDate(staticPageLastModified["/terms"]),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: toSafeDate(staticPageLastModified["/cookies"]),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: toSafeDate(staticPageLastModified["/contact"]),
      changeFrequency: "yearly",
      priority: 0.45,
    },
    ...featurePages.map((page) => ({
      url: `${baseUrl}/features/${page.slug}`,
      lastModified: toSafeDate(page.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...comparisonPages.map((page) => ({
      url: `${baseUrl}/compare/${page.slug}`,
      lastModified: toSafeDate(page.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...useCasePages.map((page) => ({
      url: `${baseUrl}/use-cases/${page.slug}`,
      lastModified: toSafeDate(page.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.74,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: toSafeDate(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
