type IconProps = {
  className?: string;
};

function iconBase(className?: string) {
  return `h-5 w-5 ${className ?? ""}`.trim();
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h11a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H6a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M15 12h5" />
      <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M3.5 8.5h13" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="M12 4v14" />
      <path d="m6 12 6 6 6-6" />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="M20 13 11 22l-8-8V5h9z" />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="M10 3h4l.7 2.6a7.9 7.9 0 0 1 1.7.7L18.8 5l2.8 2.8-1.3 1.4c.3.6.5 1.1.7 1.7L23 12v4l-2.6.7a8 8 0 0 1-.7 1.7l1.3 1.4-2.8 2.8-1.4-1.3a8 8 0 0 1-1.7.7L14 23h-4l-.7-2.6a8 8 0 0 1-1.7-.7L6.2 21l-2.8-2.8 1.3-1.4a8 8 0 0 1-.7-1.7L1 16v-4l2.6-.7c.2-.6.4-1.1.7-1.7L3 7.8 5.8 5l1.4 1.3c.6-.3 1.1-.5 1.7-.7z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="M6 16.5h12l-1.2-1.4a2.8 2.8 0 0 1-.8-1.9V10a4 4 0 1 0-8 0v3.2c0 .7-.3 1.4-.8 1.9z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase(className)}>
      <path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconBase(className)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}
