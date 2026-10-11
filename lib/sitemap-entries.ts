import { absoluteUrl } from "@/lib/site";

export interface SitemapEntry {
  path: string;
  lastModified: string;
  priority: number;
}

const MIGRATED = "2026-10-12";

/** The seven public URLs. Home keeps its old lastmod: its content and url did not change. */
export const SITEMAP_ENTRIES: readonly SitemapEntry[] = [
  { path: "/", lastModified: "2026-09-12", priority: 1.0 },
  { path: "/work", lastModified: MIGRATED, priority: 0.8 },
  { path: "/about", lastModified: MIGRATED, priority: 0.8 },
  { path: "/work/influence", lastModified: MIGRATED, priority: 0.7 },
  { path: "/work/influence-v2", lastModified: MIGRATED, priority: 0.7 },
  { path: "/work/feedhack", lastModified: MIGRATED, priority: 0.7 },
  { path: "/work/pumpdat", lastModified: MIGRATED, priority: 0.7 },
];

export function sitemapUrl(entry: SitemapEntry): string {
  return absoluteUrl(entry.path);
}
