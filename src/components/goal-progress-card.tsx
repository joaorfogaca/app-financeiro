import { SectionCard } from "./section-card";

export function GoalProgressCard() {
  return (
    <SectionCard
      title="Metas e foco"
      subtitle="Acompanhe sua consistência financeira sem perder clareza."
      className="h-full"
    >
      <div className="space-y-5">
        <div className="rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-white/65">Reserva de emergência</span>
            <span className="text-neonPurple">78%</span>
          </div>
          <div className="h-3 rounded-full bg-white/[0.05] p-[2px]">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-neonPurple via-electric to-neonRed" />
          </div>
          <p className="mt-3 text-sm text-white/45">Faltam R$ 2.200,00 para sua meta de seis meses.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-electric/15 bg-electric/[0.06] p-4">
            <p className="text-sm text-white/55">Limite de gastos</p>
            <p className="mt-2 text-2xl font-semibold text-white">63%</p>
            <p className="mt-2 text-sm text-electric">Dentro do planejado</p>
          </div>
          <div className="rounded-[22px] border border-neonRed/15 bg-neonRed/[0.06] p-4">
            <p className="text-sm text-white/55">Maior categoria</p>
            <p className="mt-2 text-2xl font-semibold text-white">Moradia</p>
            <p className="mt-2 text-sm text-neonRed">R$ 1.980,00 este mês</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
