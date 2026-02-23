import Link from "next/link";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";

export const metadata = {
  title: "Contact | urlsy.cc",
};

export default function ContactPage() {
  return (
    <PublicPageShell
      kicker="Contact"
      title="Contact us"
      subtitle="Email our team and we will get back to you as soon as possible."
    >
      <p className="text-sm text-[var(--text-muted)]">Last updated: Feb 23, 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-6 text-[var(--text-primary)]">
        <p>Have a question about urlsy.cc? Email our team anytime.</p>
        <div className="surface-card rounded-2xl border border-[var(--stroke)] bg-white px-5 py-4">
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
        </div>
      </div>
    </PublicPageShell>
  );
}
