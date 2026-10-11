"use client";

import * as React from "react";

import { openBooking } from "@/lib/book";
import { CALENDLY_URL } from "@/lib/site";

interface BookLinkProps extends React.ComponentProps<"a"> {
  /** Analytics source label, sent as the `source` of the `book_click` event. */
  source: string;
}

/** A real Calendly link that opens the popup when the widget is loaded. */
export function BookLink({ source, onClick, ...props }: BookLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    onClick?.(event);
    if (!event.defaultPrevented && openBooking(source)) {
      event.preventDefault();
    }
  }

  return <a href={CALENDLY_URL} onClick={handleClick} {...props} />;
}
