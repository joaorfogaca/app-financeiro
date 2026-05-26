"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "./auth-provider";
import { FeedbackMessage } from "./feedback-message";
import type { CreateTransactionInput, TransactionType } from "@/types/transaction";

type TransactionModalProps = {
  open: boolean;
  defaultType?: TransactionType;
  saving: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (input: CreateTransactionInput) => Promise<boolean>;
};

const today = new Date().toISOString().slice(0, 10);

export function TransactionModal({ open, defaultType = "despesa", saving, error, onClose, onSubmit }: TransactionModalProps) {
  const { user } = useAuth();
  const [type, setType] = useState<TransactionType>(defaultType);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactionDate, setTransactionDate] = useState(today);

  useEffect(() => {
    if (open) {
      setType(defaultType);
      setTransactionDate(today);
    }
  }, [defaultType, open]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) return;

    const success = await onSubmit({
      user_id: user.id,
      type,
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
      transaction_date: transactionDate,
    });

    if (success) {
      setTitle("");
      setAmount("");
      setCategory("");
      setTransactionDate(today);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="panel w-full max-w-2xl overflow-hidden rounded-[32px]">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.35em] text-electric/75">Nova transação</p>
          <h2 className="mt-2 text-2xl font-semibold text-gradient">Adicionar movimento financeiro</h2>
          <p className="mt-2 text-sm text-white/55">Registre receitas e despesas diretamente no Supabase.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["receita", "despesa"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={[
                  "rounded-2xl border px-4 py-3 text-sm font-semibold capitalize transition",
                  type === option
                    ? option === "receita"
                      ? "border-electric/40 bg-electric/10 text-electric shadow-blue"
                      : "border-neonRed/40 bg-neonRed/10 text-neonRed shadow-red"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white",
                ].join(" ")}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-white/70">Título</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-electric/50 focus:ring-4 focus:ring-electric/10"
                placeholder="Ex: Salário, aluguel, supermercado"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-white/70">Valor</span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
                min="0.01"
                step="0.01"
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-neonPurple/50 focus:ring-4 focus:ring-neonPurple/10"
                placeholder="0,00"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-white/70">Data</span>
              <input
                type="date"
                value={transactionDate}
                onChange={(event) => setTransactionDate(event.target.value)}
                required
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-electric/50 focus:ring-4 focus:ring-electric/10"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-white/70">Categoria</span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-electric/50 focus:ring-4 focus:ring-electric/10"
                placeholder="Ex: Receitas, moradia, alimentação"
              />
            </label>
          </div>

          {error ? <FeedbackMessage type="error" message={error} /> : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-white/70 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-11 rounded-2xl bg-gradient-to-r from-neonRed via-neonPurple to-electric px-5 text-sm font-semibold text-white shadow-red disabled:cursor-not-allowed disabled:opacity-65"
            >
              {saving ? "Salvando..." : "Salvar transação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
