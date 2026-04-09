import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { SignupPanel } from "@/app/components/marketing/MarketingBlocks";
import { blogPostBySlug, blogPosts } from "@/lib/marketing-content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) return {};

  const image = post.coverImage ?? "/og.png";
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://urlsy.cc/blog/${post.slug}`,
      type: "article",
      images: [{ url: image, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  if (!post) notFound();

  const image = post.coverImage ?? "/og.png";
  const isAlternativeArticle =
    post.slug.includes("alternative") ||
    post.primaryKeyword.includes("alternative") ||
    post.secondaryKeywords.some((keyword) => keyword.includes("alternative"));
  const isQrArticle =
    (post.topic ?? "").toLowerCase().includes("qr") ||
    post.primaryKeyword.includes("qr");
  const tocEntries = post.sections.map((section) => ({
    id: slugify(section.title),
    title: section.title,
  }));
  const comparisonVisualRows = [
    { label: "Brand control", urlsy: 5, typical: 3 },
    { label: "Campaign analytics", urlsy: 5, typical: 3 },
    { label: "QR workflow support", urlsy: 4, typical: 2 },
    { label: "Ease of rollout", urlsy: 5, typical: 3 },
  ];

  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [`https://urlsy.cc${image}`],
      url: `https://urlsy.cc/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://urlsy.cc/blog/${post.slug}`,
      },
      author: {
        "@type": "Person",
        name: post.authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "urlsy.cc",
        url: "https://urlsy.cc",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://urlsy.cc" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://urlsy.cc/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: post.h1,
          item: `https://urlsy.cc/blog/${post.slug}`,
        },
      ],
    },
  ];

  if (post.faq?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <PublicPageShell
      kicker={post.kicker}
      subtitle={post.description}
      title={post.h1}
      contentFramed={false}
    >
      {structuredData.map((item, index) => (
        <script
          key={`blog-schema-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <article className="space-y-10">
        <header className="editorial-shell space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-[var(--text-muted)]">
            <span className="border-2 border-[var(--stroke)] bg-[var(--bg-hero)] px-2 py-1 text-black">
              {post.topic ?? "Growth"}
            </span>
            <span>{post.readTime ?? "6 min read"}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>Updated {formatDate(post.updatedAt)}</span>
          </div>

          <div className="grid gap-4 py-2 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                By {post.authorName}
                {post.authorRole ? ` · ${post.authorRole}` : ""}
              </p>
              <p className="mt-3 text-base leading-8 text-black/80">{post.intro}</p>
            </div>
            <div className="flex items-start">
              <Link
                href="/login"
                className="focus-ring inline-flex border-2 border-[var(--stroke)] bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.13em] text-white"
              >
                Start free
              </Link>
            </div>
          </div>

          <div className="relative h-56 overflow-hidden border-4 border-[var(--stroke)] bg-[#d6d7d2] sm:h-80">
            <Image
              src={image}
              alt={post.coverAlt ?? post.title}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 65vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[var(--bg-hero)]/40" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 border-2 border-black bg-white/95 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-black">
              <span className="text-base leading-none">{isQrArticle ? "▦" : "◫"}</span>
              <span>{post.topic ?? "Growth"}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-8">
            {isAlternativeArticle ? (
            <section className="relative overflow-hidden border-4 border-[var(--stroke)] bg-black p-5 text-white shadow-[4px_4px_0_0_#111] sm:p-7">
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[var(--bg-hero)]/20 blur-2xl" />
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">
                    Quick comparison signal map
                  </h2>
                  <span className="border-2 border-white/35 bg-white/10 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/90">
                    Visual guide
                  </span>
                </div>

                <div className="space-y-4">
                  {comparisonVisualRows.map((row) => (
                    <article key={row.label} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold uppercase tracking-[0.03em] text-white sm:text-base">{row.label}</p>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/70">
                          URLsy {row.urlsy}/5 · Typical {row.typical}/5
                        </p>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="h-2.5 overflow-hidden border border-white/20 bg-white/10">
                          <div className="h-full bg-[var(--bg-hero)]" style={{ width: `${row.urlsy * 20}%` }} />
                        </div>
                        <div className="h-2.5 overflow-hidden border border-white/20 bg-white/10">
                          <div className="h-full bg-white/55" style={{ width: `${row.typical * 20}%` }} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-white/85 sm:text-base">
                  Use this as a quick visual filter, then validate the final decision against your real campaign workflow.
                </p>
              </section>
            ) : null}

            {post.keyTakeaways?.length ? (
              <section className="editorial-subtle relative overflow-hidden border-l-4 border-[var(--stroke)] bg-[var(--bg-hero)]/30">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--bg-hero)]/50 blur-xl" />
                <h2 className="text-[1.5rem] font-black uppercase tracking-[-0.02em]">Key takeaways</h2>
                <ul className="mt-4 space-y-2">
                  {post.keyTakeaways.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-7 text-black/90 sm:text-base">
                      <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-black" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="space-y-12 pt-1">
              <div className="space-y-12">
                {post.sections.map((section, sectionIndex) => {
                  const id = slugify(section.title);
                  return (
                    <section id={id} key={section.title} className="scroll-mt-28">
                      <h2 className="text-[1.95rem] font-black leading-[1.08] tracking-[-0.02em]">{section.title}</h2>
                      <div className="space-y-4">
                        {section.body.map((paragraph, idx) => (
                          <p key={`${id}-${idx + 1}`} className="text-[1.03rem] leading-8 text-black/85">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {sectionIndex < post.sections.length - 1 ? (
                        <div className="editorial-divider mt-8" />
                      ) : null}
                    </section>
                  );
                })}
              </div>
            </section>

            {post.faq?.length ? (
              <section className="pt-2">
                <h2 className="text-2xl font-black uppercase tracking-[-0.02em]">FAQ</h2>
                <div className="editorial-divider mt-4 divide-y-2 divide-black/10">
                  {post.faq.map((item) => (
                    <details key={item.question} className="group py-4">
                      <summary className="cursor-pointer list-none pr-6 text-base font-black leading-6 text-black">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-[1rem] leading-7 text-black/80">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="pt-2">
              <h2 className="text-2xl font-black uppercase tracking-[-0.02em]">Related next steps</h2>
              <div className="editorial-divider mt-4 divide-y divide-black/10">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block py-4"
                  >
                    <h3 className="text-lg font-black tracking-tight underline decoration-transparent underline-offset-4 transition group-hover:decoration-black">
                      {link.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-black/80">{link.description}</p>
                    <span className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-black/70">
                      Explore →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="editorial-section space-y-5">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-black/65">
                On this page
              </p>
              <ul className="mt-3 space-y-2">
                {tocEntries.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className="focus-ring inline-flex text-sm font-bold leading-6 underline underline-offset-4 hover:text-black/75"
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="editorial-divider pt-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-black/65">Checklist</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-black/85">
                  <li>Build one link per channel and creative.</li>
                  <li>Use naming that supports reporting first.</li>
                  <li>Review winners weekly and scale fast.</li>
                </ul>
              </div>

              <div className="editorial-divider pt-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-black/65">Visual cue</p>
                <div className="editorial-subtle mt-3 flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 border-2 border-[var(--stroke)] bg-white">
                    <Image
                      src={isQrArticle ? "/QR_code.svg" : "/star.svg"}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/80">
                    Keep links and attribution architecture aligned before launch.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <SignupPanel
          body="Apply these ideas with branded short links, QR codes, and analytics in one campaign workflow."
          title="Turn the strategy into tracked links"
        />
      </article>
    </PublicPageShell>
  );
}
