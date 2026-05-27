"use client";

import { useState } from "react";
import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmptyState } from "@/components/empty-state";
import { FeedbackMessage } from "@/components/feedback-message";
import { PageHeader } from "@/components/page-header";
import { PlusIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { TransactionModal } from "@/components/transaction-modal";
import { TransactionsTable } from "@/components/transactions-table";
import { useTransactions } from "@/hooks/use-transactions";
import type { Transaction } from "@/types/transaction";
import { currentMonthTransactions, formatCurrency } from "@/utils/finance";

export default function DespesasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { transactions, loading, saving, deletingId, error, success, addTransaction, editTransaction, removeTransaction, clearFeedback } = useTransactions({ type: "despesa" });
  const currentMonth = currentMonthTransactions(transactions);
  const total = currentMonth.reduce((sum, transaction) => sum + transaction.amount, 0);
  const topCategory = currentMonth.reduce<Record<string, number>>((categories, transaction) => {
    categories[transaction.category] = (categories[transaction.category] ?? 0) + transaction.amount;
    return categories;
  }, {});
  const [category = "Sem dados", categoryTotal = 0] = Object.entries(topCategory).sort(([, first], [, second]) => second - first)[0] ?? [];

  const expenseSummary = [
    { title: "Despesas do mês", value: formatCurrency(total), change: `${currentMonth.length} saídas no período`, accent: "red" as const },
    { title: "Gasto médio", value: formatCurrency(currentMonth.length ? total / currentMonth.length : 0), change: "Média por lançamento", accent: "blue" as const },
    { title: "Top categoria", value: category, change: formatCurrency(categoryTotal), accent: "purple" as const },
  ];

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Controle de saídas"
        title="Despesas"
        description="Monitore gastos fixos e variáveis com dados reais do Supabase, mantendo o mesmo visual premium do dashboard."
        action={
          <ActionButton
            onClick={() => {
              setEditingTransaction(null);
              setModalOpen(true);
            }}
          >
            <PlusIcon />
            Nova despesa
          </ActionButton>
        }
      />

      {error ? <FeedbackMessage type="error" message={error} /> : null}
      {success ? <FeedbackMessage type="success" message={success} /> : null}

      <section className="grid gap-4 lg:grid-cols-3">
        {expenseSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <TransactionsTable
        title="Saídas monitoradas"
        subtitle="Despesas carregadas diretamente do banco com exclusão protegida por RLS."
        transactions={transactions}
        loading={loading}
        deletingId={deletingId}
        onEdit={(transaction) => {
          setEditingTransaction(transaction);
          setModalOpen(true);
        }}
        onDelete={removeTransaction}
      />

      <EmptyState
        badge="Dados reais"
        title="As despesas agora vêm do banco"
        description="Use o botão de nova despesa para cadastrar saídas e atualizar esta página automaticamente."
      />

      <TransactionModal
        open={modalOpen}
        defaultType="despesa"
        transaction={editingTransaction}
        saving={saving}
        error={error}
        onClose={() => {
          setModalOpen(false);
          setEditingTransaction(null);
          clearFeedback();
        }}
        onSubmit={(input) => (editingTransaction ? editTransaction(editingTransaction.id, input) : addTransaction(input))}
      />
    </DashboardShell>
  );
}
