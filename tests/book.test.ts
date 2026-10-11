import { describe, expect, it } from "vitest";

import { buildBookingUrl, type BookingSource } from "@/lib/book";

describe("buildBookingUrl", () => {
  it("encodes a source containing & and # instead of splitting the query", () => {
    const hostile = "hero&utm_source=evil#frag" as BookingSource;
    const url = new URL(buildBookingUrl(hostile));
    expect(url.searchParams.get("utm_content")).toBe("hero&utm_source=evil#frag");
    expect(url.searchParams.get("utm_source")).toBe("site");
    expect(url.hash).toBe("");
  });

  it("builds the plain url for a normal source", () => {
    expect(buildBookingUrl("hero")).toBe(
      "https://calendly.com/rayyanabzal/discovery?utm_source=site&utm_content=hero",
    );
  });
});
