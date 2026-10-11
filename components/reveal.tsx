"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Milliseconds between direct children (card grids). */
  stagger?: number;
}

const SETTLE_MS = 1400;
const FAILSAFE_MS = 1500;
const NEAR_VIEWPORT_PX = 200;

declare global {
  interface Window {
    __mfail?: number;
  }
}

/**
 * Reveal-once wrapper. The hidden state is CSS keyed on `html.js`, which an
 * inline script sets only when motion is allowed, so no-JS and
 * reduced-motion visitors always get the full static page. The element is
 * toggled through classList because React never re-renders it: `.in` starts
 * the transition, then `.done` replaces `.reveal` and `.in` for good.
 */
export function Reveal({ children, className, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.__mfail) window.clearTimeout(window.__mfail);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    let started = false;
    const reveal = (): void => {
      if (started) return;
      started = true;
      element.classList.add("in");
      timers.push(
        window.setTimeout(() => {
          element.classList.remove("reveal", "in");
          element.classList.add("done");
        }, SETTLE_MS),
      );
    };

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    if (element.getBoundingClientRect().top < window.innerHeight + NEAR_VIEWPORT_PX) {
      reveal();
    } else {
      observer.observe(element);
    }
    // Failsafe: reveal only what is already within one viewport height of
    // the screen. Cards further down keep waiting for the observer, so they
    // still animate on scroll. (html.motion-failed covers a failed hydration.)
    timers.push(
      window.setTimeout(() => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 2 && rect.bottom > -window.innerHeight) reveal();
      }, FAILSAFE_MS),
    );

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const style: CSSProperties | undefined =
    stagger === undefined ? undefined : ({ "--stagger": `${stagger}ms` } as CSSProperties);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-stagger={stagger}
      style={style}
    >
      {children}
    </div>
  );
}
