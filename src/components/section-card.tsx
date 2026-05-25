import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, subtitle, action, children, className = "" }: SectionCardProps) {
  return (
    <section className={`panel rounded-[28px] p-6 ${className}`.trim()}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-white/55">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
