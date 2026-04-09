import { ReactNode } from "react";
import { DashboardTopbar } from "@/app/components/dashboard/DashboardTopbar";

type DashboardShellProps = {
  name?: string | null;
  email?: string | null;
  children: ReactNode;
};

export function DashboardShell({ name, email, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-6 sm:gap-8">
        <DashboardTopbar name={name} email={email} />
        <main className="flex flex-col gap-6 sm:gap-8">{children}</main>
      </div>
    </div>
  );
}
