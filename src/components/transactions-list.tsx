import { SectionCard } from "./section-card";
import { formatDate, formatTransactionAmount } from "@/utils/finance";
import type { Transaction } from "@/types/transaction";

type TransactionsListProps = {
  transactions: Transaction[];
  loading: boolean;
  deletingId?: string | null;
  onDelete: (id: string) => void;
};

export function TransactionsList({ transactions, loading, deletingId, onDelete }: TransactionsListProps) {
  return (
    <SectionCard
      title="Últimas transações"
      subtitle="Movimentações recentes para acompanhamento rápido."
      className="h-full"
    >
      {loading ? (
        <div className="grid min-h-48 place-items-center text-sm text-white/55">Carregando transações...</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-white/55">
          Nenhuma transação registrada ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 6).map((transaction) => {
            const positive = transaction.type === "receita";

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

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className={positive ? "font-semibold text-electric" : "font-semibold text-neonRed"}>{formatTransactionAmount(transaction)}</p>
                    <p className="text-sm text-white/40">{formatDate(transaction.transaction_date)}</p>
                  </div>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    disabled={deletingId === transaction.id}
                    className="rounded-xl border border-neonRed/20 bg-neonRed/10 px-3 py-2 text-xs font-semibold text-neonRed hover:border-neonRed/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === transaction.id ? "..." : "Excluir"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
