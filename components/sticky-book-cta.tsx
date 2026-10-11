"use client";

import { useEffect, useState } from "react";

import { BookLink } from "@/components/book-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StickyBookCtaProps {
  /** Selector: the bar appears once this element has entered view. */
  showAfter: string;
  /** Selector: the bar hides while this element is in view. */
  hideAt: string;
  source: string;
}

/**
 * Observes one selector and reports whether it is in view, or has already
 * scrolled past the top of the viewport when `latch` is true.
 */
function useSelectorSignal(selector: string, latch: boolean): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = document.querySelector(selector);
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const reached = entry.isIntersecting || entry.boundingClientRect.top < 0;
        setActive((prev) => (latch ? prev || reached : entry.isIntersecting));
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [selector, latch]);

  return active;
}

/**
 * Sticky mobile booking bar. Shows after `showAfter` has been reached, hides
 * while `hideAt` is in view. Render it as a direct child of the page, never
 * inside a transformed or overflow-clipped ancestor (iOS Safari fixed bug).
 */
export function StickyBookCta({ showAfter, hideAt, source }: StickyBookCtaProps) {
  const passed = useSelectorSignal(showAfter, true);
  const suppressed = useSelectorSignal(hideAt, false);
  const show = passed && !suppressed;

  return (
    <div className={cn("mobile-cta", show && "show")}>
      <Button
        asChild
        className="w-full shadow-[0_16px_32px_-14px_rgb(var(--pine-rgb)/0.7)]"
      >
        <BookLink source={source}>Book a free call</BookLink>
      </Button>
    </div>
  );
}
