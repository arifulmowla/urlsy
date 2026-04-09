import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { comparisonPages } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Compare URL Shortener Alternatives",
  description:
    "Compare urlsy.cc against popular URL shortener options with pages focused on branded links, analytics, QR codes, and custom domains.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare URL Shortener Alternatives",
    description:
      "Compare urlsy.cc against popular URL shortener options with pages focused on branded links, analytics, QR codes, and custom domains.",
    url: "https://urlsy.cc/compare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare URL Shortener Alternatives",
    description:
      "Compare urlsy.cc against popular URL shortener options with pages focused on branded links, analytics, QR codes, and custom domains.",
  },
};

export default function CompareIndexPage() {
  return (
    <PublicPageShell
      kicker="Compare"
      subtitle="Review positioning pages for teams comparing branded short-link platforms."
      title="Compare urlsy.cc with leading URL shortener alternatives"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {comparisonPages.map((page, index) => (
          <Link
            key={page.slug}
            className={`hover-lift rounded-[var(--radius-md)] border-2 border-[var(--stroke)] bg-[var(--surface-2)] p-5 motion-fade-up ${
              index < 3 ? `motion-delay-${index + 1}` : ""
            }`}
            href={`/compare/${page.slug}`}
          >
            <Kicker>Alternative</Kicker>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{page.h1}</h2>
            <p className="mt-3 text-sm leading-7 text-black/80">{page.summary}</p>
            <span className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4">
              Read comparison
            </span>
          </Link>
        ))}
      </div>
    </PublicPageShell>
  );
}
