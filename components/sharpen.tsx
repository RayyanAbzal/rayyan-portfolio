"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** What sharpens from a blur as it scrolls in. The CSS in motion.css hides these only
    under `html.js` (motion allowed), so reduced motion and no-JS see them at once. */
const SHARPEN = ".home-n section.row > *, main h2";

/**
 * Section titles and home rows sharpen from a soft blur the first time they scroll into
 * view (after astapable). Re-runs on each route; marks each element `.seen` once.
 */
export function Sharpen() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.__mfail) window.clearTimeout(window.__mfail);
    const els = [...document.querySelectorAll<HTMLElement>(SHARPEN)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("seen");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
