export type TransactionType = "receita" | "despesa";

export type Transaction = {
  id: string;
  user_id: string;
  type: TransactionType;
  title: string;
  amount: number;
  category: string;
  transaction_date: string;
  created_at: string;
};

export type CreateTransactionInput = {
  user_id: string;
  type: TransactionType;
  title: string;
  amount: number;
  category: string;
  transaction_date: string;
};

export type UpdateTransactionInput = CreateTransactionInput;
