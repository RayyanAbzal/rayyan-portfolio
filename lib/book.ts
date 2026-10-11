import { track } from "@vercel/analytics";

import { CALENDLY_URL } from "@/lib/site";

import { CASE_SLUGS, type CaseSlug } from "@/lib/pages";

export { CASE_SLUGS };
export type { CaseSlug };

export type NavSource =
  | "nav"
  | "nav_work"
  | "nav_about"
  | "nav_other"
  | `case_nav_${CaseSlug}`;

/** Every analytics source label a booking link may carry. */
export type BookingSource =
  | NavSource
  | `${NavSource}_m`
  | "hero"
  | "contact"
  | "work_contact"
  | "about_contact"
  | "sticky_mobile"
  | "sticky_mobile_work"
  | "sticky_mobile_about"
  | "sticky_mobile_case"
  | "case_influence"
  | "case_influence_v2"
  | "case_feedhack"
  | "case_pumpdat";

interface CalendlyWidget {
  initPopupWidget: (options: { url: string }) => void;
}

declare global {
  interface Window {
    Calendly?: CalendlyWidget;
  }
}

/** Popup URL with the source encoded as a query parameter value. */
export function buildBookingUrl(source: BookingSource): string {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("utm_source", "site");
  url.searchParams.set("utm_content", source);
  return url.toString();
}

/**
 * Booking: fires the `book_click` analytics event, then opens the Calendly
 * popup when the widget has loaded. Returns true when the popup took over,
 * so the caller can cancel the link; false lets the browser follow the real
 * href (the legacy `bookCall` contract, inverted for preventDefault).
 */
export function openBooking(source: BookingSource): boolean {
  track("book_click", { source });
  if (typeof window === "undefined" || !window.Calendly) {
    return false;
  }
  window.Calendly.initPopupWidget({ url: buildBookingUrl(source) });
  return true;
}
