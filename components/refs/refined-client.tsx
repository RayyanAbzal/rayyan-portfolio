"use client";

import { useEffect, useState } from "react";

interface FaqEntry {
  question: string;
  answer: string;
}

/** Accordion bars: one open at a time, round plus button at the right. */
export function RefinedFaq({ items }: { items: readonly FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="rf-faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question} className="rf-faq-item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={`rf-faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`rf-faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <span className="rf-plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`rf-faq-panel-${i}`}
              role="region"
              aria-labelledby={`rf-faq-btn-${i}`}
              className="rf-faq-panel"
            >
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

/** Mounts once: sharpen-on-scroll, pointer spotlight and glow, stage parallax. Motion only. */
export function RefinedFx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ref-refined");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("rf-live");
    const cleanups: Array<() => void> = [];

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".rf-sec, .rf-words"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    const failsafe = window.setTimeout(() => targets.forEach((t) => t.classList.add("in")), 3000);
    cleanups.push(() => {
      io.disconnect();
      window.clearTimeout(failsafe);
    });

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const onMove = (ev: PointerEvent) => {
        const el = (ev.target as HTMLElement).closest<HTMLElement>(".rf-sol, .rf-glow");
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (el.classList.contains("rf-sol")) {
          el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
          el.style.setProperty("--my", `${ev.clientY - r.top}px`);
        } else {
          const dx = ((ev.clientX - r.left) / r.width - 0.5) * 8;
          const dy = ((ev.clientY - r.top) / r.height - 0.5) * 6;
          el.style.setProperty("--bx", `${dx.toFixed(1)}px`);
          el.style.setProperty("--by", `${dy.toFixed(1)}px`);
        }
      };
      const onLeave = (ev: PointerEvent) => {
        const el = (ev.target as HTMLElement).closest<HTMLElement>(".rf-glow");
        if (el) {
          el.style.setProperty("--bx", "0px");
          el.style.setProperty("--by", "0px");
        }
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerout", onLeave);
      cleanups.push(() => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerout", onLeave);
      });
    }

    const stages = Array.from(root.querySelectorAll<HTMLElement>(".rf-stage"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const s of stages) {
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = Math.min(1, Math.max(0, (r.top + r.height / 2 - vh / 2) / vh));
        s.style.setProperty("--py", `${(p * 18).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => {
      cleanups.forEach((c) => c());
      root.classList.remove("rf-live");
    };
  }, []);
  return null;
}
