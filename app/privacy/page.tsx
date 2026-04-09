import type { Metadata } from "next";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { TextSection } from "@/app/components/marketing/MarketingBlocks";

export const metadata: Metadata = {
  title: "Privacy Policy | urlsy.cc",
  description: "Read how urlsy.cc handles data collection, usage, and protection.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | urlsy.cc",
    description: "Read how urlsy.cc handles data collection, usage, and protection.",
    url: "https://urlsy.cc/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <PublicPageShell
      kicker="Privacy"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-[var(--text-primary)]">
        <TextSection title="Overview">
          <p>
          This Privacy Policy explains how urlsy.cc collects, uses, and protects your
          information. This is placeholder content and should be replaced with your final
          legal copy.
          </p>
        </TextSection>
        <TextSection title="Information we collect">
          <p>
          We may collect account details, link data, and usage analytics to provide and
          improve the service.
          </p>
        </TextSection>
        <TextSection title="How we use information">
          <p>We use data to operate the service, prevent abuse, and improve performance.</p>
        </TextSection>
        <TextSection title="Contact">
          <p>For privacy questions, contact us at support@urlsy.cc.</p>
        </TextSection>
      </div>
    </PublicPageShell>
  );
}
