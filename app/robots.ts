import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Same rules as the legacy robots.txt: every crawler allowed, the AI answer
// engines named explicitly, /logo-exports/ blocked for all.
export const AI_CRAWLERS: readonly string[] = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/logo-exports/" },
      { userAgent: [...AI_CRAWLERS], allow: "/", disallow: "/logo-exports/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
