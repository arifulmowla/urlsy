import { PublicPageShell } from "@/app/components/home/PublicPageShell";

export const metadata = {
  title: "Terms & Conditions | urlsy.cc",
};

export default function TermsPage() {
  return (
    <PublicPageShell
      kicker="Terms"
      title="Terms & Conditions"
      subtitle="The rules and guidelines for using urlsy.cc."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-6 text-[var(--text-primary)]">
        <p>
          These Terms & Conditions govern your use of urlsy.cc. This is placeholder
          content and should be replaced with your final legal copy.
        </p>
        <h2 className="text-base font-semibold">Use of service</h2>
        <p>
          You agree to use the service in compliance with applicable laws and not for
          abusive or illegal activity.
        </p>
        <h2 className="text-base font-semibold">Accounts</h2>
        <p>
          You are responsible for your account credentials and any activity on your
          account.
        </p>
        <h2 className="text-base font-semibold">Contact</h2>
        <p>For questions about these terms, contact us at support@urlsy.cc.</p>
      </div>
    </PublicPageShell>
  );
}
