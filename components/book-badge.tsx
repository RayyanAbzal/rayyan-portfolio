import { BookLink } from "@/components/book-link";
import type { BookingSource } from "@/lib/book";

interface BookBadgeProps {
  source: BookingSource;
  label: string;
}

/** Round booking badge: "Book a free call" circles an arrow and turns slowly (after Brightman). */
export function BookBadge({ source, label }: BookBadgeProps) {
  return (
    <BookLink source={source} className="book-badge" aria-label={label}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id={`ring-${source}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath href={`#ring-${source}`} textLength="272">Book a free call · Book a free call ·</textPath>
        </text>
      </svg>
      <span className="book-badge-arrow" aria-hidden="true">↗</span>
    </BookLink>
  );
}
