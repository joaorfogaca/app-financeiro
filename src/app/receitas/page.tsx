import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PlusIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { revenueColumns, revenueRows, revenueSummary } from "@/data/mock-finance";

export default function ReceitasPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Fluxo de entrada"
        title="Receitas"
        description="Visualize todas as entradas do mês, acompanhe fontes recorrentes e identifique picos de receita sem perder o contexto do dashboard principal."
        action={
          <ActionButton>
            <PlusIcon />
            Nova receita
          </ActionButton>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {revenueSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <DataTable
        title="Entradas recentes"
        subtitle="Lançamentos confirmados e em processamento no período atual."
        columns={revenueColumns}
        rows={revenueRows}
      />

      <EmptyState
        badge="Janela livre"
        title="Nenhuma nova importação pendente"
        description="Quando novas receitas forem detectadas por integração ou importação manual, elas aparecerão aqui para revisão antes de entrar no consolidado."
      />
    </DashboardShell>
  );
}
