import { PublicPageShell } from "@/app/components/home/PublicPageShell";

export const metadata = {
  title: "Privacy Policy | urlsy.cc",
};

export default function PrivacyPage() {
  return (
    <PublicPageShell
      kicker="Privacy"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-6 text-[var(--text-primary)]">
        <p>
          This Privacy Policy explains how urlsy.cc collects, uses, and protects your
          information. This is placeholder content and should be replaced with your final
          legal copy.
        </p>
        <h2 className="text-base font-semibold">Information we collect</h2>
        <p>
          We may collect account details, link data, and usage analytics to provide and
          improve the service.
        </p>
        <h2 className="text-base font-semibold">How we use information</h2>
        <p>We use data to operate the service, prevent abuse, and improve performance.</p>
        <h2 className="text-base font-semibold">Contact</h2>
        <p>For privacy questions, contact us at support@urlsy.cc.</p>
      </div>
    </PublicPageShell>
  );
}
