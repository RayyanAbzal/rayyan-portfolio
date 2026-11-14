"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { BookLink } from "@/components/book-link";

const FINE_HOVER = "(hover: hover) and (pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

function canPointerFx(): boolean {
  return window.matchMedia(FINE_HOVER).matches && window.matchMedia(MOTION_OK).matches;
}

/** Sharpen-in on scroll: adds .in to every [data-syn-reveal] once 15% visible. */
export function SynEffects() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".ref-synapse [data-syn-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

const WAVE_LINES = 40;

/** Control points of line i, pulled toward the pointer (px, py in 0..1) by `pull` (0..1). */
function waveD(i: number, px: number, py: number, pull: number): string {
  const t = i / (WAVE_LINES - 1);
  const y0 = 250 + t * 70;
  const a = 120 - t * 60;
  const bx = (px * 1440 - 420) * 0.22 * pull;
  const by = (py * 560 - 300) * 0.3 * pull;
  const n = (v: number): string => v.toFixed(1);
  return [
    `M -50 ${n(y0 + 120)}`,
    `C 250 ${n(y0 - a - 80)}, ${n(420 + bx)} ${n(y0 + a + 140 + by)}, 720 ${n(y0 - 30 - t * 40 + by * 0.4)}`,
    `S ${n(1200 + bx * 0.5)} ${n(y0 - a - 140 + t * 90 + by * 0.6)}, 1500 ${n(y0 - 160 + t * 30)}`,
  ].join(" ");
}

/** Hero wave: lines bend toward the pointer (lerped), loop paused when offscreen or at rest. */
export function SynWave() {
  const svg = useRef<SVGSVGElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = svg.current;
    const host = el?.parentElement;
    if (!el || !host || !canPointerFx()) return;
    const target = { x: 0.5, y: 0.5, pull: 0 };
    const cur = { x: 0.5, y: 0.5, pull: 0 };
    let raf = 0;
    let visible = true;

    function frame(): void {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.pull += (target.pull - cur.pull) * 0.06;
      paths.current.forEach((pth, i) => pth?.setAttribute("d", waveD(i, cur.x, cur.y, cur.pull)));
      const settled = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) + Math.abs(target.pull - cur.pull) < 0.002;
      raf = settled || !visible ? 0 : requestAnimationFrame(frame);
    }
    function kick(): void {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    }
    function move(e: PointerEvent): void {
      const r = host!.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      target.pull = 1;
      kick();
    }
    function leave(): void {
      target.pull = 0;
      kick();
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={svg} className="syn-wave" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g>
        {Array.from({ length: WAVE_LINES }, (_, i) => (
          <path
            key={i}
            ref={(node) => {
              paths.current[i] = node;
            }}
            d={waveD(i, 0.5, 0.5, 0)}
            style={{ opacity: 0.18 + (i % 5) * 0.07 }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Round outlined CTA that leans toward the pointer (magnetic), springs back on leave. */
export function SynBadge({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  function move(e: ReactPointerEvent<HTMLAnchorElement>): void {
    const el = ref.current;
    if (!el || !canPointerFx()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }
  function reset(): void {
    if (ref.current) ref.current.style.transform = "";
  }
  return (
    <BookLink source="design_preview" className="syn-badge" ref={ref} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
      {children}
    </BookLink>
  );
}

export type IconName = "spark" | "loop" | "stack";

const ICON_PATHS: Record<IconName, string> = {
  spark: "M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.6 3.6l2 2M10.4 10.4l2 2M12.4 3.6l-2 2M5.6 10.4l-2 2",
  loop: "M3 8a5 5 0 0 1 9-3M13 8a5 5 0 0 1-9 3M12 2v3h-3M4 14v-3h3",
  stack: "M8 2 2 5l6 3 6-3-6-3ZM2 8l6 3 6-3M2 11l6 3 6-3",
};

export function SynIcon({ name }: { name: IconName }) {
  return (
    <svg className="syn-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const ICON_ORDER: readonly IconName[] = ["spark", "loop", "stack"];

export interface AccordionItem {
  title: string;
  sub?: string;
  body: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** "offers" shows the subtitle beside the title; "plain" is a compact list. */
  variant: "offers" | "plain";
  onActive?: (index: number) => void;
}

/** One open at a time; the open row is filled lighter and shows its body. */
export function SynAccordion({ items, variant, onActive }: AccordionProps) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <ul className={`syn-acc syn-acc-${variant}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p${i}`;
        return (
          <li key={item.title} className="syn-acc-row" data-open={isOpen ? "true" : "false"}>
            <h3 className="syn-acc-h">
              <button
                type="button"
                className="syn-acc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpen(isOpen ? -1 : i);
                  if (!isOpen) onActive?.(i);
                }}
              >
                <SynIcon name={ICON_ORDER[i % ICON_ORDER.length]} />
                <span className="syn-acc-t">
                  <span className="syn-acc-title">{item.title}</span>
                  {item.sub ? <span className="syn-acc-sub">{item.sub}</span> : null}
                </span>
                <span className="syn-plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <div id={panelId} className="syn-acc-panel">
              <div>
                <p>{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export interface RoadmapStep {
  title: string;
  when: string;
}

interface OffersRoadmapProps {
  offers: readonly AccordionItem[];
  steps: readonly RoadmapStep[];
  roadmapLabel: string;
}

/** Left accordion of offers, right stair-stepped roadmap card. */
export function SynOffersRoadmap({ offers, steps, roadmapLabel }: OffersRoadmapProps) {
  const [active, setActive] = useState(0);
  return (
    <div className="syn-split-lists">
      <SynAccordion items={offers} variant="offers" onActive={setActive} />
      <div className="syn-roadmap" role="group" aria-label={roadmapLabel}>
        <p className="syn-eyebrow">{roadmapLabel}</p>
        <ol className="syn-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="syn-step" data-on={i === active || i === active + 1 ? "true" : "false"} data-lead={i === active ? "true" : "false"} style={{ marginLeft: `${i * 7}%` }}>
              <span className="syn-step-n" aria-hidden="true">{i + 1}</span>
              <span className="syn-step-t">{s.title}</span>
              <span className="syn-step-w">{s.when}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

interface CarouselProps {
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
  children: ReactNode;
}

/** Scroll-snap row; round buttons, arrow keys and mouse drag all page it. Touch uses native scroll. */
export function SynCarousel({ prevLabel, nextLabel, regionLabel, children }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const page = useCallback((dir: 1 | -1): void => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".syn-case");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  function onKey(e: ReactKeyboardEvent<HTMLDivElement>): void {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      page(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      page(-1);
    }
  }
  function down(e: ReactPointerEvent<HTMLDivElement>): void {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  }
  function move(e: ReactPointerEvent<HTMLDivElement>): void {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "true";
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  }
  function up(e: ReactPointerEvent<HTMLDivElement>): void {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d.active) return;
    d.active = false;
    if (d.moved) {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      delete el.dataset.dragging;
      const card = el.querySelector<HTMLElement>(".syn-case");
      const step = card ? card.offsetWidth + 16 : 1;
      el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
    }
  }
  function swallowClick(e: ReactMouseEvent<HTMLDivElement>): void {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <>
      <div className="syn-round-btns">
        <button type="button" className="syn-round" aria-label={prevLabel} onClick={() => page(-1)}>
          <span aria-hidden="true">&larr;</span>
        </button>
        <button type="button" className="syn-round" aria-label={nextLabel} onClick={() => page(1)}>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <div
        ref={ref}
        className="syn-track"
        tabIndex={0}
        role="region"
        aria-label={regionLabel}
        onKeyDown={onKey}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClickCapture={swallowClick}
      >
        {children}
      </div>
    </>
  );
}

interface CalculatorProps {
  label: string;
  unit: string;
  resultLabel: string;
  note: string;
}

/** Arithmetic on the visitor's own input: hours per week times 52. */
export function SynCalculator({ label, unit, resultLabel, note }: CalculatorProps) {
  const [hours, setHours] = useState(10);
  const id = useId();
  const total = hours * 52;
  const [shown, setShown] = useState(total);
  const shownRef = useRef(total);
  useEffect(() => {
    const ms = window.matchMedia(MOTION_OK).matches ? 450 : 0;
    const from = shownRef.current;
    const start = performance.now();
    let raf = 0;
    function tick(now: number): void {
      const t = ms === 0 ? 1 : Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (total - from) * eased);
      shownRef.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);
  const pct = ((hours - 1) / 39) * 100;
  return (
    <div className="syn-calc">
      <label htmlFor={id} className="syn-calc-label">
        <span>{label}</span>
        <span className="syn-calc-val">{hours} {unit}</span>
      </label>
      <input
        id={id}
        className="syn-range"
        type="range"
        min={1}
        max={40}
        step={1}
        value={hours}
        style={{ "--fill": `${pct}%` } as CSSProperties}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <div className="syn-calc-scale" aria-hidden="true"><span>1</span><span>40</span></div>
      <p className="syn-calc-result-l">{resultLabel}</p>
      <output htmlFor={id} className="syn-calc-big" aria-live="polite">
        <span className="syn-sr">{total.toLocaleString("en-NZ")}</span>
        <span aria-hidden="true">{shown.toLocaleString("en-NZ")}</span>
      </output>
      <p className="syn-calc-note">{note}</p>
    </div>
  );
}
