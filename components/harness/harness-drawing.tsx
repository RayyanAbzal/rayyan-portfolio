import type { CSSProperties } from "react";

import { HARNESS_DRAWING } from "@/content/harness/drawing";

const STATES = ["exploded", "assembled"] as const;

/**
 * The teardown drawing, rendered on the server so its paths stay out of the
 * client bundle. Both states ship: the rings nest, so each needs its own
 * hidden-line pass. Per state, fills paint back to front and the ink goes on
 * top, as the renderer drew them. CSS shows one state and slides each part
 * along its own (dx, dy) while the two crossfade (harness.css).
 */
export function HarnessDrawing() {
  const { viewBox, fillOrder, parts } = HARNESS_DRAWING;
  const byId = new Map(parts.map((part, index) => [part.id, { part, index }]));
  const vars = (id: string) => {
    const { part, index } = byId.get(id)!;
    return { "--dx": part.dx, "--dy": part.dy, "--i": index } as CSSProperties;
  };

  return (
    <svg className="harness-svg" viewBox={viewBox} aria-hidden="true" focusable="false">
      {STATES.map((state) => (
        <g key={state} data-state={state}>
          {fillOrder.map((id) => (
            <path key={id} data-part={id} data-fill="" d={byId.get(id)!.part[state].fill} style={vars(id)} />
          ))}
          {parts.map((part) => (
            <g
              key={part.id}
              data-part={part.id}
              style={vars(part.id)}
              dangerouslySetInnerHTML={{ __html: part[state].ink }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
