import type { MetadataRoute } from "next";

import { SITEMAP_ENTRIES, sitemapUrl } from "@/lib/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map((entry) => ({
    url: sitemapUrl(entry),
    lastModified: entry.lastModified,
    priority: entry.priority,
  }));
}
