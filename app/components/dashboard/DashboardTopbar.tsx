import Link from "next/link";
import { signOut } from "@/auth";
import { ProfileMenu } from "@/app/components/dashboard/ProfileMenu";

type DashboardTopbarProps = {
  name?: string | null;
  email?: string | null;
};

function userInitial(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "U";
  return source[0]?.toUpperCase() ?? "U";
}

export function DashboardTopbar({ name, email }: DashboardTopbarProps) {
  const initial = userInitial(name, email);

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <header className="motion-fade-up border-b-4 border-[var(--stroke)] pb-3 sm:pb-4">
      <nav
        aria-label="Dashboard"
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5"
      >
        <Link
          className="focus-ring inline-flex h-11 shrink-0 items-center border-4 border-[var(--stroke)] bg-white px-3 text-[1.5rem] font-bold uppercase leading-none tracking-[-0.04em] shadow-[3px_3px_0_0_#111] sm:h-14 sm:px-5 sm:text-[2rem] sm:shadow-[4px_4px_0_0_#111]"
          href="/"
        >
          URLSY.CC
        </Link>

        <ul className="hidden items-center justify-self-center gap-8 text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] lg:flex">
          <li>
            <Link className="focus-ring px-1 py-1 hover:text-[var(--text-primary)]" href="/dashboard">
              Overview
            </Link>
          </li>
          <li>
            <Link
              className="focus-ring px-1 py-1 hover:text-[var(--text-primary)]"
              href="/dashboard/billing"
            >
              Billing
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard#create-link"
            className="brutal-btn brutal-btn-sm brutal-btn-accent focus-ring"
          >
            New Link
          </Link>

          <ProfileMenu name={name} email={email} initial={initial} signOutAction={handleSignOut} />
        </div>
      </nav>
    </header>
  );
}
