import { PublicPageShell } from "@/app/components/home/PublicPageShell";

export const metadata = {
  title: "Cookie Policy | urlsy.cc",
};

export default function CookiesPage() {
  return (
    <PublicPageShell
      kicker="Cookies"
      title="Cookie Policy"
      subtitle="How we use cookies to keep urlsy.cc reliable and secure."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-6 text-[var(--text-primary)]">
        <p>
          This Cookie Policy describes how urlsy.cc uses cookies and similar technologies.
          This is placeholder content and should be replaced with your final legal copy.
        </p>
        <h2 className="text-base font-semibold">Essential cookies</h2>
        <p>We use essential cookies to keep you signed in and to protect the service.</p>
        <h2 className="text-base font-semibold">Analytics cookies</h2>
        <p>We may use analytics cookies to understand usage and improve performance.</p>
        <h2 className="text-base font-semibold">Contact</h2>
        <p>For cookie questions, contact us at support@urlsy.cc.</p>
      </div>
    </PublicPageShell>
  );
}
