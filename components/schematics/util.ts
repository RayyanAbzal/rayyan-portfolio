import type { CSSProperties } from "react";

/** Inline `--w` custom property used by the schematic bars. */
export function barWidth(percent: number): CSSProperties {
  return { "--w": `${percent}%` } as CSSProperties;
}
