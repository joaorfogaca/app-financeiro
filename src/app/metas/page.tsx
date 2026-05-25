import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PlusIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { goalColumns, goalRows, goalSummary } from "@/data/mock-finance";

export default function MetasPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Planejamento de futuro"
        title="Metas"
        description="Acompanhe objetivos financeiros, evolução acumulada e prazos de conclusão em uma visão objetiva e visualmente alinhada ao restante da aplicação."
        action={
          <ActionButton>
            <PlusIcon />
            Nova meta
          </ActionButton>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {goalSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <DataTable
        title="Objetivos ativos"
        subtitle="Metas priorizadas com progresso e horizonte de entrega."
        columns={goalColumns}
        rows={goalRows}
      />

      <EmptyState
        badge="Espaço livre"
        title="Nenhuma meta arquivada recentemente"
        description="Objetivos concluídos ou pausados aparecerão aqui para consulta, comparação de histórico e reativação futura."
      />
    </DashboardShell>
  );
}
