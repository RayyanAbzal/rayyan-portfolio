"use client";

import Script from "next/script";
import { useEffect } from "react";

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

/** Loads the Calendly popup widget after the page is interactive. */
export function CalendlyAssets() {
  useEffect(() => {
    if (document.querySelector("link[data-calendly]")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    link.dataset.calendly = "true";
    document.head.appendChild(link);
  }, []);

  return <Script src={WIDGET_JS} strategy="afterInteractive" />;
}
