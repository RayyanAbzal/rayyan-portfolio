"use client";

import { useEffect, useState } from "react";

const FORMAT = new Intl.DateTimeFormat("en-NZ", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Pacific/Auckland",
});

function now(): string {
  return FORMAT.format(new Date()).replace(/\s?(am|pm)/i, (m) => ` ${m.trim().toLowerCase()}`);
}

/** Local time in Auckland. The server renders the place only, so nothing mismatches on hydration. */
export function AucklandClock({ place }: { place: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(now());
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{time ? `${time} ${place}` : place.replace(/^in /, "Based in ")}</span>;
}
