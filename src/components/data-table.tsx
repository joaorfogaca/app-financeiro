import { SectionCard } from "./section-card";

type Column<T extends Record<string, string>> = {
  key: keyof T;
  label: string;
  align?: "left" | "right";
};

type DataTableProps<T extends Record<string, string>> = {
  title: string;
  subtitle: string;
  columns: readonly Column<T>[];
  rows: readonly T[];
};

export function DataTable<T extends Record<string, string>>({ title, subtitle, columns, rows }: DataTableProps<T>) {
  return (
    <SectionCard title={title} subtitle={subtitle} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={[
                    "border-b border-white/8 px-4 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white/42",
                    column.align === "right" ? "text-right" : "text-left",
                  ].join(" ")}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition hover:bg-white/[0.02]">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={[
                      "border-b border-white/6 px-4 py-4 text-sm text-white/70",
                      column.align === "right" ? "text-right" : "text-left",
                    ].join(" ")}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
