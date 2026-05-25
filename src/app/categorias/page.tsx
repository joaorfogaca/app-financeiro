import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { PlusIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { categoryColumns, categoryRows, categorySummary } from "@/data/mock-finance";

export default function CategoriasPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Organização financeira"
        title="Categorias"
        description="Estruture limites por categoria, acompanhe uso do orçamento e descubra onde o consumo está acelerando ou desacelerando."
        action={
          <ActionButton>
            <PlusIcon />
            Nova categoria
          </ActionButton>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {categorySummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <DataTable
        title="Mapa de categorias"
        subtitle="Panorama das categorias principais com limite mensal e nível de utilização."
        columns={categoryColumns}
        rows={categoryRows}
      />

      <EmptyState
        badge="Sem revisão"
        title="Nenhuma categoria aguardando ajuste"
        description="Categorias sem regra, sem cor ou sem limite configurado aparecerão aqui como sugestões rápidas de organização."
      />
    </DashboardShell>
  );
}
