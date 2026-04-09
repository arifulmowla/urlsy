import { MainNav } from "@/app/components/home/MainNav";
import { PublicFooter } from "@/app/components/home/PublicFooter";
import {
  Kicker,
  SectionFrame,
} from "@/app/components/marketing/BrutalPrimitives";

type PublicPageShellProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  contentFramed?: boolean;
};

export function PublicPageShell({
  kicker,
  title,
  subtitle,
  children,
  contentFramed = true,
}: PublicPageShellProps) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)]">
      <header className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl motion-fade-up">
          <MainNav hideAnchors />
        </div>
      </header>

      <main className="px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
          <SectionFrame className="bg-[var(--bg-hero)] px-5 py-8 sm:px-8 sm:py-10">
            <div className="relative motion-fade-up">
              <Kicker>{kicker}</Kicker>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              {subtitle ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </SectionFrame>

          {contentFramed ? (
            <SectionFrame className="bg-[var(--surface-1)] p-5 sm:p-7">{children}</SectionFrame>
          ) : (
            <div className="px-1 sm:px-2">{children}</div>
          )}

          <PublicFooter />
        </div>
      </main>
    </div>
  );
}
