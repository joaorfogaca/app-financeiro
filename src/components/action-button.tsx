import Link from "next/link";
import type { ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-gradient-to-r from-neonRed via-neonPurple to-electric text-white shadow-red hover:scale-[1.01]",
  secondary:
    "border border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white",
};

const baseClassName =
  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition";

export function ActionButton({ children, href, variant = "primary", onClick }: ActionButtonProps) {
  const className = `${baseClassName} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
