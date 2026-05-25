import { recentTransactions } from "@/data/mock-finance";
import { SectionCard } from "./section-card";

export function TransactionsList() {
  return (
    <SectionCard
      title="Últimas transações"
      subtitle="Movimentações recentes para acompanhamento rápido."
      action={<a href="#" className="text-sm text-electric hover:text-white">Ver todas</a>}
      className="h-full"
    >
      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          const positive = transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="flex flex-col gap-3 rounded-[22px] border border-white/6 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-2xl border",
                    positive
                      ? "border-electric/25 bg-electric/10 text-electric shadow-blue"
                      : "border-neonRed/25 bg-neonRed/10 text-neonRed shadow-red",
                  ].join(" ")}
                >
                  <span className="text-lg">{positive ? "+" : "-"}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{transaction.title}</p>
                  <p className="text-sm text-white/45">{transaction.category}</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className={positive ? "font-semibold text-electric" : "font-semibold text-neonRed"}>{transaction.amount}</p>
                <p className="text-sm text-white/40">{transaction.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
