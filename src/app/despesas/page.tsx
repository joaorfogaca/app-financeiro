import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PlusIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { expenseColumns, expenseRows, expenseSummary } from "@/data/mock-finance";

export default function DespesasPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Controle de saídas"
        title="Despesas"
        description="Monitore gastos fixos e variáveis com o mesmo visual premium do dashboard, priorizando clareza em notebook e desktop."
        action={
          <ActionButton>
            <PlusIcon />
            Nova despesa
          </ActionButton>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {expenseSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <DataTable
        title="Saídas monitoradas"
        subtitle="Despesas com destaque para vencimento, status e impacto no orçamento."
        columns={expenseColumns}
        rows={expenseRows}
      />

      <EmptyState
        badge="Tudo em ordem"
        title="Nenhum gasto fora da política pessoal"
        description="Despesas sinalizadas por limite estourado, atraso ou categoria não classificada serão exibidas aqui para você agir rapidamente."
      />
    </DashboardShell>
  );
}
