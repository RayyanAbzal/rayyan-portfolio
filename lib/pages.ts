// Dependency-free page registry. next.config.ts imports this file, so it must
// not import anything through the "@/" alias.

export type CaseSlug = "influence" | "influence-v2" | "feedhack" | "pumpdat";

export const CASE_SLUGS: readonly CaseSlug[] = ["influence", "influence-v2", "feedhack", "pumpdat"];

/** Every canonical HTML page path. */
export const PAGE_PATHS: readonly string[] = [
  "/",
  "/work",
  "/about",
  "/contact",
  "/privacy",
  ...CASE_SLUGS.map((slug) => `/work/${slug}`),
];

/** Markdown mirror path for a page path: "/" is "/index.md", others append ".md". */
export function markdownPath(path: string): string {
  return path === "/" ? "/index.md" : `${path}.md`;
}
