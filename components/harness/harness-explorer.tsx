"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import { Loop } from "loading-dev";

import type { HarnessLayer } from "@/content/harness";

type View = "exploded" | "assembled";

const noSubscribe = () => () => {};
// Same test as the @supports block in harness.css: the steps' timelines drive the parts.
const scrollTimelines = () => CSS.supports("timeline-scope: --a") && CSS.supports("animation-timeline: view()");
const motionAllowed = () => matchMedia("(prefers-reduced-motion: no-preference)").matches;
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

interface Pose { node: SVGGElement; transform: string; opacity: string }

interface HarnessExplorerProps {
  /** The server-rendered drawing (HarnessDrawing). */
  children: ReactNode;
  layers: readonly HarnessLayer[];
  labels: { exploded: string; assembled: string; hint: string; caption: string; why: string; skip: string };
  /** Where the skip link lands, past the walkthrough. */
  skipTo: string;
}

/**
 * The teardown as a pinned walkthrough: the drawing stays put while one step per
 * layer scrolls past it. Every step's text is in the HTML; the drawing is decorative.
 *
 * Motion is CSS (harness.css): where the browser has scroll-driven animations, each
 * step's own trip through the viewport lifts its part out of the stack, so the drawing
 * is fully exploded by the last step. Elsewhere, and under reduced motion, it stays
 * exploded. JS only marks the step at mid-screen (its part takes the accent), turns a
 * click on the drawing into a jump to that step, and hands the parts to the view
 * toggle on its first press.
 */
export function HarnessExplorer({ children, layers, labels, skipTo }: HarnessExplorerProps) {
  const [view, setView] = useState<View>("exploded");
  const [active, setActive] = useState<string>(layers[0]?.id ?? "");
  const [toggled, setToggled] = useState(false);
  // Server and first paint: false. Only the toggle handoff needs to know.
  const canScrub = useSyncExternalStore(noSubscribe, scrollTimelines, () => false);
  const canvas = useRef<HTMLDivElement>(null);
  const steps = useRef<HTMLOListElement>(null);
  // Where each part sat on the scroll timeline when the toggle took over (see choose).
  const handoff = useRef<Pose[] | null>(null);

  useEffect(() => {
    // Hydration ran, so the 3s no-JS failsafe (layout.tsx) is not needed.
    if (window.__mfail) window.clearTimeout(window.__mfail);
    const list = steps.current;
    if (!list) return;
    // A thin band across the screen: whichever step crosses it is active. Mid-screen,
    // or lower on one column, where the pinned stage covers the top (harness.css).
    const band = matchMedia("(max-width: 860px)").matches ? "-72% 0px -27% 0px" : "-45% 0px -54% 0px";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.step;
          if (entry.isIntersecting && id) setActive(id);
        }
      },
      { rootMargin: band },
    );
    list.querySelectorAll("[data-step]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Dropping a CSS animation does not start a transition, so the parts would jump from
  // their scroll pose to the toggled view. Animate that one move by hand instead.
  useLayoutEffect(() => {
    const poses = handoff.current;
    handoff.current = null;
    if (!poses) return;
    poses.forEach(({ node, transform, opacity }, index) => {
      const end = getComputedStyle(node);
      node.animate(
        [{ transform, opacity }, { transform: end.transform, opacity: end.opacity }],
        { duration: 520, delay: index * 40, easing: EASE_IN_OUT, fill: "backwards" },
      );
    });
  }, [toggled]);

  function choose(option: View) {
    const node = canvas.current;
    if (canScrub && !toggled && node && motionAllowed()) {
      handoff.current = [...node.querySelectorAll<SVGGElement>("g[data-part]")].map((part) => {
        const style = getComputedStyle(part);
        return { node: part, transform: style.transform, opacity: style.opacity };
      });
    }
    setToggled(true);
    setView(option);
  }

  function pickFromDrawing(event: MouseEvent<HTMLDivElement>) {
    const group = (event.target as Element).closest<SVGGElement>("g[data-part], g[data-label]");
    const id = group?.dataset.part ?? group?.dataset.label;
    if (!id) return;
    setActive(id);
    document.getElementById(`layer-${id}`)?.scrollIntoView({
      behavior: motionAllowed() ? "smooth" : "auto",
      block: "center",
    });
  }

  return (
    <div
      className="harness-explorer"
      data-view={view}
      data-selected={active || undefined}
      data-toggled={toggled ? "" : undefined}
    >
      <div className="harness-stage">
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
        {/* Pointer shortcut only; the steps carry the same content for everyone. */}
        <div ref={canvas} className="harness-canvas" onClick={pickFromDrawing}>
          {children}
        </div>
      </div>

      <div className="harness-panel">
        <p className="harness-caption">{labels.caption}</p>
        <p className="harness-hint">{labels.hint}</p>
        <a className="harness-skip link" href={skipTo}>{labels.skip}</a>
        <ol ref={steps} className="harness-steps">
          {layers.map((layer, index) => (
            <li
              key={layer.id}
              id={`layer-${layer.id}`}
              data-step={layer.id}
              data-active={active === layer.id ? "" : undefined}
            >
              <p className="harness-part">
                <span className="layer-num">{String(index + 1).padStart(2, "0")}</span>
                {layer.part}
              </p>
              <h3>
                {layer.name}
                {/* Decorative (loading-dev sets aria-hidden, stops under reduced motion):
                    the runner is the one layer that keeps going on its own. */}
                {layer.live ? <Loop className="layer-live" size={16} color="var(--pine-2)" duration={2400} /> : null}
              </h3>
              <p>{layer.what}</p>
              <p><strong>{labels.why}</strong> {layer.why}</p>
              <p className="harness-fact">{layer.fact}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
