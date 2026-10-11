import { describe, expect, it } from "vitest";

import { generateMetadata as caseMetadata } from "@/app/work/[slug]/page";
import { metadata as homeMeta } from "@/app/page";
import { CASE_STUDIES } from "@/content/case-studies";
import { findMarkdownPage, llmsTxt, markdownPages } from "@/lib/markdown";
import { PAGE_PATHS, markdownPath } from "@/lib/pages";
import { CALENDLY_URL } from "@/lib/site";
import { SITEMAP_ENTRIES } from "@/lib/sitemap-entries";
import { markdownHeaders, markdownRewrites } from "../next.config";

const H1: Record<string, string> = {
  "/": "I build AI that runs your business.",
  "/work": "Client work, all of it live.",
  "/about": "I scope it, build it, and ship it myself.",
  "/work/influence": CASE_STUDIES.influence.title,
  "/work/influence-v2": CASE_STUDIES["influence-v2"].title,
  "/work/feedhack": CASE_STUDIES.feedhack.title,
  "/work/pumpdat": CASE_STUDIES.pumpdat.title,
};

describe("markdown mirrors", () => {
  it("has a mirror for every canonical page, and the sitemap lists the same pages", () => {
    expect(markdownPages().map((p) => p.path)).toEqual([...PAGE_PATHS]);
    expect(SITEMAP_ENTRIES.map((e) => e.path)).toEqual([...PAGE_PATHS]);
  });

  it("starts with the h1 text and carries the booking link", () => {
    for (const page of markdownPages()) {
      expect(page.markdown.startsWith(`# ${H1[page.path]}\n`)).toBe(true);
      expect(page.markdown).toContain(`(${CALENDLY_URL})`);
    }
  });

  it("maps home to /index.md and others to <path>.md", () => {
    expect(markdownPath("/")).toBe("/index.md");
    expect(markdownPath("/work/pumpdat")).toBe("/work/pumpdat.md");
    expect(findMarkdownPage("/nope")).toBeUndefined();
  });
});

describe("negotiation config", () => {
  it("rewrites both <path>.md and Accept: text/markdown for every page", () => {
    const rules = markdownRewrites();
    expect(rules).toHaveLength(PAGE_PATHS.length * 2);
    for (const path of PAGE_PATHS) {
      expect(rules.some((r) => r.source === markdownPath(path) && !("has" in r))).toBe(true);
      expect(rules.some((r) => r.source === path && "has" in r)).toBe(true);
    }
  });

  it("sets the Link alternate and Vary: Accept headers per page", () => {
    for (const rule of markdownHeaders()) {
      const keys = rule.headers.map((h) => h.key);
      expect(keys).toEqual(["Link", "Vary"]);
      expect(rule.headers[0]?.value).toContain('type="text/markdown"');
    }
  });
});

describe("discovery", () => {
  it("advertises the markdown mirror and llms.txt in page metadata", async () => {
    expect(homeMeta.alternates?.types).toMatchObject({
      "text/markdown": "https://rayyanabzal.com/index.md",
      "text/plain": "https://rayyanabzal.com/llms.txt",
    });
    const meta = await caseMetadata({ params: Promise.resolve({ slug: "feedhack" }) });
    expect(meta.alternates?.types).toMatchObject({
      "text/markdown": "https://rayyanabzal.com/work/feedhack.md",
    });
  });

  it("llms.txt has the guide shape and links the mirrors", () => {
    const text = llmsTxt();
    expect(text.startsWith("# Rayyan Abzal")).toBe(true);
    expect(text).toContain("\n> ");
    for (const heading of ["## Services", "## Work", "## About"]) expect(text).toContain(heading);
    for (const slug of ["influence", "influence-v2", "feedhack", "pumpdat"]) {
      expect(text).toContain(`https://rayyanabzal.com/work/${slug}.md`);
    }
  });
});
