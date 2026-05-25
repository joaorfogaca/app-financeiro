import { ActionButton } from "@/components/action-button";
import { DashboardShell } from "@/components/dashboard-shell";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SettingsIcon } from "@/components/icons";
import { SummaryCard } from "@/components/summary-card";
import { configurationColumns, configurationRows, settingsSummary } from "@/data/mock-finance";

export default function ConfiguracoesPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Preferências e alertas"
        title="Configurações"
        description="Centralize ajustes visuais, alertas, automatizações e preferências gerais sem sair do mesmo ecossistema visual do dashboard."
        action={
          <ActionButton variant="secondary">
            <SettingsIcon />
            Ajustar preferências
          </ActionButton>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {settingsSummary.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </section>

      <DataTable
        title="Preferências ativas"
        subtitle="Parâmetros principais já simulados no frontend para orientar a futura integração."
        columns={configurationColumns}
        rows={configurationRows}
      />

      <EmptyState
        badge="Sem pendências"
        title="Nenhuma configuração opcional em aberto"
        description="Quando você adicionar integrações, perfis extras ou regras avançadas, esse espaço será usado para onboarding contextual e sugestões de ativação."
      />
    </DashboardShell>
  );
}
