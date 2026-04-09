import Link from "next/link";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

type MainNavProps = {
  hideAnchors?: boolean;
};

export function MainNav({ hideAnchors = false }: MainNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 sm:gap-5 sm:py-4"
    >
      <Link
        className="focus-ring inline-flex h-11 shrink-0 items-center border-4 border-[var(--stroke)] bg-white px-3 text-[1.5rem] font-bold uppercase leading-none tracking-[-0.04em] shadow-[3px_3px_0_0_#111] sm:h-14 sm:px-5 sm:text-[2rem] sm:shadow-[4px_4px_0_0_#111]"
        href="/"
      >
        URLSY.CC
      </Link>

      <ul className="hidden items-center justify-self-center gap-10 text-base font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] lg:flex">
        {navItems
          .filter((item) => !hideAnchors || !item.href.startsWith("#"))
          .map((item) => (
            <li key={item.href}>
              {item.href.startsWith("#") ? (
                <a
                  className="focus-ring px-1 py-1 hover:text-[var(--text-primary)]"
                  href={item.href}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  className="focus-ring px-1 py-1 hover:text-[var(--text-primary)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
      </ul>

      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Link
          className="focus-ring inline-flex h-10 items-center justify-center px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] hover:text-[var(--text-primary)] sm:h-12 sm:px-4 sm:text-sm sm:tracking-[0.1em]"
          href="/login"
        >
          Account
        </Link>
        <Link
          className="focus-ring inline-flex h-10 items-center justify-center border-2 border-[var(--stroke)] bg-black px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[2px_2px_0_0_#111] sm:h-[52px] sm:px-7 sm:text-sm sm:tracking-[0.1em] sm:shadow-[4px_4px_0_0_#111]"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
