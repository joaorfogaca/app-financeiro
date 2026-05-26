import type { Transaction } from "@/types/transaction";

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatTransactionAmount(transaction: Transaction) {
  const sign = transaction.type === "receita" ? "+" : "-";

  return `${sign} ${formatCurrency(transaction.amount)}`;
}

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`)).replace(".", "");
}

export function monthLabel(date: string) {
  const formatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });
  const label = formatter.format(new Date(`${date}T00:00:00`)).replace(".", "");

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function currentMonthTransactions(transactions: Transaction[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions.filter((transaction) => {
    const date = new Date(`${transaction.transaction_date}T00:00:00`);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
}
