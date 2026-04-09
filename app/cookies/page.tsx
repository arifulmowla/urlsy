import type { Metadata } from "next";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import { TextSection } from "@/app/components/marketing/MarketingBlocks";

export const metadata: Metadata = {
  title: "Cookie Policy | urlsy.cc",
  description: "Read how urlsy.cc uses cookies and similar technologies.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy | urlsy.cc",
    description: "Read how urlsy.cc uses cookies and similar technologies.",
    url: "https://urlsy.cc/cookies",
    type: "website",
  },
};

export default function CookiesPage() {
  return (
    <PublicPageShell
      kicker="Cookies"
      title="Cookie Policy"
      subtitle="How we use cookies to keep urlsy.cc reliable and secure."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-6 space-y-4 text-sm leading-6 text-[var(--text-primary)]">
        <TextSection title="Overview">
          <p>
          This Cookie Policy describes how urlsy.cc uses cookies and similar technologies.
          This is placeholder content and should be replaced with your final legal copy.
          </p>
        </TextSection>
        <TextSection title="Essential cookies">
          <p>We use essential cookies to keep you signed in and to protect the service.</p>
        </TextSection>
        <TextSection title="Analytics cookies">
          <p>We may use analytics cookies to understand usage and improve performance.</p>
        </TextSection>
        <TextSection title="Contact">
          <p>For cookie questions, contact us at support@urlsy.cc.</p>
        </TextSection>
      </div>
    </PublicPageShell>
  );
}
