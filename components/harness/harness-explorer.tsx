"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

import type { HarnessLayer } from "@/content/harness";

type View = "exploded" | "assembled";

interface HarnessExplorerProps {
  /** The server-rendered drawing (HarnessDrawing). */
  children: ReactNode;
  layers: readonly HarnessLayer[];
  labels: { exploded: string; assembled: string; hint: string; caption: string; why: string };
  /** Layer shown first, so the panel is never empty (and no-JS readers see one). */
  defaultSelected: string;
}

/**
 * Drives the teardown: the view toggle and the layer list are the accessible
 * controls; clicking a ring in the drawing is a pointer shortcut to the same
 * selection. Highlight lives in CSS, keyed on data-selected (harness.css).
 */
export function HarnessExplorer({ children, layers, labels, defaultSelected }: HarnessExplorerProps) {
  const [view, setView] = useState<View>("exploded");
  const [selected, setSelected] = useState<string | null>(defaultSelected);

  function pickFromDrawing(event: MouseEvent<HTMLDivElement>) {
    const part = (event.target as Element).closest<SVGElement>("[data-part]");
    const id = part?.dataset.part;
    if (id) setSelected((current) => (current === id ? null : id));
  }

  return (
    <div className="harness-explorer" data-view={view} data-selected={selected ?? undefined}>
      <figure className="harness-stage">
        <div className="harness-toggle" role="group" aria-label="Drawing view">
          {(["exploded", "assembled"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => setView(option)}
            >
              {labels[option]}
            </button>
          ))}
        </div>
        {/* Pointer shortcut only; the layer buttons are the keyboard path. */}
        <div className="harness-canvas" onClick={pickFromDrawing}>
          {children}
        </div>
        <figcaption>{labels.caption}</figcaption>
      </figure>

      <div className="harness-panel">
        <p className="harness-hint">{labels.hint}</p>
        <ol className="harness-layers">
          {/* Core outwards, which is also top to bottom in the exploded drawing. */}
          {layers.map((layer, index) => {
            const number = index + 1;
            return (
              <li key={layer.id}>
                <button
                  type="button"
                  aria-pressed={selected === layer.id}
                  aria-controls="harness-detail"
                  onClick={() => setSelected((current) => (current === layer.id ? null : layer.id))}
                >
                  <span className="layer-num">{String(number).padStart(2, "0")}</span>
                  <span>{layer.name}</span>
                </button>
              </li>
            );
          })}
        </ol>
        {/* Every layer ships in the HTML; only the selected one is shown. */}
        <div id="harness-detail" className="harness-detail" aria-live="polite">
          {layers.map((layer) => (
            <div key={layer.id} hidden={layer.id !== selected}>
              <h3>{layer.name}</h3>
              <p>{layer.what}</p>
              <p><strong>{labels.why}</strong> {layer.why}</p>
              <p className="harness-fact">{layer.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
