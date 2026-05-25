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

export const summaryCards = [
  {
    title: "Saldo atual",
    value: "R$ 18.420,90",
    change: "+12,4% vs. último mês",
    accent: "blue",
  },
  {
    title: "Receitas do mês",
    value: "R$ 9.840,00",
    change: "+8,2% em entradas",
    accent: "purple",
  },
  {
    title: "Despesas do mês",
    value: "R$ 5.265,22",
    change: "-3,1% em saídas",
    accent: "red",
  },
  {
    title: "Economia do mês",
    value: "R$ 4.574,78",
    change: "46% da renda poupada",
    accent: "blue",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  value: string;
  change: string;
  accent: Accent;
}>;

export const chartData = [
  { month: "Jan", receitas: 6200, despesas: 4100 },
  { month: "Fev", receitas: 7200, despesas: 4600 },
  { month: "Mar", receitas: 6900, despesas: 4300 },
  { month: "Abr", receitas: 8100, despesas: 5100 },
  { month: "Mai", receitas: 9840, despesas: 5265 },
] as const;

export const recentTransactions = [
  {
    id: 1,
    title: "Salário principal",
    category: "Receitas",
    date: "22 Mai 2026",
    amount: "+ R$ 8.500,00",
    type: "income",
  },
  {
    id: 2,
    title: "Supermercado Prime",
    category: "Alimentação",
    date: "21 Mai 2026",
    amount: "- R$ 428,30",
    type: "expense",
  },
  {
    id: 3,
    title: "Freelance UI",
    category: "Receitas",
    date: "20 Mai 2026",
    amount: "+ R$ 1.340,00",
    type: "income",
  },
  {
    id: 4,
    title: "Assinaturas",
    category: "Serviços",
    date: "19 Mai 2026",
    amount: "- R$ 129,90",
    type: "expense",
  },
  {
    id: 5,
    title: "Reserva automática",
    category: "Metas",
    date: "18 Mai 2026",
    amount: "- R$ 1.500,00",
    type: "expense",
  },
] as const;

export const menuItems: readonly MenuItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Receitas", href: "/receitas", icon: "receitas" },
  { label: "Despesas", href: "/despesas", icon: "despesas" },
  { label: "Categorias", href: "/categorias", icon: "categorias" },
  { label: "Metas", href: "/metas", icon: "metas" },
  { label: "Configurações", href: "/configuracoes", icon: "configuracoes" },
] as const;

export const revenueSummary = [
  { title: "Receita recorrente", value: "R$ 7.900,00", change: "78% do total do mês", accent: "purple" },
  { title: "Receita extra", value: "R$ 1.940,00", change: "+15% vs. abril", accent: "blue" },
  { title: "Maior fonte", value: "Salário", change: "Entrada no dia 22", accent: "red" },
] as const satisfies ReadonlyArray<{ title: string; value: string; change: string; accent: Accent }>;

export const expenseSummary = [
  { title: "Total em despesas", value: "R$ 5.265,22", change: "53% da receita do mês", accent: "red" },
  { title: "Gasto fixo", value: "R$ 3.280,00", change: "Moradia e contas essenciais", accent: "blue" },
  { title: "Gasto variável", value: "R$ 1.985,22", change: "Lazer, compras e serviços", accent: "purple" },
] as const satisfies ReadonlyArray<{ title: string; value: string; change: string; accent: Accent }>;

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

export const revenueRows = [
  { fonte: "Salário", categoria: "Renda fixa", data: "22 Mai 2026", status: "Confirmada", valor: "R$ 8.500,00" },
  { fonte: "Freelance UI", categoria: "Projeto extra", data: "20 Mai 2026", status: "Confirmada", valor: "R$ 1.340,00" },
  { fonte: "Cashback", categoria: "Benefícios", data: "17 Mai 2026", status: "Processando", valor: "R$ 72,00" },
  { fonte: "Venda de ativo", categoria: "Investimentos", data: "12 Mai 2026", status: "Confirmada", valor: "R$ 428,00" },
] as const;

export const expenseRows = [
  { despesa: "Aluguel", categoria: "Moradia", vencimento: "05 Mai 2026", status: "Pago", valor: "R$ 1.850,00" },
  { despesa: "Supermercado Prime", categoria: "Alimentação", vencimento: "21 Mai 2026", status: "Pago", valor: "R$ 428,30" },
  { despesa: "Streaming + apps", categoria: "Serviços", vencimento: "19 Mai 2026", status: "Pago", valor: "R$ 129,90" },
  { despesa: "Cartão principal", categoria: "Compras", vencimento: "28 Mai 2026", status: "Em aberto", valor: "R$ 1.144,52" },
] as const;

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

export const revenueColumns: readonly TableColumn<(typeof revenueRows)[number]>[] = [
  { key: "fonte", label: "Fonte" },
  { key: "categoria", label: "Categoria" },
  { key: "data", label: "Data" },
  { key: "status", label: "Status" },
  { key: "valor", label: "Valor", align: "right" },
];

export const expenseColumns: readonly TableColumn<(typeof expenseRows)[number]>[] = [
  { key: "despesa", label: "Despesa" },
  { key: "categoria", label: "Categoria" },
  { key: "vencimento", label: "Vencimento" },
  { key: "status", label: "Status" },
  { key: "valor", label: "Valor", align: "right" },
];

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
