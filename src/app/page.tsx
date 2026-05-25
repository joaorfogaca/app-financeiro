import { DashboardShell } from "@/components/dashboard-shell";
import { GoalProgressCard } from "@/components/goal-progress-card";
import { Header } from "@/components/header";
import { RevenueExpenseChart } from "@/components/revenue-expense-chart";
import { SummaryCard } from "@/components/summary-card";
import { TransactionsList } from "@/components/transactions-list";
import { summaryCards } from "@/data/mock-finance";

export default function Home() {
  return (
    <DashboardShell>
      <Header />

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.88fr)] 2xl:gap-6">
        <RevenueExpenseChart />
        <GoalProgressCard />
      </section>

      <TransactionsList />
    </DashboardShell>
  );
}
