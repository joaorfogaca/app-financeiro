type EmptyStateProps = {
  title: string;
  description: string;
  badge?: string;
};

export function EmptyState({ title, description, badge = "Sem dados" }: EmptyStateProps) {
  return (
    <div className="panel rounded-[28px] border border-dashed border-white/10 px-6 py-10 text-center">
      <span className="inline-flex rounded-full border border-neonPurple/20 bg-neonPurple/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-neonPurple">
        {badge}
      </span>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
