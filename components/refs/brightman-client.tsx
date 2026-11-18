"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

const FINE = "(hover: hover) and (pointer: fine)";
const MOTION = "(prefers-reduced-motion: no-preference)";

function canPoint(): boolean {
  return window.matchMedia(MOTION).matches && window.matchMedia(FINE).matches;
}

/** Drifts its child toward the pointer with a spring lerp, then settles. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canPoint()) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [strength]);
  return <span ref={ref} className="bm-magnet">{children}</span>;
}

/** Sharpens every [data-rv] element in as it enters the viewport. */
export function RevealRoot() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".ref-brightman [data-rv]"));
    if (!window.matchMedia(MOTION).matches || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    nodes.forEach((n) => io.observe(n));
    const fail = window.setTimeout(() => nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add("in");
    }), 1500);
    return () => { io.disconnect(); window.clearTimeout(fail); };
  }, []);
  return null;
}

/** Real value is in the server HTML; counts up once when scrolled into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MOTION).matches) return;
    const m = value.match(/^([\d,]*\.?\d+)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[1].replace(/,/g, ""));
    const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;
    const comma = m[1].includes(",");
    const suffix = m[2];
    const fmt = (n: number) =>
      (comma
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) + suffix;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const run = (now: number) => {
        const p = Math.min((now - t0) / 1400, 1);
        el.textContent = p >= 1 ? value : fmt(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

/** Marquee that pauses on hover (CSS) and leans with scroll velocity. */
export function LeanMarquee({ text, small }: { text: string; small?: boolean }) {
  const lean = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = lean.current;
    if (!el || !window.matchMedia(MOTION).matches) return;
    let last = window.scrollY, cur = 0, raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const v = Math.max(-1, Math.min(1, (y - last) / 40));
      last = y;
      cur += (v * -8 - cur) * 0.1;
      el.style.transform = `skewX(${cur.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`bm-marquee${small ? " small" : ""}`} aria-hidden="true">
      <div ref={lean} className="bm-lean">
        <div className="bm-marquee-track">
          {[0, 1, 2, 3].map((c) => (
            <span key={c} className="bm-marquee-run">
              <span>{text}</span>
              <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h42M34 3l10 9-10 9" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Card with pointer tilt (lerped) and a spotlight that follows the cursor. */
export function TiltCard({ children, className, as: Tag = "article" }: { children: ReactNode; className: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canPoint()) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${(-y).toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      tx = (px - 0.5) * 10;
      ty = (py - 0.5) * 10;
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  return <Tag ref={ref} className={`${className} bm-tilt`} data-rv>{children}</Tag>;
}
