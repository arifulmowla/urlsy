import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { SignupPanel } from "@/app/components/marketing/MarketingBlocks";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { HeroMockCard } from "@/app/components/home/HeroMockCard";
import { comparisonPageBySlug, comparisonPages } from "@/lib/marketing-content";

type ComparisonPageProps = {
  params: Promise<{ slug: string }>;
};

type CompareEnhancement = {
  quickTitle: string;
  quickBullets: string[];
  analyticsTitle: string;
  analyticsBody: string;
  metrics: Array<{ label: string; value: string; accent?: boolean }>;
  sources: Array<{ label: string; href: string }>;
};

const compareEnhancements: Partial<Record<string, CompareEnhancement>> = {
  "bitly-alternative": {
    quickTitle: "Bitly vs URLsy: decision snapshot",
    quickBullets: [
      "Bitly custom domains and custom links are available on paid tiers.",
      "Bitly analytics include clicks/scans by location, device, and referrer.",
      "Bitly QR analytics include scan trends by day, browser, and OS.",
    ],
    analyticsTitle: "No fluff, just telemetry",
    analyticsBody:
      "For teams comparing Bitly alternatives, the practical decision is usually branded-domain control plus how quickly click and scan signals can be interpreted across campaigns.",
    metrics: [
      { label: "Custom domains", value: "Paid plans", accent: true },
      { label: "Link + QR analytics", value: "Available" },
      { label: "Referrer reporting", value: "Available" },
      { label: "API workflow", value: "Documented", accent: true },
    ],
    sources: [
      {
        label: "Bitly custom domain support",
        href: "https://support.bitly.com/hc/en-us/articles/230558107-What-is-a-custom-domain",
      },
      {
        label: "Bitly analytics metrics",
        href: "https://support.bitly.com/hc/en-us/articles/20370474672141-What-metrics-are-available-in-Bitly",
      },
      {
        label: "Bitly QR scan data",
        href: "https://support.bitly.com/hc/en-us/articles/12203216582925-How-do-I-view-scan-data-for-a-Bitly-Code",
      },
    ],
  },
  "rebrandly-alternative": {
    quickTitle: "Rebrandly vs URLsy: brand-first comparison",
    quickBullets: [
      "Rebrandly includes branded links plus destination editing, expiration, and password controls.",
      "Rebrandly analytics include clicks, geography, devices, referrers, and real-time views.",
      "Rebrandly API analytics expose fields such as clicks, sessions, and lastClickAt.",
    ],
    analyticsTitle: "Brand + analytics operating view",
    analyticsBody:
      "In Rebrandly-style evaluations, teams typically compare brand-domain operations and the quality of segmentation by geography, device, referrer, and timeframe.",
    metrics: [
      { label: "Destination controls", value: "Available", accent: true },
      { label: "Realtime reporting", value: "Available" },
      { label: "Geo/device/referrer", value: "Available" },
      { label: "Analytics API", value: "Available", accent: true },
    ],
    sources: [
      {
        label: "Rebrandly branded links",
        href: "https://www.rebrandly.com/branded-links",
      },
      {
        label: "Rebrandly analytics help",
        href: "https://support.rebrandly.com/hc/en-us/articles/13583667895581-What-are-Rebrandly-Analytics",
      },
      {
        label: "Rebrandly link analytics API",
        href: "https://developers.rebrandly.com/docs/link-analytics",
      },
    ],
  },
  "tinyurl-alternative": {
    quickTitle: "TinyURL vs URLsy: capability upgrade snapshot",
    quickBullets: [
      "TinyURL supports custom aliases for campaign-readable short links.",
      "TinyURL branded domains are listed as paid-plan functionality.",
      "TinyURL dashboard docs list region, referrer, unique visitors, and device/platform data.",
    ],
    analyticsTitle: "From basic shortening to campaign telemetry",
    analyticsBody:
      "When teams outgrow one-off short links, they usually need cleaner naming discipline and reliable dashboard signals across region, referrer, and device dimensions.",
    metrics: [
      { label: "Custom alias", value: "Supported" },
      { label: "Branded domain", value: "Paid plans", accent: true },
      { label: "Unique visitors", value: "Dashboard" },
      { label: "Region + device data", value: "Dashboard", accent: true },
    ],
    sources: [
      {
        label: "TinyURL custom alias",
        href: "https://helpdesk.tinyurl.com/faqs/custom-alias",
      },
      {
        label: "TinyURL branded domains",
        href: "https://helpdesk.tinyurl.com/faqs/branded-domains",
      },
      {
        label: "TinyURL analytics fields",
        href: "https://helpdesk.tinyurl.com/faqs/what-information-is-captured-on-my-dashboard",
      },
    ],
  },
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = comparisonPageBySlug[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/compare/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://urlsy.cc/compare/${page.slug}`,
      type: "article",
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const page = comparisonPageBySlug[slug];

  if (!page) {
    notFound();
  }
  const compareEnhancement = compareEnhancements[page.slug];

  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.description,
      url: `https://urlsy.cc/compare/${page.slug}`,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      author: {
        "@type": "Person",
        name: page.authorName,
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
        { "@type": "ListItem", position: 2, name: "Compare", item: "https://urlsy.cc/compare" },
        { "@type": "ListItem", position: 3, name: page.h1, item: `https://urlsy.cc/compare/${page.slug}` },
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
          key={`comparison-schema-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <div className="space-y-10">
        <section className="grid gap-6 border-4 border-[var(--stroke)] bg-[var(--surface-1)] p-5 shadow-[4px_4px_0_0_#111] lg:grid-cols-[220px_1fr_280px] lg:items-start sm:p-7">
          <div className="space-y-2">
            <p className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-black/65">Editorial</p>
            <p className="text-sm font-bold text-black/85">Last updated {page.updatedAt}</p>
            <p className="text-sm font-bold text-black/85">Search intent: {page.searchIntent}</p>
          </div>

          <div className="space-y-3">
            <h1 className="text-[clamp(2rem,4.4vw,3.4rem)] font-black leading-[0.98] tracking-[-0.03em]">
              {page.h1}
            </h1>
            <p className="max-w-3xl text-[1.06rem] leading-8 text-black/85">{page.summary}</p>
          </div>

          <aside className="bg-black p-4 text-white">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/70">Quick summary</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/90">
              {page.points.slice(0, 3).map((point) => (
                <li key={point.title} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-[var(--bg-hero)]" />
                  <span>{point.title}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {compareEnhancement ? (
          <section className="border-4 border-[var(--stroke)] bg-black p-5 text-white shadow-[4px_4px_0_0_#111] sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-end">
              <div>
                <Kicker className="text-white/70">Quick summary</Kicker>
                <h2 className="mt-1 text-[1.9rem] font-black leading-[1.05] tracking-[-0.02em] sm:text-[2.2rem]">
                  {compareEnhancement.quickTitle}
                </h2>
              </div>
              <ul className="space-y-2 text-sm leading-7 text-white/90">
                {compareEnhancement.quickBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-[var(--bg-hero)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t border-white/15 pt-3">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/70">Validated sources</p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {compareEnhancement.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[var(--bg-hero)] underline decoration-white/35 underline-offset-4 hover:text-white"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="editorial-shell">
          <div className="mb-4 border-b-2 border-[var(--stroke)] pb-3">
            <Kicker className="text-black">01</Kicker>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">
              Feature comparison matrix
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border-r-2 border-white/20 px-4 py-3 text-left text-xs font-black uppercase tracking-[0.12em]">
                    Capability
                  </th>
                  <th className="border-r-2 border-white/20 px-4 py-3 text-left text-xs font-black uppercase tracking-[0.12em]">
                    Typical
                  </th>
                  <th className="bg-[var(--bg-hero)] px-4 py-3 text-left text-xs font-black uppercase tracking-[0.12em] text-black">
                    URLsy.cc
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.points.map((point, index) => (
                  <tr key={point.title} className={index % 2 === 0 ? "bg-[var(--surface-2)]" : "bg-[var(--surface-1)]"}>
                    <td className="border-r border-black/20 px-4 py-3 text-sm font-black uppercase tracking-[0.03em] text-black">
                      {point.title}
                    </td>
                    <td className="border-r border-black/20 px-4 py-3 text-sm text-black/75">Limited / varies</td>
                    <td className="px-4 py-3 text-sm font-bold text-black">{point.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.12fr_1fr]">
          <article className="editorial-section bg-[var(--surface-2)]">
            <Kicker className="text-black">Architectural advantage</Kicker>
            <h2 className="mt-1 text-[1.9rem] font-black leading-[1.05] tracking-[-0.02em]">
              Built for campaign execution, not feature clutter
            </h2>
            <p className="mt-4 text-[1.02rem] leading-8 text-black/85">
              {page.summary}
            </p>
            <div className="editorial-subtle mt-5 bg-white">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-black/65">Core intent</p>
              <p className="mt-1 text-sm font-bold text-black/85">
                {page.primaryKeyword} · {page.secondaryKeywords.slice(0, 2).join(" · ")}
              </p>
            </div>
          </article>

          <article className="editorial-section bg-black p-4 sm:p-5">
            <HeroMockCard compact hideReach className="max-w-none p-0" />
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="editorial-section bg-[var(--bg-hero)]">
            <Kicker className="text-black">Best fit</Kicker>
            <ul className="mt-4 space-y-3">
              {page.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-bold leading-7 text-black sm:text-base">
                  <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="editorial-section">
            <Kicker className="text-black">Beyond the link</Kicker>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.02em]">Related pages to validate fit</h2>
            <div className="mt-4 space-y-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="editorial-subtle block hover:bg-white"
                >
                  <p className="text-sm font-black uppercase tracking-[0.04em] text-black">{link.label}</p>
                  <p className="mt-1 text-sm leading-6 text-black/75">{link.description}</p>
                </Link>
              ))}
            </div>
          </article>
        </section>

        {compareEnhancement ? (
          <section className="border-4 border-[var(--stroke)] bg-black p-5 text-white shadow-[4px_4px_0_0_#111] sm:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-white/20 pb-3">
              <div>
                <Kicker className="text-white/70">Brutal analytics</Kicker>
                <h2 className="mt-1 text-[1.8rem] font-black leading-[1.06] tracking-[-0.02em] sm:text-[2.2rem]">
                  {compareEnhancement.analyticsTitle}
                </h2>
              </div>
              <span className="border-2 border-white/35 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/85">
                Operator view
              </span>
            </div>

            <p className="max-w-4xl text-[1rem] leading-8 text-white/85">
              {compareEnhancement.analyticsBody}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {compareEnhancement.metrics.map((metric) => (
                <article key={metric.label} className="border-2 border-white/30 bg-black/40 p-4">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-white/70">{metric.label}</p>
                  <p
                    className={`mt-2 text-3xl font-black leading-none ${
                      metric.accent ? "text-[var(--bg-hero)]" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <SignupPanel
          body="Use branded short links, QR workflows, and campaign analytics from one focused platform."
          title="Compare less and start building tracked links"
        />
      </div>
    </PublicPageShell>
  );
}
