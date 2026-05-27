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

export default function ReceitasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { transactions, loading, saving, deletingId, error, success, addTransaction, editTransaction, removeTransaction, clearFeedback } = useTransactions({ type: "receita" });
  const currentMonth = currentMonthTransactions(transactions);
  const total = currentMonth.reduce((sum, transaction) => sum + transaction.amount, 0);
  const top = transactions[0];

  const revenueSummary = [
    { title: "Receitas do mês", value: formatCurrency(total), change: `${currentMonth.length} entradas no período`, accent: "purple" as const },
    { title: "Receita média", value: formatCurrency(currentMonth.length ? total / currentMonth.length : 0), change: "Média por lançamento", accent: "blue" as const },
    { title: "Última fonte", value: top?.title ?? "Sem dados", change: top?.category ?? "Cadastre uma receita", accent: "red" as const },
  ];

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Fluxo de entrada"
        title="Receitas"
        description="Visualize todas as entradas reais registradas no Supabase e acompanhe fontes recorrentes sem perder o contexto do dashboard principal."
        action={
          <ActionButton
            onClick={() => {
              setEditingTransaction(null);
              setModalOpen(true);
            }}
          >
            <PlusIcon />
            Nova receita
          </ActionButton>
        }
      />

      {error ? <FeedbackMessage type="error" message={error} /> : null}
      {success ? <FeedbackMessage type="success" message={success} /> : null}

      <section className="grid gap-4 lg:grid-cols-3">
        {revenueSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <TransactionsTable
        title="Entradas recentes"
        subtitle="Lançamentos de receita carregados diretamente do Supabase."
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
        title="As receitas agora vêm do banco"
        description="Use o botão de nova receita para cadastrar entradas e atualizar esta página automaticamente."
      />

      <TransactionModal
        open={modalOpen}
        defaultType="receita"
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
