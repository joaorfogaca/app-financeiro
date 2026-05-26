"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { FeedbackMessage } from "@/components/feedback-message";
import { GoalProgressCard } from "@/components/goal-progress-card";
import { Header } from "@/components/header";
import { RevenueExpenseChart } from "@/components/revenue-expense-chart";
import { SummaryCard } from "@/components/summary-card";
import { TransactionModal } from "@/components/transaction-modal";
import { TransactionsList } from "@/components/transactions-list";
import { useTransactions } from "@/hooks/use-transactions";
import { currentMonthTransactions, formatCurrency } from "@/utils/finance";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { transactions, totals, loading, saving, deletingId, error, success, addTransaction, removeTransaction, clearFeedback } = useTransactions();
  const currentMonth = currentMonthTransactions(transactions);
  const monthIncome = currentMonth.filter((transaction) => transaction.type === "receita").reduce((total, transaction) => total + transaction.amount, 0);
  const monthExpense = currentMonth.filter((transaction) => transaction.type === "despesa").reduce((total, transaction) => total + transaction.amount, 0);
  const monthSavings = monthIncome - monthExpense;

  const summaryCards = [
    { title: "Saldo atual", value: formatCurrency(totals.balance), change: "Receitas menos despesas registradas", accent: "blue" as const },
    { title: "Receitas do mês", value: formatCurrency(monthIncome), change: `${currentMonth.filter((item) => item.type === "receita").length} entradas no mês`, accent: "purple" as const },
    { title: "Despesas do mês", value: formatCurrency(monthExpense), change: `${currentMonth.filter((item) => item.type === "despesa").length} saídas no mês`, accent: "red" as const },
    { title: "Economia do mês", value: formatCurrency(monthSavings), change: `${Math.max(totals.savingsRate, 0).toFixed(0)}% da renda poupada`, accent: "blue" as const },
  ];

  return (
    <DashboardShell>
      <Header onAddTransaction={() => setModalOpen(true)} />

      {error ? <FeedbackMessage type="error" message={error} /> : null}
      {success ? <FeedbackMessage type="success" message={success} /> : null}

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-5 2xl:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.88fr)] 2xl:gap-6">
        <RevenueExpenseChart transactions={transactions} />
        <GoalProgressCard />
      </section>

      <TransactionsList transactions={transactions} loading={loading} deletingId={deletingId} onDelete={removeTransaction} />

      <TransactionModal
        open={modalOpen}
        saving={saving}
        error={error}
        onClose={() => {
          setModalOpen(false);
          clearFeedback();
        }}
        onSubmit={addTransaction}
      />
    </DashboardShell>
  );
}
