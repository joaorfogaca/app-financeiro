import type { Accent } from "@/data/mock-finance";

type SummaryCardProps = {
  title: string;
  value: string;
  change: string;
  accent: Accent;
};

const accentStyles: Record<Accent, string> = {
  blue: "border-electric/20 bg-electric/[0.07] text-electric shadow-blue",
  purple: "border-neonPurple/20 bg-neonPurple/[0.07] text-neonPurple shadow-purple",
  red: "border-neonRed/20 bg-neonRed/[0.07] text-neonRed shadow-red",
};

export function SummaryCard({ title, value, change, accent }: SummaryCardProps) {
  return (
    <article className="panel relative overflow-hidden rounded-[28px] p-5">
      <div className={`absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl ${accent === "blue" ? "bg-electric/10" : accent === "purple" ? "bg-neonPurple/10" : "bg-neonRed/10"}`} />
      <div className="relative">
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] ${accentStyles[accent]}`}>
          {title}
        </span>
        <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-2 text-sm text-white/55">{change}</p>
      </div>
    </article>
  );
}
