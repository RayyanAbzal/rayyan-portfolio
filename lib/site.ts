export const SITE_URL = "https://rayyanabzal.com";
export const SITE_NAME = "Rayyan Abzal";
export const CALENDLY_URL = "https://calendly.com/rayyanabzal/discovery";
export const EMAIL = "rayyanabzal@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/rayyan-a-832a20213";
export const OG_IMAGE_URL = `${SITE_URL}/og.png`;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
];

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/** Footer-only links: trust pages that stay out of the top nav. */
export const FOOTER_LINKS: readonly NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];
