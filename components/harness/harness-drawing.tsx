import type { CSSProperties } from "react";

import { HARNESS_DRAWING } from "@/content/harness/drawing";

const EMPTY = { __html: "" };
const FIRST = { "--i": 0 } as CSSProperties;

/**
 * The teardown drawing, rendered on the server so its paths stay out of the
 * client bundle. Two states ship:
 * - exploded: each part with its fill and ink, plus the labels. CSS slides each
 *   part along its own (dx, dy) as the view changes (harness.css).
 * - assembled: gallop frame 0, zoomed in (harness-zoom) since the pose is smaller than the spread. Fills paint back to front first, then the ink of
 *   the parts that never move, then the ink of the moving parts. The other
 *   frames are fetched on the first run and dropped into the two empty
 *   [data-gallop] groups (HarnessExplorer), which React leaves alone.
 */
export function HarnessDrawing() {
  const { viewBox, zoom, fillOrder, labels, parts, still, gallop } = HARNESS_DRAWING;
  const fit = { "--zx": zoom.x, "--zy": zoom.y, "--zs": zoom.s } as CSSProperties;
  const slide = (dx: number, dy: number) => ({ "--dx": dx, "--dy": dy }) as CSSProperties;
  const first = gallop.first as { fills: Record<string, string>; ink: Record<string, string> };

  return (
    <svg className="harness-svg" viewBox={viewBox} aria-hidden="true" focusable="false">
      <g className="harness-zoom" style={fit}>
      <g data-state="exploded">
        {parts.map((part) => (
          <path key={part.id} data-part={part.id} data-fill="" d={part.exploded.fill} style={slide(part.dx, part.dy)} />
        ))}
        {parts.map((part) => (
          <g
            key={part.id}
            data-part={part.id}
            style={slide(part.dx, part.dy)}
            dangerouslySetInnerHTML={{ __html: part.exploded.ink }}
          />
        ))}
        <g className="harness-labels" dangerouslySetInnerHTML={{ __html: labels }} />
      </g>
      <g data-state="assembled">
        <g className="frame" data-frame="0" style={FIRST}>
          {fillOrder.map((id) => (
            <path key={id} data-part={id} data-fill="" d={first.fills[id]} />
          ))}
        </g>
        <g data-gallop="fills" dangerouslySetInnerHTML={EMPTY} />
        {Object.entries(still as Record<string, string>).map(([id, ink]) => (
          <g key={id} data-part={id} dangerouslySetInnerHTML={{ __html: ink }} />
        ))}
        <g className="frame" data-frame="0" style={FIRST}>
          {Object.entries(first.ink).map(([id, ink]) => (
            <g key={id} data-part={id} dangerouslySetInnerHTML={{ __html: ink }} />
          ))}
        </g>
        <g data-gallop="ink" dangerouslySetInnerHTML={EMPTY} />
      </g>
      </g>
    </svg>
  );
}
