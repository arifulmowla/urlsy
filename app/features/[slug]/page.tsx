import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { SignupPanel } from "@/app/components/marketing/MarketingBlocks";
import { featurePageBySlug, featurePages } from "@/lib/marketing-content";

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getFeatureImage(slug: string) {
  if (slug === "qr-codes") return "/QR_code.svg";
  return "/og.png";
}

export function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = featurePageBySlug[slug];
  if (!page) return {};

  const image = getFeatureImage(page.slug);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/features/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://urlsy.cc/features/${page.slug}`,
      type: "article",
      images: [{ url: image, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const page = featurePageBySlug[slug];
  if (!page) notFound();

  const image = getFeatureImage(page.slug);
  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      image: [`https://urlsy.cc${image}`],
      url: `https://urlsy.cc/features/${page.slug}`,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      keywords: [page.primaryKeyword, ...page.secondaryKeywords].join(", "),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://urlsy.cc/features/${page.slug}`,
      },
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "urlsy.cc", url: "https://urlsy.cc" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://urlsy.cc" },
        { "@type": "ListItem", position: 2, name: "Features", item: "https://urlsy.cc/features" },
        { "@type": "ListItem", position: 3, name: page.h1, item: `https://urlsy.cc/features/${page.slug}` },
      ],
    },
  ];

  if (page.faq?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
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
      kicker={page.kicker}
      subtitle={page.heroSubtitle}
      title={page.heroTitle}
      contentFramed={false}
    >
      {structuredData.map((item, index) => (
        <script
          key={`feature-schema-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <article className="space-y-8">
        <header className="grid gap-0 border-4 border-[var(--stroke)] bg-[var(--surface-1)] shadow-[4px_4px_0_0_#111] lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-5 border-b-4 border-[var(--stroke)] bg-[var(--surface-2)] p-6 sm:p-8 lg:border-b-0 lg:border-r-4">
            <h2 className="text-3xl font-black leading-[1.08] tracking-[-0.03em] sm:text-[2.3rem]">{page.h1}</h2>
            <p className="text-sm leading-7 text-black/80 sm:text-base">{page.intro}</p>
            <div className="grid gap-2 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-black/70 sm:grid-cols-2">
              <span>{page.primaryKeyword}</span>
              <span>Updated {formatDate(page.updatedAt)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {page.secondaryKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex border-2 border-[var(--stroke)] bg-[var(--surface-1)] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-black/75"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] bg-[#d6d7d2] sm:min-h-[320px]">
            <Image src={image} alt={page.title} fill className="object-cover object-center" sizes="(min-width: 1024px) 48vw, 100vw" priority />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <section className="border-4 border-[var(--stroke)] bg-[var(--bg-hero)] p-5 shadow-[4px_4px_0_0_#111] sm:p-7">
              <h3 className="text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">Why teams use this</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {page.benefits.map((item, index) => (
                  <article
                    key={item}
                    className="border-l-4 border-[var(--stroke)] bg-white/75 px-4 py-3"
                  >
                    <p className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[var(--text-muted)]">Benefit {index + 1}</p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-black sm:text-base">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-4 border-[var(--stroke)] bg-[var(--surface-2)] p-5 shadow-[4px_4px_0_0_#111] sm:p-7">
              <h3 className="text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">Where it fits best</h3>
              <ul className="mt-5 space-y-0 divide-y-2 divide-black/15 bg-white/70">
                {page.useCases.map((item) => (
                  <li key={item} className="flex items-start gap-3 p-4">
                    <span className="mt-1 inline-block h-3 w-3 shrink-0 bg-black" />
                    <span className="text-sm leading-7 text-black/90 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-4 border-[var(--stroke)] bg-[var(--surface-1)] p-5 shadow-[4px_4px_0_0_#111] sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">Keep exploring</h3>
                <Link
                  href="/login"
                  className="focus-ring inline-flex border-2 border-[var(--stroke)] bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white"
                >
                  Start free
                </Link>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover-lift border-l-4 border-[var(--stroke)] bg-[var(--surface-2)] p-4"
                  >
                    <h4 className="text-lg font-black tracking-tight">{link.label}</h4>
                    <p className="mt-2 text-sm leading-6 text-black/80">{link.description}</p>
                    <span className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-black">
                      Explore
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="border-4 border-[var(--stroke)] bg-black p-4 text-white shadow-[4px_4px_0_0_#111]">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-white/70">Quick value</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-white/85">
                {page.benefits.slice(0, 3).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
            {page.faq?.length ? (
              <section className="border-4 border-[var(--stroke)] bg-[var(--surface-1)] p-4 shadow-[4px_4px_0_0_#111]">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-[var(--text-muted)]">FAQ</p>
                <ul className="mt-3 divide-y-2 divide-black/15">
                  {page.faq.map((item) => (
                    <li key={item.question}>
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-bold leading-6 text-black marker:hidden">
                          <span>{item.question}</span>
                          <span
                            aria-hidden
                            className="shrink-0 bg-[var(--surface-2)] px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-[0.12em] text-black"
                          >
                            <span className="group-open:hidden">Open</span>
                            <span className="hidden group-open:inline">Close</span>
                          </span>
                        </summary>
                        <p className="pb-3 text-sm leading-6 text-black/80">
                          {item.answer}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>

        <SignupPanel
          body="Create branded short links, launch QR campaigns, and keep analytics tied to the same workflow."
          title="Start using urlsy.cc for measurable campaigns"
        />
      </article>
    </PublicPageShell>
  );
}
