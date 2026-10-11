import { track } from "@vercel/analytics";

import { CALENDLY_URL } from "@/lib/site";

interface CalendlyWidget {
  initPopupWidget: (options: { url: string }) => void;
}

declare global {
  interface Window {
    Calendly?: CalendlyWidget;
  }
}

/**
 * Booking: fires the `book_click` analytics event, then opens the Calendly
 * popup when the widget has loaded. Returns true when the popup took over,
 * so the caller can cancel the link; false lets the browser follow the real
 * href (the legacy `bookCall` contract, inverted for preventDefault).
 */
export function openBooking(source: string): boolean {
  track("book_click", { source });
  if (typeof window === "undefined" || !window.Calendly) {
    return false;
  }
  window.Calendly.initPopupWidget({
    url: `${CALENDLY_URL}?utm_source=site&utm_content=${source}`,
  });
  return true;
}
