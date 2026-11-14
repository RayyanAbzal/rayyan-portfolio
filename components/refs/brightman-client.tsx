"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

export interface ClientRow {
  slug: string;
  name: string;
  title: string;
  outcome: string;
  preview: ReactNode;
}

/** Client rows with a floating schematic preview that follows the cursor. */
export function ClientRows({ rows }: { rows: ClientRow[] }) {
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!canPoint()) return;
    let raf = 0;
    const tick = () => {
      const el = card.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * 0.14;
        pos.current.y += (target.current.y - pos.current.y) * 0.14;
        el.style.transform = `translate3d(${pos.current.x.toFixed(1)}px, ${pos.current.y.toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const place = (x: number, y: number) => {
    target.current = { x: x + 24, y: y - 110 };
  };
  const showAt = (slug: string, x: number, y: number) => {
    place(x, y);
    pos.current = { ...target.current };
    setActive(slug);
  };

  return (
    <>
      <ul className="bm-client-list" onPointerLeave={() => setActive(null)}>
        {rows.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/work/${r.slug}`}
              className="bm-client"
              data-rv
              onPointerEnter={(e) => { if (e.pointerType === "mouse") showAt(r.slug, e.clientX, e.clientY); }}
              onPointerMove={(e) => { if (e.pointerType === "mouse") place(e.clientX, e.clientY); }}
              onFocus={(e) => {
                const b = e.currentTarget.getBoundingClientRect();
                showAt(r.slug, Math.min(b.right - 360, b.left + b.width * 0.55), b.top + b.height / 2);
              }}
              onBlur={() => setActive(null)}
            >
              <span className="bm-client-name"><span>{r.name}</span></span>
              <span className="bm-client-title">{r.title}</span>
              <span className="bm-client-outcome">{r.outcome}</span>
              <span className="bm-client-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M8 6h10v10" /></svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={card} className="bm-peek" aria-hidden="true" data-on={active ? "true" : "false"}>
        {rows.map((r) => (
          <div key={r.slug} className="bm-peek-item" data-active={active === r.slug ? "true" : "false"}>{r.preview}</div>
        ))}
      </div>
    </>
  );
}
