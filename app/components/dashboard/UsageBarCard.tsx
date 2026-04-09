import Link from "next/link";
import type { DashboardUsage } from "@/lib/dashboard-types";

type UsageBarCardProps = {
  plan: "FREE" | "PRO";
  usage: DashboardUsage;
};

function percent(value: number, limit: number | null) {
  if (limit === null || limit <= 0) return 0;
  return Math.min(100, Math.round((value / limit) * 100));
}

export function UsageBarCard({ plan, usage }: UsageBarCardProps) {
  const linksPercent = percent(usage.activeLinks, usage.activeLinksLimit);
  const clicksPercent = percent(usage.trackedClicksThisMonth, usage.trackedClicksLimit);
  const isFree = plan === "FREE";

  return (
    <section className="brutal-card brutal-card-muted p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Plan usage
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            {isFree ? "Free plan limits" : "Pro plan active"}
          </h2>
        </div>
        <span
          className={`brutal-pill border-2 px-3 py-1 text-xs font-bold ${
            isFree
              ? "bg-[var(--bg-hero)] text-[var(--text-primary)]"
              : "bg-[var(--text-primary)] text-white"
          }`}
        >
          {plan}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-[var(--text-muted)]">Active links</span>
            <span className="font-semibold">
              {usage.activeLinks}
              {usage.activeLinksLimit === null ? "" : ` / ${usage.activeLinksLimit}`}
            </span>
          </div>
          <div className="h-2 border-2 border-[var(--stroke)] bg-[#ecebe3]">
            <div
              className="h-full bg-[var(--bg-hero)] transition-all"
              style={{ width: `${linksPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-[var(--text-muted)]">Tracked clicks this month</span>
            <span className="font-semibold">
              {usage.trackedClicksThisMonth}
              {usage.trackedClicksLimit === null ? "" : ` / ${usage.trackedClicksLimit}`}
            </span>
          </div>
          <div className="h-2 border-2 border-[var(--stroke)] bg-[#ecebe3]">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${clicksPercent}%` }}
            />
          </div>
        </div>
      </div>

      {isFree && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-2 border-[var(--stroke)] bg-[#f8f8f4] px-4 py-3">
          <p className="text-sm text-[var(--text-muted)]">
            Unlock custom alias, expiry links, and advanced analytics.
          </p>
          <Link
            href="/dashboard/billing"
            className="brutal-btn brutal-btn-sm brutal-btn-primary focus-ring hover-lift"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </section>
  );
}
