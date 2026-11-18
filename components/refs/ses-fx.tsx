"use client";

import { useEffect } from "react";

const NUMBER_RE = /^([\d,]*\.?\d+)(.*)$/;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Formats `n` with the same decimals and grouping as the sample string. */
function formatLike(sample: string, n: number): string {
  const decimals = sample.includes(".") ? (sample.split(".")[1]?.length ?? 0) : 0;
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: sample.includes(","),
  });
}

function countUp(el: HTMLElement): void {
  const full = el.dataset.count ?? "";
  const m = NUMBER_RE.exec(full);
  if (!m) return;
  const target = Number((m[1] ?? "").replace(/,/g, ""));
  const suffix = m[2] ?? "";
  const start = performance.now();
  const dur = 1100;
  function frame(now: number): void {
    const t = clamp((now - start) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = t >= 1 ? full : formatLike(m?.[1] ?? "", target * eased) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/**
 * Behaviour layer for the SES design. Renders nothing; it finds elements in
 * the server markup: sharpen-on-scroll, stat count-up, pipeline scroll fill,
 * and pointer tilt on the category cards. Does nothing under reduced motion.
 */
export function SesFx() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const root = document.querySelector<HTMLElement>(".ref-ses");
    if (!root) return;
    const cleanups: (() => void)[] = [];

    // Sharpen in on scroll.
    const sharp = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          sharp.unobserve(e.target);
        }
      },
      { threshold: 0.12 },
    );
    root.querySelectorAll("[data-sharp]").forEach((el) => sharp.observe(el));
    cleanups.push(() => sharp.disconnect());

    // Stats count up once when on screen.
    const counts = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          counts.unobserve(e.target);
          countUp(e.target as HTMLElement);
        }
      },
      { threshold: 0.6 },
    );
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counts.observe(el));
    cleanups.push(() => counts.disconnect());

    // Pipeline: line fills with scroll, nodes light and cards rise in turn.
    const pipe = root.querySelector<HTMLElement>(".pipe");
    if (pipe) {
      const steps = Array.from(pipe.querySelectorAll<HTMLElement>(".pipe-step"));
      let raf = 0;
      const update = (): void => {
        raf = 0;
        const r = pipe.getBoundingClientRect();
        const p = clamp((window.innerHeight * 0.75 - r.top) / Math.max(r.height, 1), 0, 1);
        pipe.style.setProperty("--p", p.toFixed(3));
        steps.forEach((step, i) => step.classList.toggle("lit", p >= (i / steps.length) * 0.85 + 0.04));
      };
      const onScroll = (): void => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    // Pointer tilt on category cards (fine pointers only).
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      root.querySelectorAll<HTMLElement>(".cat").forEach((card) => {
        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;
        let raf = 0;
        const tick = (): void => {
          cx += (tx - cx) * 0.12;
          cy += (ty - cy) * 0.12;
          card.style.transform = `perspective(900px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
          raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.02 ? requestAnimationFrame(tick) : 0;
          if (!raf && tx === 0 && ty === 0) card.style.transform = "";
        };
        const kick = (): void => {
          if (!raf) raf = requestAnimationFrame(tick);
        };
        const move = (e: PointerEvent): void => {
          const r = card.getBoundingClientRect();
          tx = ((e.clientX - r.left) / r.width - 0.5) * 10;
          ty = -((e.clientY - r.top) / r.height - 0.5) * 8;
          kick();
        };
        const leave = (): void => {
          tx = 0;
          ty = 0;
          kick();
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          if (raf) cancelAnimationFrame(raf);
          card.style.transform = "";
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
