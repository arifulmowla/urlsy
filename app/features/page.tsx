import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { featurePages } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "URL Shortener Features for Branded Links, Analytics, and QR Campaigns",
  description:
    "Explore URLsy feature pages for branded short links, link analytics, QR tracking, and custom-domain workflows.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "URL Shortener Features for Branded Links, Analytics, and QR Campaigns",
    description:
      "Explore URLsy feature pages for branded short links, link analytics, QR tracking, and custom-domain workflows.",
    url: "https://urlsy.cc/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Shortener Features for Branded Links, Analytics, and QR Campaigns",
    description:
      "Explore URLsy feature pages for branded short links, link analytics, QR tracking, and custom-domain workflows.",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(value),
  );
}

function getFeatureImage(slug: string) {
  if (slug === "qr-codes") return "/QR_code.svg";
  return "/og.png";
}

const intentLabel: Record<(typeof featurePages)[number]["searchIntent"], string> = {
  commercial: "Commercial",
  informational: "Informational",
  transactional: "Transactional",
};

export default function FeaturesIndexPage() {
  const primary = featurePages[0];
  const others = featurePages.slice(1);

  return (
    <PublicPageShell
      kicker="Features"
      subtitle="Explore the core workflows used to create branded links, track campaigns, and run QR initiatives."
      title="Feature pages for high-intent URL shortener workflows"
    >
      <div className="space-y-7">
        <section aria-labelledby="feature-spotlight" className="space-y-3">
          <Kicker className="text-black">Feature spotlight</Kicker>
          <Link
            href={`/features/${primary.slug}`}
            className="hover-lift grid overflow-hidden border-4 border-[var(--stroke)] bg-[var(--surface-1)] shadow-[4px_4px_0_0_#111] lg:grid-cols-[1.08fr_1fr]"
          >
            <div className="relative min-h-[240px] border-b-4 border-[var(--stroke)] bg-[#d8d9d4] lg:min-h-[320px] lg:border-b-0 lg:border-r-4">
              <Image
                src={getFeatureImage(primary.slug)}
                alt={primary.title}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
            <div className="space-y-5 bg-[var(--surface-2)] p-6 sm:p-8">
              <h2 id="feature-spotlight" className="text-3xl font-black leading-[1.08] tracking-[-0.03em] sm:text-[2.35rem]">
                {primary.h1}
              </h2>
              <p className="text-sm leading-7 text-black/80 sm:text-base">{primary.description}</p>
              <div className="grid gap-2 border-y-2 border-[var(--stroke)] py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-black/70 sm:grid-cols-3">
                <span>{intentLabel[primary.searchIntent]}</span>
                <span>{primary.primaryKeyword}</span>
                <span>Updated {formatDate(primary.updatedAt)}</span>
              </div>
              <div className="space-y-2">
                {primary.benefits.slice(0, 2).map((benefit) => (
                  <p key={benefit} className="flex items-start gap-2 text-sm font-semibold text-black/90">
                    <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-black" />
                    <span>{benefit}</span>
                  </p>
                ))}
              </div>
              <span className="inline-flex border-2 border-[var(--stroke)] bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.13em] text-white">
                Explore feature
              </span>
            </div>
          </Link>
        </section>

        <section aria-labelledby="feature-library">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="feature-library" className="text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">
              Feature library
            </h2>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {featurePages.length} core pages
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {others.map((page, index) => (
              <Link
                key={page.slug}
                href={`/features/${page.slug}`}
                className={`hover-lift flex h-full flex-col border-4 border-[var(--stroke)] bg-[var(--surface-1)] shadow-[4px_4px_0_0_#111] motion-fade-up ${
                  index < 3 ? `motion-delay-${index + 1}` : ""
                }`}
              >
                <div className="relative h-40 border-b-4 border-[var(--stroke)] bg-[#d6d7d2]">
                  <Image
                    src={getFeatureImage(page.slug)}
                    alt={page.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <span className="border border-[var(--stroke)] px-2 py-0.5">{intentLabel[page.searchIntent]}</span>
                    <span>{page.primaryKeyword}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-[1.13] tracking-[-0.02em]">{page.h1}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-black/80">{page.description}</p>
                  <ul className="mt-3 space-y-2 border-t-2 border-[var(--stroke)] pt-3">
                    {page.useCases.slice(0, 2).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-6 text-black/90">
                        <span className="mt-2 inline-block h-2 w-2 shrink-0 bg-[var(--bg-hero)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-black">
                    Explore feature
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
