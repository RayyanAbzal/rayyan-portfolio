"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookLink } from "@/components/book-link";
import { CASE_SLUGS, type BookingSource, type CaseSlug, type NavSource } from "@/lib/book";
import { NAV_ITEMS } from "@/lib/site";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Analytics source for the nav booking link, matching the legacy labels. */
export function navSource(pathname: string): NavSource {
  if (pathname === "/") return "nav";
  if (pathname === "/work") return "nav_work";
  if (pathname === "/about") return "nav_about";
  if (pathname.startsWith("/work/")) {
    const slug = pathname.slice("/work/".length);
    const known = CASE_SLUGS.find((candidate: CaseSlug) => candidate === slug);
    return known ? `case_nav_${known}` : "nav_other";
  }
  return "nav_other";
}

export function SiteNav() {
  const pathname = usePathname();
  const source = navSource(pathname);

  return (
    <nav className="nav" aria-label="Main">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-name">
          <span className="sig" aria-hidden="true" />
          Rayyan Abzal
        </Link>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <BookLink source={source} className="nav-book">
            Book a call
          </BookLink>
        </div>
      </div>
      <div className="mobile-nav">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <BookLink source={`${source}_m` satisfies BookingSource} className="nav-book">
          Book a call
        </BookLink>
      </div>
    </nav>
  );
}
