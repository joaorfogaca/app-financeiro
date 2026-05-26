export type Accent = "blue" | "purple" | "red";

export type MenuItem = {
  label: string;
  href: string;
  icon: "dashboard" | "receitas" | "despesas" | "categorias" | "metas" | "configuracoes";
};

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right";
};

export const menuItems: readonly MenuItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Receitas", href: "/receitas", icon: "receitas" },
  { label: "Despesas", href: "/despesas", icon: "despesas" },
  { label: "Categorias", href: "/categorias", icon: "categorias" },
  { label: "Metas", href: "/metas", icon: "metas" },
  { label: "Configurações", href: "/configuracoes", icon: "configuracoes" },
] as const;

export const categorySummary = [
  { title: "Categorias ativas", value: "12", change: "4 com alerta de orçamento", accent: "blue" },
  { title: "Top categoria", value: "Moradia", change: "37% das saídas", accent: "red" },
  { title: "Mais eficiente", value: "Transporte", change: "-9% no mês", accent: "purple" },
] as const satisfies ReadonlyArray<{ title: string; value: string; change: string; accent: Accent }>;

export const goalSummary = [
  { title: "Metas em andamento", value: "4", change: "2 com ritmo acima do esperado", accent: "purple" },
  { title: "Valor acumulado", value: "R$ 12.880,00", change: "+R$ 2.100,00 em maio", accent: "blue" },
  { title: "Meta principal", value: "Reserva", change: "78% concluída", accent: "red" },
] as const satisfies ReadonlyArray<{ title: string; value: string; change: string; accent: Accent }>;

export const settingsSummary = [
  { title: "Perfis conectados", value: "2", change: "Pessoal e família", accent: "blue" },
  { title: "Alertas ativos", value: "8", change: "Lembretes e limites", accent: "purple" },
  { title: "Automatizações", value: "3", change: "Transferências e tags", accent: "red" },
] as const satisfies ReadonlyArray<{ title: string; value: string; change: string; accent: Accent }>;

export const categoryRows = [
  { categoria: "Moradia", limite: "R$ 2.300,00", usado: "R$ 1.980,00", status: "Saudável" },
  { categoria: "Alimentação", limite: "R$ 850,00", usado: "R$ 692,30", status: "Atenção" },
  { categoria: "Transporte", limite: "R$ 450,00", usado: "R$ 310,00", status: "Saudável" },
  { categoria: "Lazer", limite: "R$ 500,00", usado: "R$ 540,00", status: "Excedido" },
] as const;

export const goalRows = [
  { meta: "Reserva de emergência", objetivo: "R$ 15.000,00", progresso: "78%", prazo: "Out 2026" },
  { meta: "Viagem internacional", objetivo: "R$ 9.000,00", progresso: "44%", prazo: "Jan 2027" },
  { meta: "Novo notebook", objetivo: "R$ 6.500,00", progresso: "63%", prazo: "Ago 2026" },
] as const;

export const configurationRows = [
  { item: "Moeda padrão", valor: "Real brasileiro", status: "Ativo" },
  { item: "Resumo semanal", valor: "Toda segunda às 08:00", status: "Ativo" },
  { item: "Notificação de limite", valor: "80% do orçamento", status: "Ativo" },
  { item: "Tema visual", valor: "Dark premium", status: "Ativo" },
] as const;

export const categoryColumns: readonly TableColumn<(typeof categoryRows)[number]>[] = [
  { key: "categoria", label: "Categoria" },
  { key: "limite", label: "Limite" },
  { key: "usado", label: "Usado" },
  { key: "status", label: "Status", align: "right" },
];

export const goalColumns: readonly TableColumn<(typeof goalRows)[number]>[] = [
  { key: "meta", label: "Meta" },
  { key: "objetivo", label: "Objetivo" },
  { key: "progresso", label: "Progresso" },
  { key: "prazo", label: "Prazo", align: "right" },
];

export const configurationColumns: readonly TableColumn<(typeof configurationRows)[number]>[] = [
  { key: "item", label: "Item" },
  { key: "valor", label: "Valor" },
  { key: "status", label: "Status", align: "right" },
];
