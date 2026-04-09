import { ReactNode } from "react";
import { DashboardTopbar } from "@/app/components/dashboard/DashboardTopbar";
import { PostHogIdentify } from "@/app/components/analytics/PostHogIdentify";

type DashboardShellProps = {
  userId: string;
  name?: string | null;
  email?: string | null;
  children: ReactNode;
};

export function DashboardShell({ userId, name, email, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <PostHogIdentify userId={userId} name={name} email={email} />
      <div className="mx-auto flex max-w-[1216px] flex-col gap-6 sm:gap-8">
        <DashboardTopbar name={name} email={email} />
        <main className="flex flex-col gap-6 sm:gap-8">{children}</main>
      </div>
    </div>
  );
}
