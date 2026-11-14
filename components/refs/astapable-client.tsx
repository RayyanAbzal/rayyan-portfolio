"use client";

import { useEffect, useRef } from "react";

const ROOT = ".ref-astapable";

/**
 * Behaviour layer for the astapable design. Renders only the cursor pill.
 * Everything here is skipped under reduced motion, so that visitor sees the
 * static page. Fine-pointer effects (hero spread, cursor pill) are skipped on touch.
 */
export function AstapableFx() {
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(ROOT);
    if (!root) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Sharpen: blur, 8px down, to sharp the first time each item is 15% on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("as-seen");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    root.querySelectorAll(".as-sharp").forEach((el) => io.observe(el));

    // Hero plate stack: spring toward `target`, written to --spread (0 closed, 1 open).
    const hero = root.querySelector<HTMLElement>(".as-hero");
    let spread = 0;
    let target = 0;
    let raf = 0;
    const step = () => {
      spread += (target - spread) * 0.1;
      if (Math.abs(target - spread) < 0.002) spread = target;
      hero?.style.setProperty("--spread", spread.toFixed(3));
      raf = spread === target ? 0 : requestAnimationFrame(step);
    };
    const go = (t: number) => {
      target = t;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const heroIo = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !fine) {
          go(1);
          heroIo.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    const cleanups: Array<() => void> = [];
    if (hero) {
      if (fine) {
        const enter = () => go(1);
        const leave = () => go(0);
        hero.addEventListener("pointerenter", enter);
        hero.addEventListener("pointermove", enter);
        hero.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          hero.removeEventListener("pointerenter", enter);
          hero.removeEventListener("pointermove", enter);
          hero.removeEventListener("pointerleave", leave);
        });
      } else {
        heroIo.observe(hero);
      }
    }

    // Cursor pill over work cards, lerped toward the pointer.
    const el = pill.current;
    const grid = root.querySelector<HTMLElement>(".as-grid");
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let praf = 0;
    const pstep = () => {
      px += (tx - px) * 0.22;
      py += (ty - py) * 0.22;
      if (el) el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      praf = requestAnimationFrame(pstep);
    };
    if (fine && el && grid) {
      const move = (e: PointerEvent) => {
        tx = e.clientX + 14;
        ty = e.clientY + 14;
        const over = (e.target as Element).closest(".as-feature");
        el.dataset.on = over ? "1" : "0";
        if (over && !praf) {
          px = tx;
          py = ty;
          praf = requestAnimationFrame(pstep);
        }
        if (!over && praf) {
          cancelAnimationFrame(praf);
          praf = 0;
        }
      };
      const out = () => {
        el.dataset.on = "0";
        if (praf) cancelAnimationFrame(praf);
        praf = 0;
      };
      grid.addEventListener("pointermove", move);
      grid.addEventListener("pointerleave", out);
      cleanups.push(() => {
        grid.removeEventListener("pointermove", move);
        grid.removeEventListener("pointerleave", out);
      });
    }

    return () => {
      io.disconnect();
      heroIo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(praf);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <span ref={pill} className="as-open" data-on="0" aria-hidden="true">
      Open
    </span>
  );
}
