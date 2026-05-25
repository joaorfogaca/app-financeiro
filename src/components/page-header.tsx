import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="panel rounded-[30px] px-6 py-6 lg:px-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-sm text-white/45">{eyebrow}</p> : null}
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gradient lg:text-[2.1rem]">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-white/58 lg:text-base">{description}</p>
        </div>
        {action ? <div className="flex shrink-0 flex-wrap items-center gap-3">{action}</div> : null}
      </div>
    </header>
  );
}
