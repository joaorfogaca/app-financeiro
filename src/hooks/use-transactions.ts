"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createTransaction, deleteTransaction, listTransactions, updateTransaction } from "@/services/transactions";
import type { CreateTransactionInput, Transaction, TransactionType, UpdateTransactionInput } from "@/types/transaction";

type UseTransactionsOptions = {
  type?: TransactionType;
};

export function useTransactions(options: UseTransactionsOptions = {}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listTransactions(options.type);
      setTransactions(data);
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Não foi possível carregar as transações.");
    } finally {
      setLoading(false);
    }
  }, [options.type]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = useCallback(
    async (input: CreateTransactionInput) => {
      setSaving(true);
      setError(null);
      setSuccess(null);

      try {
        await createTransaction(input);
        setSuccess("Transação criada com sucesso.");
        await loadTransactions();
        return true;
      } catch (currentError) {
        setError(currentError instanceof Error ? currentError.message : "Não foi possível criar a transação.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [loadTransactions],
  );

  const removeTransaction = useCallback(async (id: string) => {
    setDeletingId(id);
    setError(null);
    setSuccess(null);

    try {
      await deleteTransaction(id);
      setTransactions((current) => current.filter((transaction) => transaction.id !== id));
      setSuccess("Transação excluída com sucesso.");
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Não foi possível excluir a transação.");
    } finally {
      setDeletingId(null);
    }
  }, []);

  const editTransaction = useCallback(
    async (id: string, input: UpdateTransactionInput) => {
      setSaving(true);
      setError(null);
      setSuccess(null);

      try {
        await updateTransaction(id, input);
        setSuccess("Transação atualizada com sucesso.");
        await loadTransactions();
        return true;
      } catch (currentError) {
        setError(currentError instanceof Error ? currentError.message : "Não foi possível atualizar a transação.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [loadTransactions],
  );

  const totals = useMemo(() => {
    const income = transactions.filter((transaction) => transaction.type === "receita").reduce((total, transaction) => total + transaction.amount, 0);
    const expense = transactions.filter((transaction) => transaction.type === "despesa").reduce((total, transaction) => total + transaction.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
      savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0,
    };
  }, [transactions]);

  return {
    transactions,
    totals,
    loading,
    saving,
    deletingId,
    error,
    success,
    refresh: loadTransactions,
    addTransaction,
    editTransaction,
    removeTransaction,
    clearFeedback: () => {
      setError(null);
      setSuccess(null);
    },
  };
}
