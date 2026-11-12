"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Loop } from "loading-dev";

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
 * controls; clicking a part in the drawing is a pointer shortcut to the same
 * selection. Highlight lives in CSS, keyed on data-selected (harness.css).
 *
 * Motion (all of it CSS, all of it off under reduced motion): the drawing waits
 * assembled (data-intro="pending", only under html.js) and explodes the first time
 * it is mostly on screen; while exploded and on screen, a drop runs down the stack
 * (data-flow) and each part ticks as it passes.
 */
export function HarnessExplorer({ children, layers, labels, defaultSelected }: HarnessExplorerProps) {
  const [view, setView] = useState<View>("exploded");
  const [selected, setSelected] = useState<string | null>(defaultSelected);
  const [intro, setIntro] = useState<"pending" | "done">("pending");
  const [onScreen, setOnScreen] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hydration ran, so the 3s no-JS failsafe (layout.tsx) is not needed.
    if (window.__mfail) window.clearTimeout(window.__mfail);
    const node = canvas.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.4) setIntro("done");
      },
      { threshold: [0, 0.4] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function choose(option: View) {
    setIntro("done");
    setView(option);
  }

  function pickFromDrawing(event: MouseEvent<HTMLDivElement>) {
    const group = (event.target as Element).closest<SVGGElement>("g[data-part], g[data-label]");
    const id = group?.dataset.part ?? group?.dataset.label;
    if (id) setSelected((current) => (current === id ? null : id));
  }

  const flowing = intro === "done" && view === "exploded" && onScreen;

  return (
    <div
      className="harness-explorer"
      data-view={view}
      data-selected={selected ?? undefined}
      data-intro={intro}
      data-flow={flowing ? "on" : undefined}
    >
      <figure className="harness-stage">
        <div className="harness-toggle" role="group" aria-label="Drawing view">
          {(["exploded", "assembled"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => choose(option)}
            >
              {labels[option]}
            </button>
          ))}
        </div>
        {/* Pointer shortcut only; the layer buttons are the keyboard path. */}
        <div ref={canvas} className="harness-canvas" onClick={pickFromDrawing}>
          {children}
        </div>
        <figcaption>{labels.caption}</figcaption>
      </figure>

      <div className="harness-panel">
        <p className="harness-hint">{labels.hint}</p>
        <ol className="harness-layers">
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
                  {/* Decorative (loading-dev sets aria-hidden, stops under reduced motion):
                      the runner is the one layer that keeps going on its own. */}
                  {layer.live ? <Loop className="layer-live" size={16} color="var(--pine-2)" duration={2400} /> : null}
                </button>
              </li>
            );
          })}
        </ol>
        {/* Every layer ships in the HTML; only the selected one is shown. */}
        <div id="harness-detail" className="harness-detail" aria-live="polite">
          {layers.map((layer) => (
            <div key={layer.id} hidden={layer.id !== selected}>
              <p className="harness-part">{layer.part}</p>
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
