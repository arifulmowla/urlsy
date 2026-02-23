import { MainNav } from "@/app/components/home/MainNav";
import { PublicFooter } from "@/app/components/home/PublicFooter";

type PublicPageShellProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function PublicPageShell({ kicker, title, subtitle, children }: PublicPageShellProps) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)]">
      <header className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl motion-fade-up">
          <MainNav />
        </div>
      </header>

      <main className="px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10">
          <section className="relative overflow-hidden rounded-[32px] border-[1.5px] border-[var(--stroke)] bg-[var(--bg-hero)] px-5 py-8 shadow-[var(--shadow-soft)] sm:px-8 sm:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 bottom-8 h-44 w-44 rounded-full bg-[var(--accent)]/35 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-12 top-4 h-28 w-28 rounded-full bg-white/35 blur-2xl"
            />

            <div className="relative motion-fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {kicker}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              {subtitle ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </section>

          <section className="surface-card rounded-[32px] p-5 sm:p-7">{children}</section>

          <PublicFooter />
        </div>
      </main>
    </div>
  );
}
