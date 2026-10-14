import type { NextConfig } from "next";

import { PAGE_PATHS, markdownPath } from "./lib/pages";

// Old static URLs (*.html) redirect with an explicit 301 so search engines
// transfer ranking to the clean paths. `statusCode` replaces `permanent`
// (which would emit 308).
export const LEGACY_REDIRECTS = [
  { source: "/index.html", destination: "/" },
  { source: "/work.html", destination: "/work" },
  { source: "/about.html", destination: "/about" },
  { source: "/work/:slug([^/]+)\\.html", destination: "/work/:slug" },
] as const;

const MARKDOWN_ACCEPT = { type: "header", key: "accept", value: ".*text/markdown.*" } as const;

/** Rewrites that serve the markdown mirror for `<path>.md` and for `Accept: text/markdown`. */
export function markdownRewrites() {
  const perPage = PAGE_PATHS.flatMap((path) => {
    const destination = `/md${path === "/" ? "/index" : path}`;
    return [
      { source: markdownPath(path), destination },
      { source: path, has: [MARKDOWN_ACCEPT], destination },
    ];
  });
  // An unknown case study slug would otherwise reach the HTML dynamic route.
  const unknownCase = {
    source: "/work/:slug",
    has: [MARKDOWN_ACCEPT],
    destination: "/md/work/:slug",
  };
  return [...perPage, unknownCase];
}

/**
 * Fallback rewrite: fires only when no page or route matched. A markdown
 * request for a missing path gets a readable 404 body (status stays 404);
 * HTML requests keep the branded not-found page.
 */
export function markdownFallback() {
  return [{ source: "/:path*", has: [MARKDOWN_ACCEPT], destination: "/md/not-found" }];
}

/**
 * Advertises the mirror on each HTML page and declares `Vary: Accept`. Next
 * overwrites Vary on prerendered pages it serves itself, so the header is
 * guaranteed on the markdown responses and on Accept-rewritten requests.
 */
export function markdownHeaders() {
  return PAGE_PATHS.map((path) => ({
    source: path,
    headers: [
      {
        key: "Link",
        value: `<${markdownPath(path)}>; rel="alternate"; type="text/markdown"`,
      },
      { key: "Vary", value: "Accept" },
    ],
  }));
}

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map((rule) => ({ ...rule, statusCode: 301 }));
  },
  async rewrites() {
    return { beforeFiles: markdownRewrites(), afterFiles: [], fallback: markdownFallback() };
  },
  async headers() {
    return markdownHeaders();
  },
};

export default nextConfig;
