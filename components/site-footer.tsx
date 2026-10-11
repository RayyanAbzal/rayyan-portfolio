import Link from "next/link";

import { CALENDLY_URL, EMAIL, LINKEDIN_URL, NAV_ITEMS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <span>
          <strong>Rayyan Abzal</strong> · AI consulting · Auckland, NZ · © 2026
        </span>
        <span className="links">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={CALENDLY_URL}>Book a call</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </span>
      </div>
    </footer>
  );
}
