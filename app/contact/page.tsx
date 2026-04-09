import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { TextSection } from "@/app/components/marketing/MarketingBlocks";
import { BrutalCard } from "@/app/components/marketing/BrutalPrimitives";

export const metadata: Metadata = {
  title: "Contact | urlsy.cc",
  description: "Contact the urlsy.cc team for support and product questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | urlsy.cc",
    description: "Contact the urlsy.cc team for support and product questions.",
    url: "https://urlsy.cc/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PublicPageShell
      kicker="Contact"
      title="Contact us"
      subtitle="Email our team and we will get back to you as soon as possible."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-[var(--text-primary)]">
        <TextSection title="Reach our team">
          <p>Have a question about urlsy.cc? Email our team anytime.</p>
        </TextSection>
        <BrutalCard tone="muted">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Support email
          </p>
          <Link
            className="mt-2 inline-flex text-sm font-semibold text-[var(--text-primary)] underline underline-offset-4"
            href="mailto:support@urlsy.cc"
          >
            support@urlsy.cc
          </Link>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Typical response time: 1-2 business days.
          </p>
        </BrutalCard>
      </div>
    </PublicPageShell>
  );
}
