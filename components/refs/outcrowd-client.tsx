"use client";

import { useEffect } from "react";

/** Pointer and scroll behaviour for the Outcrowd design. Renders nothing; all
 * effects write CSS variables or classes on elements inside .ref-outcrowd. */
export function OutcrowdFx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ref-outcrowd");
    if (!root) return;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionOk) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // Sections sharpen in on scroll.
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".oc-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    const failsafe = window.setTimeout(() => targets.forEach((t) => t.classList.add("in")), 2500);
    cleanups.push(() => {
      io.disconnect();
      window.clearTimeout(failsafe);
    });

    // Dashboard: flattens as it scrolls past, tilts toward the pointer.
    const wrap = root.querySelector<HTMLElement>(".oc-dash-wrap");
    if (wrap) {
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      let raf = 0;
      const tick = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        wrap.style.setProperty("--rx", cx.toFixed(2));
        wrap.style.setProperty("--ry", cy.toFixed(2));
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.01 ? requestAnimationFrame(tick) : 0;
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const onScroll = () => {
        const r = wrap.getBoundingClientRect();
        const flat = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.85)));
        wrap.style.setProperty("--flat", flat.toFixed(3));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
      if (finePointer) {
        const move = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          ty = ((e.clientX - r.left) / r.width - 0.5) * 10;
          tx = -((e.clientY - r.top) / r.height - 0.5) * 8;
          kick();
        };
        const leave = () => {
          tx = 0;
          ty = 0;
          kick();
        };
        wrap.addEventListener("pointermove", move);
        wrap.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          wrap.removeEventListener("pointermove", move);
          wrap.removeEventListener("pointerleave", leave);
          cancelAnimationFrame(raf);
        });
      }
    }

    // Bento cursor spotlight.
    if (finePointer) {
      root.querySelectorAll<HTMLElement>(".oc-b").forEach((card) => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        card.addEventListener("pointermove", move);
        cleanups.push(() => card.removeEventListener("pointermove", move));
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
