import type { CSSProperties } from "react";

import { HARNESS_LAYERS } from "@/content/harness";
import { HARNESS_DRAWING } from "@/content/harness/drawing";

interface HarnessDrawingProps {
  /** Leader-line labels and the centre line: on in the explorer, off in the home teaser. */
  annotated?: boolean;
}

/**
 * The teardown drawing, rendered on the server so its ~370 KB of paths stay
 * out of the client bundle. Parts are drawn exploded; the assembled view
 * translates each group back by its own (dx, dy) in CSS (harness.css).
 * Everything here is decorative; the layer list is the accessible path.
 */
export function HarnessDrawing({ annotated = false }: HarnessDrawingProps) {
  const { viewBox, centre, ink, centreInk, parts, labels, labelFont, labelLine, axis } = HARNESS_DRAWING;
  const [x, y, width, height] = viewBox.split(" ").map(Number);
  const box = annotated ? viewBox : `${ink[0]} ${y} ${ink[1] - ink[0]} ${height}`;
  const names = new Map(HARNESS_LAYERS.map((layer) => [layer.id, layer]));
  // Narrow screens drop the labels and crop to the ink (harness.css): zoom and offset for that.
  const crop = {
    "--zoom": width / (ink[1] - ink[0]),
    "--crop": (ink[0] - x) / (ink[1] - ink[0]),
  };

  return (
    <svg
      className="harness-svg"
      viewBox={box}
      aria-hidden="true"
      focusable="false"
      style={{
        // harness.css picks --cx from these, so the narrow-screen crop can swap it.
        "--cx-wide": annotated ? centre[0] : centreInk,
        "--cx-ink": centreInk,
        "--cy": centre[1],
        ...(annotated ? crop : {}),
      } as CSSProperties}
    >
      {annotated ? (
        // Exploded-view centre line, behind the parts: it shows only in the gaps between stages.
        <path className="harness-axis" d={`M${axis.x} ${axis.y0}V${axis.y1}`} />
      ) : null}
      {parts.map((part, index) => (
        <g
          key={part.id}
          data-part={part.id}
          style={{ "--dx": part.dx, "--dy": part.dy, "--i": index } as CSSProperties}
          dangerouslySetInnerHTML={{ __html: part.markup }}
        />
      ))}
      {annotated ? (
        <g className="harness-labels" fontSize={labelFont}>
          {labels.map((label) => {
            const layer = names.get(label.id);
            if (!layer) return null;
            const out = label.side === "right" ? 1 : -1;
            const mid = label.at[1] - labelFont * 0.35;
            const shoulder = label.at[0] - out * 7;
            return (
              <g key={label.id} data-label={label.id}>
                <path
                  className="harness-leader"
                  d={`M${label.anchor[0]} ${label.anchor[1]}L${shoulder} ${mid}L${label.at[0] - out * 2} ${mid}`}
                />
                <circle cx={label.anchor[0]} cy={label.anchor[1]} r={0.7} />
                <text x={label.at[0]} y={label.at[1]} textAnchor={label.side === "right" ? "start" : "end"}>
                  <tspan className="label-name">{layer.name}</tspan>
                  <tspan className="label-part" x={label.at[0]} dy={labelLine}>{layer.part}</tspan>
                </text>
              </g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}
