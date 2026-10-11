import type { Metadata } from "next";

import { markdownPath } from "@/lib/pages";
import { OG_IMAGE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

const ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export interface PageSeo {
  /** Full document title, used as written (no template). */
  title: string;
  description: string;
  /** Clean site path, e.g. "/work". */
  path: string;
  /** Open Graph and Twitter description when it differs from `description`. */
  socialDescription?: string;
  /** Set for case studies: emits og:type article plus the article tags. */
  article?: { modifiedTime: string };
}

/**
 * The full per-page metadata set. A page-level `openGraph` or `twitter`
 * object replaces the layout's rather than merging, so every page builds
 * the complete set here.
 */
export function pageMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const social = seo.socialDescription ?? seo.description;
  const image = { url: OG_IMAGE_URL, width: 1200, height: 630 };
  const openGraph: Metadata["openGraph"] = seo.article
    ? {
        type: "article",
        url,
        siteName: SITE_NAME,
        locale: "en_NZ",
        title: seo.title,
        description: social,
        images: [image],
        modifiedTime: seo.article.modifiedTime,
        authors: [absoluteUrl("/about")],
      }
    : {
        type: "website",
        url,
        siteName: SITE_NAME,
        locale: "en_NZ",
        title: seo.title,
        description: social,
        images: [image],
      };

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: url,
      // Emits <link rel="alternate" type="..."> for the markdown mirror and llms.txt.
      types: {
        "text/markdown": absoluteUrl(markdownPath(seo.path)),
        "text/plain": absoluteUrl("/llms.txt"),
      },
    },
    robots: ROBOTS,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: social,
      images: [OG_IMAGE_URL],
    },
  };
}
