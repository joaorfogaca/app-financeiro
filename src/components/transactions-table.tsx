"use client";

import { SectionCard } from "./section-card";
import { formatCurrency, formatDate } from "@/utils/finance";
import type { Transaction } from "@/types/transaction";

type TransactionsTableProps = {
  title: string;
  subtitle: string;
  transactions: Transaction[];
  loading: boolean;
  deletingId?: string | null;
  onDelete: (id: string) => void;
};

export function TransactionsTable({ title, subtitle, transactions, loading, deletingId, onDelete }: TransactionsTableProps) {
  return (
    <SectionCard title={title} subtitle={subtitle} className="overflow-hidden">
      {loading ? (
        <div className="grid min-h-48 place-items-center text-sm text-white/55">Carregando transações...</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-white/55">
          Nenhuma transação encontrada.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                {['Título', 'Categoria', 'Data', 'Tipo', 'Valor', ''].map((label) => (
                  <th
                    key={label}
                    className="border-b border-white/8 px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.22em] text-white/42 last:text-right"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const positive = transaction.type === "receita";

                return (
                  <tr key={transaction.id} className="transition hover:bg-white/[0.02]">
                    <td className="border-b border-white/6 px-4 py-4 text-sm font-medium text-white">{transaction.title}</td>
                    <td className="border-b border-white/6 px-4 py-4 text-sm text-white/65">{transaction.category}</td>
                    <td className="border-b border-white/6 px-4 py-4 text-sm text-white/65">{formatDate(transaction.transaction_date)}</td>
                    <td className="border-b border-white/6 px-4 py-4 text-sm">
                      <span className={positive ? "text-electric" : "text-neonRed"}>{transaction.type}</span>
                    </td>
                    <td className={positive ? "border-b border-white/6 px-4 py-4 text-right text-sm font-semibold text-electric" : "border-b border-white/6 px-4 py-4 text-right text-sm font-semibold text-neonRed"}>
                      {positive ? "+" : "-"} {formatCurrency(transaction.amount)}
                    </td>
                    <td className="border-b border-white/6 px-4 py-4 text-right">
                      <button
                        onClick={() => onDelete(transaction.id)}
                        disabled={deletingId === transaction.id}
                        className="rounded-xl border border-neonRed/20 bg-neonRed/10 px-3 py-2 text-xs font-semibold text-neonRed hover:border-neonRed/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === transaction.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
