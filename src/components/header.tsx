"use client";

import { ActionButton } from "./action-button";
import { BellIcon, PlusIcon, SettingsIcon, SparkIcon } from "./icons";
import { useAuth } from "./auth-provider";

type HeaderProps = {
  onAddTransaction?: () => void;
};

export function Header({ onAddTransaction }: HeaderProps) {
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.name ?? user?.email ?? "Usuário";

  return (
    <header className="panel rounded-[30px] px-6 py-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm text-white/45">Boa noite, {displayName}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-gradient lg:text-[2.1rem]">Seu painel financeiro em tempo real</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 hover:border-electric/30 hover:text-electric">
            <BellIcon />
          </button>
          <button className="flex h-11 items-center gap-2 rounded-2xl border border-neonPurple/25 bg-neonPurple/10 px-4 text-sm font-medium text-white hover:border-neonPurple/40 hover:bg-neonPurple/15">
            <SparkIcon className="text-neonPurple" />
            Tema premium
          </button>
          <ActionButton href="/configuracoes" variant="secondary">
            <SettingsIcon className="text-white/65" />
            Configurações
          </ActionButton>
          <ActionButton onClick={onAddTransaction}>
            <PlusIcon />
            Nova transação
          </ActionButton>
          <button
            onClick={signOut}
            className="flex h-11 items-center rounded-2xl border border-neonRed/25 bg-neonRed/10 px-4 text-sm font-semibold text-white hover:border-neonRed/45 hover:bg-neonRed/15"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
