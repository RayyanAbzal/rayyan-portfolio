import type { NextConfig } from "next";

// Old static URLs (*.html) redirect with an explicit 301 so search engines
// transfer ranking to the clean paths. `statusCode` replaces `permanent`
// (which would emit 308).
export const LEGACY_REDIRECTS = [
  { source: "/index.html", destination: "/" },
  { source: "/work.html", destination: "/work" },
  { source: "/about.html", destination: "/about" },
  { source: "/work/:slug([^/]+)\\.html", destination: "/work/:slug" },
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map((rule) => ({ ...rule, statusCode: 301 }));
  },
};

export default nextConfig;
