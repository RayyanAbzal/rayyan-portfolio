"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RisePanelProps {
  className?: string;
  children: ReactNode;
}

/**
 * A dark panel that rises and settles as it scrolls in (after Brightman by Cuberto).
 * Any `LitText` inside lights up word by word as the panel is read. Reduced motion
 * and no-JS visitors get the settled panel with every word lit.
 */
export function RisePanel({ className, children }: RisePanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const words = [...el.querySelectorAll<HTMLElement>(".lit-w")];
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const rise = Math.min(1, Math.max(0, (vh - top) / (vh * 0.55)));
      el.style.transform = `translate3d(0, ${(1 - rise) * 96}px, 0) scale(${0.94 + rise * 0.06})`;
      const read = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.5)));
      const lit = Math.round(read * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < lit));
    };
    const onScroll = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.dataset.live = "";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.transform = "";
      delete el.dataset.live;
    };
  }, []);

  return (
    <div ref={ref} className={className ? `rise ${className}` : "rise"}>
      {children}
    </div>
  );
}

/** Plain text split into words that a parent `RisePanel` lights up in reading order. */
export function LitText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="lit-w">{word} </span>
      ))}
    </>
  );
}
