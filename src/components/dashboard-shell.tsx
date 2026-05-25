import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-abyss px-4 py-5 text-white sm:px-6 lg:px-7 2xl:px-8">
      <div className="mx-auto grid max-w-[1720px] gap-5 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)] 2xl:gap-6">
        <Sidebar />
        <div className="min-w-0 space-y-5 2xl:space-y-6">{children}</div>
      </div>
    </main>
  );
}
