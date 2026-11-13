"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";

import type { HarnessLayer } from "@/content/harness";

type View = "exploded" | "assembled";

interface GallopFrame {
  fills: Record<string, string>;
  ink: Record<string, string>;
}

interface HarnessExplorerProps {
  /** The server-rendered drawing (HarnessDrawing). */
  children: ReactNode;
  layers: readonly HarnessLayer[];
  people: readonly HarnessLayer[];
  labels: {
    exploded: string;
    assembled: string;
    run: string;
    stop: string;
    motionOff: string;
    hint: string;
    caption: string;
    why: string;
    piece: string;
    layersHeading: string;
    peopleHeading: string;
  };
  /** Gallop frames 1 onwards, as JSON, and the fill paint order they use. */
  gallop: { src: string; fillOrder: readonly string[] };
  /** Entry shown first, so the panel is never empty (and no-JS readers see one). */
  defaultSelected: string;
}

/** Frames 1 onwards as SVG markup for the two [data-gallop] groups. */
function frameMarkup(frames: GallopFrame[], fillOrder: readonly string[]) {
  const group = (k: number, body: string) => `<g class="frame" data-frame="${k}" style="--i:${k}">${body}</g>`;
  return {
    fills: frames
      .map((frame, i) => group(i + 1, fillOrder.map((id) => `<path data-part="${id}" data-fill="" d="${frame.fills[id] ?? ""}"/>`).join("")))
      .join(""),
    ink: frames
      .map((frame, i) => group(i + 1, Object.entries(frame.ink).map(([id, ink]) => `<g data-part="${id}">${ink}</g>`).join("")))
      .join(""),
  };
}

/**
 * Drives the drawing: the view toggle, the run button and the two lists are the
 * accessible controls; clicking a piece in the drawing is a pointer shortcut to
 * the same selection. A mouse over the drawing sets the horse running; the
 * button does the same for touch and keyboard. Highlight and gallop live in CSS,
 * keyed on data-selected and data-running (harness.css).
 */
export function HarnessExplorer({ children, layers, people, labels, gallop, defaultSelected }: HarnessExplorerProps) {
  const [view, setView] = useState<View>("assembled");
  const [selected, setSelected] = useState<string>(defaultSelected);
  const detail = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const canvas = useRef<HTMLDivElement>(null);
  const loading = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Fetched once, on the first sign someone wants it running. On failure the horse stands still.
  // The JSON is our own build output (tools/teardown/harness/build.cjs), same origin, never user input.
  function loadFrames() {
    if (loading.current || reduced) return;
    loading.current = true;
    fetch(gallop.src)
      .then((response) => (response.ok ? (response.json() as Promise<GallopFrame[]>) : Promise.reject(new Error(String(response.status)))))
      .then((frames) => {
        const markup = frameMarkup(frames, gallop.fillOrder);
        const fills = canvas.current?.querySelector('[data-gallop="fills"]');
        const ink = canvas.current?.querySelector('[data-gallop="ink"]');
        if (!fills || !ink) return;
        fills.innerHTML = markup.fills;
        ink.innerHTML = markup.ink;
        setLoaded(true);
      })
      .catch(() => {
        loading.current = false;
      });
  }

  const running = (pinned || hovering) && view === "assembled" && !reduced && loaded;

  function toggleRun() {
    const next = !pinned;
    setPinned(next);
    if (next) {
      setView("assembled");
      loadFrames();
    }
  }

  function enter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    setHovering(true);
    loadFrames();
  }

  function pickFromDrawing(event: MouseEvent<HTMLDivElement>) {
    const part = (event.target as Element).closest<SVGElement>("[data-part]");
    const id = part?.dataset.part;
    if (id && id !== "ground") setSelected(id);
  }

  // On one column the card sits below the lists, so bring it into view when it is off screen.
  function pickFromList(id: string) {
    setSelected(id);
    const card = detail.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    if (box.top < 0 || box.top > window.innerHeight - 120) {
      card.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
    }
  }

  function pickView(next: View) {
    setView(next);
    // The horse only runs in harness, so leaving it stops the run instead of leaving a stale Stop.
    if (next === "exploded") setPinned(false);
  }

  const entries = [...layers, ...people];
  const list = (items: readonly HarnessLayer[], offset: number) => (
    <ol className="harness-layers">
      {items.map((item, index) => (
        <li key={item.id}>
          <button
            type="button"
            aria-pressed={selected === item.id}
            aria-controls="harness-detail"
            onClick={() => pickFromList(item.id)}
          >
            <span className="layer-num">{String(offset + index + 1).padStart(2, "0")}</span>
            <span className="layer-name">{item.name}</span>
            <span className="layer-piece">{item.piece}</span>
          </button>
        </li>
      ))}
    </ol>
  );

  return (
    <div
      className="harness-explorer"
      data-view={view}
      data-selected={selected}
      data-running={running ? "" : undefined}
    >
      <figure className="harness-stage">
        <div className="harness-bar">
          <div className="harness-toggle" role="group" aria-label="Drawing view">
            {(["assembled", "exploded"] as const).map((option) => (
              <button key={option} type="button" aria-pressed={view === option} onClick={() => pickView(option)}>
                {labels[option]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="harness-run"
            data-on={pinned && !reduced ? "" : undefined}
            disabled={reduced}
            onClick={toggleRun}
          >
            {reduced ? labels.motionOff : pinned ? labels.stop : labels.run}
          </button>
        </div>
        {/* Pointer shortcut only; the list buttons are the keyboard path. */}
        <div
          ref={canvas}
          className="harness-canvas"
          onClick={pickFromDrawing}
          onPointerEnter={enter}
          onPointerLeave={() => setHovering(false)}
        >
          {children}
        </div>
        <figcaption>{labels.caption}</figcaption>
      </figure>

      <div className="harness-panel">
        <p className="harness-hint">{labels.hint}</p>
        <h3 className="harness-list-head">{labels.layersHeading}</h3>
        {list(layers, 0)}
        <h3 className="harness-list-head">{labels.peopleHeading}</h3>
        {list(people, layers.length)}
        {/* Every entry ships in the HTML; only the selected one is shown. */}
        <div ref={detail} id="harness-detail" className="harness-detail" aria-live="polite">
          {entries.map((item) => (
            <div key={item.id} hidden={item.id !== selected}>
              <p className="harness-piece">{labels.piece} {item.piece.toLowerCase()}</p>
              <h3>{item.name}</h3>
              <p>{item.what}</p>
              <p><strong>{labels.why}</strong> {item.why}</p>
              <p className="harness-fact">{item.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
