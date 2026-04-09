import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { useCasePages } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Use Cases for Campaign Tracking, Social Links, and Agency Workflows",
  description:
    "Explore real use cases for campaign tracking links, social media link measurement, and agency-ready branded link workflows.",
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    title: "Use Cases for Campaign Tracking, Social Links, and Agency Workflows",
    description:
      "Explore real use cases for campaign tracking links, social media link measurement, and agency-ready branded link workflows.",
    url: "https://urlsy.cc/use-cases",
    type: "website",
  },
  twitter: {
    title: "Use Cases for Campaign Tracking, Social Links, and Agency Workflows",
    description:
      "Explore real use cases for campaign tracking links, social media link measurement, and agency-ready branded link workflows.",
  },
};

export default function UseCasesIndexPage() {
  return (
    <PublicPageShell
      kicker="Use Cases"
      subtitle="Practical implementation pages for marketers, creators, and agencies working with trackable links."
      title="How teams apply urlsy.cc in real campaign workflows"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {useCasePages.map((page, index) => (
          <Link
            key={page.slug}
            className={`hover-lift rounded-[var(--radius-md)] border-2 border-[var(--stroke)] bg-[var(--surface-2)] p-5 motion-fade-up ${
              index < 3 ? `motion-delay-${index + 1}` : ""
            }`}
            href={`/use-cases/${page.slug}`}
          >
            <Kicker>{page.kicker}</Kicker>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{page.h1}</h2>
            <p className="mt-3 text-sm leading-7 text-black/80">{page.description}</p>
            <span className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4">
              Read use case
            </span>
          </Link>
        ))}
      </div>
    </PublicPageShell>
  );
}
