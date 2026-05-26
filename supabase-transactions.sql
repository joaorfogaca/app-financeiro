create extension if not exists pgcrypto;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('receita', 'despesa')),
  title text not null check (char_length(trim(title)) > 0),
  amount numeric(12, 2) not null check (amount > 0),
  category text not null check (char_length(trim(category)) > 0),
  transaction_date date not null,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx
  on public.transactions (user_id, transaction_date desc, created_at desc);

alter table public.transactions enable row level security;

drop policy if exists "Users can read own transactions" on public.transactions;
create policy "Users can read own transactions"
  on public.transactions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own transactions" on public.transactions;
create policy "Users can insert own transactions"
  on public.transactions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own transactions" on public.transactions;
create policy "Users can update own transactions"
  on public.transactions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own transactions" on public.transactions;
create policy "Users can delete own transactions"
  on public.transactions
  for delete
  to authenticated
  using (auth.uid() = user_id);
