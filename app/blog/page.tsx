import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { blogPosts } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Blog for URL Shortener, QR Codes, and Link Analytics",
  description:
    "Read practical guides about QR code tracking, branded short links, campaign analytics, and URL shortener comparisons.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog for URL Shortener, QR Codes, and Link Analytics",
    description:
      "Read practical guides about QR code tracking, branded short links, campaign analytics, and URL shortener comparisons.",
    url: "https://urlsy.cc/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog for URL Shortener, QR Codes, and Link Analytics",
    description:
      "Read practical guides about QR code tracking, branded short links, campaign analytics, and URL shortener comparisons.",
  },
};

const intentLabel: Record<(typeof blogPosts)[number]["searchIntent"], string> = {
  commercial: "Commercial",
  informational: "Informational",
  transactional: "Transactional",
};

function topicGlyph(topic?: string) {
  const normalized = (topic ?? "").toLowerCase();
  if (normalized.includes("qr")) return "▦";
  if (normalized.includes("analytics")) return "◫";
  if (normalized.includes("brand")) return "◎";
  if (normalized.includes("compare")) return "↔";
  return "✦";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(value),
  );
}

export default function BlogIndexPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const standardPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);
  const topics = Array.from(new Set(blogPosts.map((post) => post.topic).filter(Boolean)));

  return (
    <PublicPageShell
      kicker="Blog"
      subtitle="Deep guides for creators, marketers, and agencies focused on branded links and measurable growth."
      title="Field guides for link strategy, analytics, and growth experiments"
    >
      <div className="space-y-8">
        <section aria-labelledby="featured-article" className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Kicker className="text-black">Featured article</Kicker>
            <span className="inline-flex rounded-full border-2 border-[var(--stroke)] bg-[var(--bg-hero)] px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-black">
              {intentLabel[featuredPost.searchIntent]}
            </span>
          </div>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="hover-lift grid overflow-hidden border-4 border-[var(--stroke)] bg-[var(--surface-1)] shadow-[4px_4px_0_0_#111] lg:grid-cols-[1.12fr_1fr]"
          >
            <div className="relative min-h-[240px] bg-[#d6d7d2] lg:min-h-[330px]">
              <Image
                src={featuredPost.coverImage ?? "/og.png"}
                alt={featuredPost.coverAlt ?? featuredPost.title}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-[var(--bg-hero)]/45" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 border-2 border-black bg-white/95 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-black">
                <span className="text-sm leading-none">{topicGlyph(featuredPost.topic)}</span>
                <span>{featuredPost.topic ?? "Growth"}</span>
              </div>
            </div>
            <div className="space-y-5 bg-[var(--surface-2)] p-6 sm:p-8">
              <h2 id="featured-article" className="text-3xl font-black leading-[1.08] tracking-[-0.03em] sm:text-[2.4rem]">
                {featuredPost.h1}
              </h2>
              <p className="text-sm leading-7 text-[var(--text-muted)] sm:text-base">{featuredPost.description}</p>
              <div className="grid gap-2 border-y-2 border-[var(--stroke)] py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-black/70 sm:grid-cols-3">
                <span>{featuredPost.topic ?? "Growth"}</span>
                <span>{featuredPost.readTime ?? "6 min read"}</span>
                <span>{formatDate(featuredPost.publishedAt)}</span>
              </div>
              <span className="inline-flex border-2 border-[var(--stroke)] bg-black px-5 py-3 text-sm font-black uppercase tracking-[0.11em] text-white">
                Read featured story
              </span>
            </div>
          </Link>
        </section>

        {topics.length ? (
          <section className="space-y-3" aria-label="Browse by topic">
            <Kicker className="text-black">Browse by topic</Kicker>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex rounded-full border-2 border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-black/75"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="article-library">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="article-library" className="text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">
              Article library
            </h2>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {blogPosts.length} published
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {standardPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`hover-lift flex h-full flex-col border-2 border-[var(--stroke)] bg-[var(--surface-1)] shadow-[3px_3px_0_0_#111] motion-fade-up ${
                  index < 3 ? `motion-delay-${index + 1}` : ""
                }`}
              >
                <div className="relative h-44 border-b-2 border-[var(--stroke)] bg-[#d6d7d2]">
                  <Image
                    src={post.coverImage ?? "/og.png"}
                    alt={post.coverAlt ?? post.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-[var(--bg-hero)]/35" />
                  <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border-2 border-black bg-white text-lg font-black text-black">
                    {topicGlyph(post.topic)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <span className="border border-[var(--stroke)] px-2 py-0.5">{intentLabel[post.searchIntent]}</span>
                    <span>{post.topic ?? "Growth"}</span>
                    <span>{post.readTime ?? "6 min read"}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-[1.13] tracking-[-0.02em]">{post.h1}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-muted)]">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t-2 border-[var(--stroke)] pt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="text-black">Read article</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
