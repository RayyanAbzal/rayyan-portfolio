import type { ReactNode } from "react";

export interface SheetRow {
  key: string;
  label: string;
  value: ReactNode;
}

/** Spec-sheet rows: a muted label on the left, the value on the right. */
export function SesSheet({ rows, className }: { rows: readonly SheetRow[]; className?: string }) {
  return (
    <dl className={`sheet${className ? ` ${className}` : ""}`}>
      {rows.map((row) => (
        <div key={row.key} className="sheet-row">
          <dt className="sheet-k">{row.label}</dt>
          <dd className="sheet-v">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
