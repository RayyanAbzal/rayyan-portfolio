"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { HERO } from "@/content/home-novelty";

export interface HeroPiece {
  id: string;
  name: string;
  piece: string;
  what: string;
}

interface TeardownHeroProps {
  /** The server-rendered HarnessDrawing (both states). */
  children: ReactNode;
  pieces: readonly HeroPiece[];
}

interface Slide {
  el: SVGElement;
  dx: number;
  dy: number;
}

interface Rig {
  assembled: Slide[];
  exploded: Slide[];
  groups: { assembled: SVGGElement; exploded: SVGGElement };
  zoom: { el: SVGGElement; x: number; y: number; s: number };
}

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/**
 * The home hero drawing: one value t runs from 0 (the horse in harness) to 1 (taken
 * apart). Dragging the drawing or the range sets t directly; letting go springs it to
 * the nearer end. Every part slides along its own (dx, dy) while the two drawn states
 * crossfade and the assembled zoom eases out, so any t between is a real in-between.
 */
export function TeardownHero({ children, pieces }: TeardownHeroProps) {
  const stage = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const root = stage.current;
    const input = range.current;
    if (!root || !input) return;
    const svg = root.querySelector("svg");
    const zoomEl = svg?.querySelector<SVGGElement>(".harness-zoom");
    const asmGroup = svg?.querySelector<SVGGElement>('g[data-state="assembled"]');
    const expGroup = svg?.querySelector<SVGGElement>('g[data-state="exploded"]');
    if (!svg || !zoomEl || !asmGroup || !expGroup) return;

    const offsets = new Map<string, { dx: number; dy: number }>();
    const exploded: Slide[] = [];
    expGroup.querySelectorAll<SVGElement>("[data-part]").forEach((el) => {
      const dx = Number(el.style.getPropertyValue("--dx")) || 0;
      const dy = Number(el.style.getPropertyValue("--dy")) || 0;
      offsets.set(el.dataset.part ?? "", { dx, dy });
      exploded.push({ el, dx, dy });
    });
    const assembled: Slide[] = [];
    asmGroup.querySelectorAll<SVGElement>("[data-part]").forEach((el) => {
      const o = offsets.get(el.dataset.part ?? "");
      if (o) assembled.push({ el, ...o });
    });
    const num = (name: string, fallback: number) => Number(zoomEl.style.getPropertyValue(name)) || fallback;
    const rig: Rig = {
      assembled,
      exploded,
      groups: { assembled: asmGroup, exploded: expGroup },
      zoom: { el: zoomEl, x: num("--zx", 0), y: num("--zy", 0), s: num("--zs", 1) },
    };

    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    let t = 0;
    let target = 0;
    let velocity = 0;
    let raf = 0;
    let last = 0;

    const paint = () => {
      const fade = smooth(clamp01((t - 0.3) / 0.4));
      const k = 1 - t;
      rig.zoom.el.style.transform = `translate(${rig.zoom.x * k}px, ${rig.zoom.y * k}px) scale(${1 + (rig.zoom.s - 1) * k})`;
      for (const s of rig.assembled) s.el.style.transform = `translate(${s.dx * t}px, ${s.dy * t}px)`;
      for (const s of rig.exploded) s.el.style.transform = `translate(${s.dx * (t - 1)}px, ${s.dy * (t - 1)}px)`;
      rig.groups.assembled.style.opacity = String(1 - fade);
      rig.groups.assembled.style.visibility = fade >= 1 ? "hidden" : "visible";
      rig.groups.exploded.style.opacity = String(fade);
      rig.groups.exploded.style.visibility = fade <= 0 ? "hidden" : "visible";
      input.value = String(Math.round(clamp01(t) * 100));
      input.setAttribute(
        "aria-valuetext",
        t > 0.95 ? HERO.open : t < 0.05 ? HERO.closed : `${Math.round(clamp01(t) * 100)}% apart`,
      );
      root.toggleAttribute("data-open", t > 0.5);
    };

    // Critically damped spring toward the target, stepped on real frame time.
    const loop = (now: number) => {
      const dt = Math.min(0.032, last ? (now - last) / 1000 : 1 / 60);
      last = now;
      velocity += (170 * (target - t) - 26 * velocity) * dt;
      t += velocity * dt;
      if (Math.abs(target - t) < 0.001 && Math.abs(velocity) < 0.001) {
        t = target;
        velocity = 0;
        raf = 0;
        last = 0;
        paint();
        return;
      }
      paint();
      raf = requestAnimationFrame(loop);
    };
    const go = (to: number) => {
      target = to;
      if (!motionOK) {
        t = to;
        paint();
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const setNow = (value: number) => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      velocity = 0;
      t = target = value;
      paint();
    };
    let drag: { x: number; y: number; t0: number; moved: boolean } | null = null;
    const canvas = root.querySelector<HTMLElement>(".td-canvas");
    const partAt = (event: PointerEvent) =>
      (document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-part]") as SVGElement | null)?.dataset.part;

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      drag = { x: event.clientX, y: event.clientY, t0: t, moved: false };
      // Capture can throw when the pointer is already gone (a fast tap on some touch screens).
      try {
        canvas?.setPointerCapture(event.pointerId);
      } catch {
        // Dragging still works inside the canvas without capture.
      }
      canvas?.classList.add("dragging");
    };
    const onMove = (event: PointerEvent) => {
      if (!drag) return;
      const shift = (event.clientX - drag.x) - (event.clientY - drag.y);
      if (Math.abs(shift) > 4) drag.moved = true;
      if (!drag.moved) return;
      let next = drag.t0 + shift / 260;
      // Rubber band past either end.
      if (next > 1) next = 1 + (next - 1) * 0.2;
      if (next < 0) next *= 0.2;
      setNow(next);
    };
    const onUp = (event: PointerEvent) => {
      canvas?.classList.remove("dragging");
      if (drag && !drag.moved) {
        const id = partAt(event);
        if (id && id !== "ground") {
          setSelected((current) => (current === id ? null : id));
          if (t < 0.5) go(1);
        }
      } else if (drag) {
        go(t > 0.5 ? 1 : 0);
      }
      drag = null;
    };
    // A cancelled pointer (the browser took over to scroll) is never a tap.
    const onCancel = () => {
      canvas?.classList.remove("dragging");
      drag = null;
    };
    const onInput = () => setNow(Number(input.value) / 100);

    canvas?.addEventListener("pointerdown", onDown);
    canvas?.addEventListener("pointermove", onMove);
    canvas?.addEventListener("pointerup", onUp);
    canvas?.addEventListener("pointercancel", onCancel);
    input.addEventListener("input", onInput);

    paint();
    root.dataset.ready = "";
    const opener = motionOK ? window.setTimeout(() => go(1), 700) : 0;

    return () => {
      window.clearTimeout(opener);
      cancelAnimationFrame(raf);
      canvas?.removeEventListener("pointerdown", onDown);
      canvas?.removeEventListener("pointermove", onMove);
      canvas?.removeEventListener("pointerup", onUp);
      canvas?.removeEventListener("pointercancel", onCancel);
      input.removeEventListener("input", onInput);
    };
  }, []);

  const piece = pieces.find((p) => p.id === selected);

  return (
    <div className="td-stage" ref={stage} data-selected={selected ?? undefined}>
      <div className="td-canvas">{children}</div>
      <div className="td-controls">
        <span className="hint">{HERO.closed}</span>
        <input
          ref={range}
          type="range"
          min={0}
          max={100}
          defaultValue={0}
          aria-label={HERO.rangeLabel}
          aria-valuetext={HERO.closed}
        />
        <span className="hint">{HERO.open}</span>
      </div>
      <div className="td-card" aria-live="polite">
        {piece ? (
          <>
            <b>
              {piece.name} <span>{piece.piece}</span>
            </b>
            <p>{piece.what}</p>
          </>
        ) : (
          <>
            <b>{HERO.idleTitle}</b>
            <p>{HERO.idleBody}</p>
          </>
        )}
      </div>
    </div>
  );
}
