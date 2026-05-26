import { SectionCard } from "./section-card";
import { monthLabel } from "@/utils/finance";
import type { Transaction } from "@/types/transaction";

type RevenueExpenseChartProps = {
  transactions: Transaction[];
};

function buildChartData(transactions: Transaction[]) {
  const months = new Map<string, { month: string; receitas: number; despesas: number }>();

  transactions.forEach((transaction) => {
    const key = transaction.transaction_date.slice(0, 7);
    const current = months.get(key) ?? { month: monthLabel(transaction.transaction_date), receitas: 0, despesas: 0 };

    if (transaction.type === "receita") current.receitas += transaction.amount;
    if (transaction.type === "despesa") current.despesas += transaction.amount;

    months.set(key, current);
  });

  return Array.from(months.entries())
    .sort(([first], [second]) => first.localeCompare(second))
    .slice(-5)
    .map(([, value]) => value);
}

export function RevenueExpenseChart({ transactions }: RevenueExpenseChartProps) {
  const chartData = buildChartData(transactions);
  const maxValue = Math.max(...chartData.flatMap((item) => [item.receitas, item.despesas]), 1);

  return (
    <SectionCard
      title="Receitas x despesas"
      subtitle="Comparativo dos ultimos meses com foco em crescimento e controle."
      action={<span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">Atualizado agora</span>}
      className="h-full"
    >
      <div className="grid-bg rounded-[24px] border border-white/5 p-4">
        <div className="mb-4 flex items-center gap-4 text-xs text-white/55">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-electric shadow-blue" />
            Receitas
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neonRed shadow-red" />
            Despesas
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="grid h-[280px] place-items-center text-center text-sm text-white/50">
            Cadastre transações para visualizar o comparativo mensal.
          </div>
        ) : (
          <div className="flex h-[280px] items-end justify-between gap-3">
            {chartData.map((item) => {
              const incomeHeight = Math.max((item.receitas / maxValue) * 100, 12);
              const expenseHeight = Math.max((item.despesas / maxValue) * 100, 12);

              return (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-4">
                  <div className="flex h-full w-full items-end justify-center gap-2">
                    <div className="flex w-full max-w-[32px] flex-col justify-end rounded-full bg-white/[0.03] p-1">
                      <div
                        className="rounded-full bg-gradient-to-t from-electric/80 to-electric shadow-blue"
                        style={{ height: `${incomeHeight}%` }}
                      />
                    </div>
                    <div className="flex w-full max-w-[32px] flex-col justify-end rounded-full bg-white/[0.03] p-1">
                      <div
                        className="rounded-full bg-gradient-to-t from-neonRed/80 to-neonRed shadow-red"
                        style={{ height: `${expenseHeight}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">{item.month}</p>
                    <p className="text-xs text-white/40">R$ {(item.receitas / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
