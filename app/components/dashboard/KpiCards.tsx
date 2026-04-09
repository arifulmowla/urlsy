import type { DashboardKpis } from "@/lib/dashboard-types";

type KpiCardsProps = {
  kpis: DashboardKpis;
};

const cardClasses = "brutal-card hover-lift p-5 motion-fade-up transition-transform";

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <section aria-label="Dashboard KPIs" className="grid gap-4 md:grid-cols-3">
      <article className={`${cardClasses} brutal-card-hero`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Total links
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight">{kpis.totalLinks}</p>
      </article>

      <article className={`${cardClasses} brutal-card-muted motion-delay-1`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Total clicks
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight">{kpis.totalClicks}</p>
      </article>

      <article className={`${cardClasses} brutal-card-ink motion-delay-2`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
          Last 7 days
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight text-white">{kpis.clicksLast7d}</p>
      </article>
    </section>
  );
}
