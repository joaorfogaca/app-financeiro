import { supabase } from "@/lib/supabase";
import type { CreateTransactionInput, Transaction, TransactionType, UpdateTransactionInput } from "@/types/transaction";

function ensureSupabase() {
  if (!supabase) {
    throw new Error("Supabase não está configurado.");
  }

  return supabase;
}

export async function listTransactions(type?: TransactionType) {
  const client = ensureSupabase();
  let query = client.from("transactions").select("*").order("transaction_date", { ascending: false }).order("created_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as Transaction[];
}

export async function createTransaction(input: CreateTransactionInput) {
  const client = ensureSupabase();
  const { data, error } = await client.from("transactions").insert(input).select("*").single();

  if (error) throw new Error(error.message);

  return data as Transaction;
}

export async function updateTransaction(id: string, input: UpdateTransactionInput) {
  const client = ensureSupabase();
  const { data, error } = await client.from("transactions").update(input).eq("id", id).select("*").single();

  if (error) throw new Error(error.message);

  return data as Transaction;
}

export async function deleteTransaction(id: string) {
  const client = ensureSupabase();
  const { error } = await client.from("transactions").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
