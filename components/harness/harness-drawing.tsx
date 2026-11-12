import type { CSSProperties } from "react";

import { HARNESS_DRAWING } from "@/content/harness/drawing";

/**
 * The teardown drawing, rendered on the server so its ~190 KB of paths stay
 * out of the client bundle. Parts are drawn exploded; the assembled view
 * translates each group back by its own (dx, dy) in CSS (harness.css).
 */
export function HarnessDrawing() {
  const { viewBox, parts } = HARNESS_DRAWING;
  return (
    <svg className="harness-svg" viewBox={viewBox} aria-hidden="true" focusable="false">
      {parts.map((part, index) => (
        <g
          key={part.id}
          data-part={part.id}
          style={{ "--dx": part.dx, "--dy": part.dy, "--i": index } as CSSProperties}
          dangerouslySetInnerHTML={{ __html: part.markup }}
        />
      ))}
    </svg>
  );
}
