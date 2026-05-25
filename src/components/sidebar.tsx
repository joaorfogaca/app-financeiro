"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/mock-finance";
import {
  ArrowDownIcon,
  GridIcon,
  SettingsIcon,
  TagIcon,
  TargetIcon,
  WalletIcon,
} from "./icons";

const iconMap = {
  dashboard: GridIcon,
  receitas: WalletIcon,
  despesas: ArrowDownIcon,
  categorias: TagIcon,
  metas: TargetIcon,
  configuracoes: SettingsIcon,
} as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="panel flex min-h-[calc(100vh-40px)] flex-col rounded-[32px] p-5 xl:sticky xl:top-5 xl:max-h-[calc(100vh-40px)]">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-electric/25 bg-electric/10 text-electric shadow-blue">
          <GridIcon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/35">Pulse</p>
          <h1 className="text-lg font-semibold text-white">Finance</h1>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
                active
                  ? "border-electric/35 bg-electric/10 text-white shadow-blue"
                  : "border-white/5 bg-white/[0.02] text-white/60 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
              ].join(" ")}
            >
              <Icon className={active ? "text-electric" : "text-white/45 group-hover:text-white/80"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-[24px] border border-neonPurple/20 bg-neonPurple/10 p-4 shadow-purple">
        <p className="text-xs uppercase tracking-[0.3em] text-neonPurple/80">Meta premium</p>
        <p className="mt-2 text-sm text-white/70">Você atingiu 78% da sua meta de reserva para emergências.</p>
      </div>
    </aside>
  );
}
