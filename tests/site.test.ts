import { describe, expect, it } from "vitest";

import { generateMetadata as caseMetadata } from "@/app/work/[slug]/page";
import { metadata as aboutMeta } from "@/app/about/page";
import { metadata as homeMeta } from "@/app/page";
import { metadata as contactMeta } from "@/app/contact/page";
import { metadata as privacyMeta } from "@/app/privacy/page";
import { metadata as workMeta } from "@/app/work/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { CASE_SLUGS } from "@/lib/book";
import { LEGACY_REDIRECTS } from "../next.config";

const ORIGIN = "https://rayyanabzal.com";

function canonicalOf(meta: { alternates?: { canonical?: unknown } | null }): string {
  return String(meta.alternates?.canonical);
}

describe("redirect map", () => {
  it("maps every legacy .html url to its clean path", () => {
    const map = Object.fromEntries(LEGACY_REDIRECTS.map((r) => [r.source, r.destination]));
    expect(map["/index.html"]).toBe("/");
    expect(map["/work.html"]).toBe("/work");
    expect(map["/about.html"]).toBe("/about");
    expect(map["/work/:slug([^/]+)\\.html"]).toBe("/work/:slug");
    expect(LEGACY_REDIRECTS).toHaveLength(4);
  });
});

describe("sitemap and robots", () => {
  it("lists the nine public urls on the clean paths", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(9);
    expect(urls.every((url) => url.startsWith(`${ORIGIN}/`) && !url.endsWith(".html"))).toBe(true);
  });

  it("keeps the legacy rules and sitemap pointer", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${ORIGIN}/sitemap.xml`);
    expect(Array.isArray(result.rules) ? result.rules : []).toHaveLength(2);
  });
});

describe("page metadata", () => {
  it("sets a canonical on rayyanabzal.com for static pages", () => {
    for (const meta of [homeMeta, workMeta, aboutMeta, contactMeta, privacyMeta]) {
      expect(canonicalOf(meta).startsWith(`${ORIGIN}/`)).toBe(true);
    }
  });

  it("sets a canonical for every case study", async () => {
    for (const slug of CASE_SLUGS) {
      const meta = await caseMetadata({ params: Promise.resolve({ slug }) });
      expect(canonicalOf(meta)).toBe(`${ORIGIN}/work/${slug}`);
    }
  });
});
