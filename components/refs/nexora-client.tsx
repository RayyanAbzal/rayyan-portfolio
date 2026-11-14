"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const FINE = "(hover: hover) and (pointer: fine)";
const MOTION = "(prefers-reduced-motion: no-preference)";

/** Scroll sharpen for [data-nx-sharpen] and the aurora lean toward the pointer (lerp). */
export function NexoraFx() {
  useEffect(() => {
    if (!window.matchMedia(MOTION).matches) return;
    const root = document.querySelector<HTMLElement>(".ref-nexora");
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("nx-seen");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    root.querySelectorAll<HTMLElement>("[data-nx-sharpen]").forEach((el) => io.observe(el));

    const hosts = window.matchMedia(FINE).matches ? [...root.querySelectorAll<HTMLElement>("[data-nx-aurora]")] : [];
    const state = hosts.map(() => ({ tx: 0, ty: 0, x: 0, y: 0 }));
    const offs = hosts.map((host, i) => {
      const move = (ev: PointerEvent) => {
        const r = host.getBoundingClientRect();
        state[i].tx = ((ev.clientX - r.left) / r.width - 0.5) * 90;
        state[i].ty = ((ev.clientY - r.top) / r.height - 0.5) * 50;
      };
      const leave = () => {
        state[i].tx = 0;
        state[i].ty = 0;
      };
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
      return () => {
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerleave", leave);
      };
    });
    let raf = 0;
    const tick = () => {
      hosts.forEach((host, i) => {
        const s = state[i];
        s.x += (s.tx - s.x) * 0.06;
        s.y += (s.ty - s.y) * 0.06;
        host.style.setProperty("--ax", `${s.x.toFixed(2)}px`);
        host.style.setProperty("--ay", `${s.y.toFixed(2)}px`);
      });
      raf = requestAnimationFrame(tick);
    };
    if (hosts.length > 0) raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      offs.forEach((off) => off());
    };
  }, []);
  return null;
}

/** Renders the real value in the HTML, then counts up once when scrolled into view. */
export function NexoraCount({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MOTION).matches) return;
    const match = /^([^\d]*)([\d,]+)(.*)$/.exec(value);
    if (!match) return;
    const [, pre, digits, post] = match;
    const target = Number(digits.replace(/,/g, ""));
    const commas = digits.includes(",");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const n = Math.round(target * (1 - Math.pow(1 - t, 3)));
          el.textContent = `${pre}${commas ? n.toLocaleString("en-US") : n}${post}`;
          if (t < 1) requestAnimationFrame(run);
          else el.textContent = value;
        };
        requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <strong ref={ref}>{value}</strong>;
}

const ICONS = [
  <path key="a" d="M4 17 9 12l3 3 7-8M15 7h4v4" />,
  <path key="b" d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />,
  <path key="c" d="M5 5h14v10H9l-4 4V5Z" />,
  <path key="d" d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />,
];

interface FeatureItem {
  title: string;
  body: string;
  href: string;
  label: string;
}

/** Four cards; the green fill follows hover or focus, and rests on the first card. */
export function NexoraFeatures({ items }: { items: readonly FeatureItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul
      className="nx-feats"
      onMouseLeave={() => setActive(0)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setActive(0);
      }}
    >
      {items.map((f, i) => (
        <li key={f.title} className="nx-feat" data-active={active === i} onMouseEnter={() => setActive(i)}>
          <span className="nx-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[i % ICONS.length]}
            </svg>
          </span>
          <h3>
            <a href={f.href} onFocus={() => setActive(i)}>{f.title}</a>
          </h3>
          <p>{f.body}</p>
          <span className="nx-feat-link" aria-hidden="true">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Project card shell: pointer tilt and spotlight (lerp), arrow chip lives in CSS. */
export function NexoraProject({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MOTION).matches || !window.matchMedia(FINE).matches) return;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.setProperty("--rx", `${(-y * 3).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 4).toFixed(2)}deg`);
      if (Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      tx = px - 0.5;
      ty = py - 0.5;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <li ref={ref} className="nx-proj" data-nx-sharpen>
      {children}
      <span className="nx-arrow" aria-hidden="true">&#8599;</span>
    </li>
  );
}

interface FaqEntry {
  question: string;
  answer: string;
}

/** One-open-at-a-time accordion. Closed answers stay in the HTML. */
export function NexoraFaq({ items }: { items: readonly FaqEntry[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <ul className="nx-faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question} className="nx-faq-item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`nx-faq-a-${i}`}
                id={`nx-faq-q-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.question}</span>
                <span className="nx-faq-plus" aria-hidden="true" />
              </button>
            </h3>
            <div id={`nx-faq-a-${i}`} role="region" aria-labelledby={`nx-faq-q-${i}`} className="nx-faq-a">
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
