import type { Metadata } from "next";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { TextSection } from "@/app/components/marketing/MarketingBlocks";

export const metadata: Metadata = {
  title: "Terms & Conditions | urlsy.cc",
  description: "Read the terms and conditions for using urlsy.cc.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | urlsy.cc",
    description: "Read the terms and conditions for using urlsy.cc.",
    url: "https://urlsy.cc/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <PublicPageShell
      kicker="Terms"
      title="Terms & Conditions"
      subtitle="The rules and guidelines for using urlsy.cc."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-[var(--text-primary)]">
        <TextSection title="Overview">
          <p>
          These Terms & Conditions govern your use of urlsy.cc. This is placeholder
          content and should be replaced with your final legal copy.
          </p>
        </TextSection>
        <TextSection title="Use of service">
          <p>
          You agree to use the service in compliance with applicable laws and not for
          abusive or illegal activity.
          </p>
        </TextSection>
        <TextSection title="Accounts">
          <p>
          You are responsible for your account credentials and any activity on your
          account.
          </p>
        </TextSection>
        <TextSection title="Contact">
          <p>For questions about these terms, contact us at support@urlsy.cc.</p>
        </TextSection>
      </div>
    </PublicPageShell>
  );
}
