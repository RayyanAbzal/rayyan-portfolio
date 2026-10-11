"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookLink } from "@/components/book-link";
import { NAV_ITEMS } from "@/lib/site";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Analytics source for the nav booking link, matching the legacy labels. */
export function navSource(pathname: string): string {
  if (pathname === "/") return "nav";
  if (pathname === "/work") return "nav_work";
  if (pathname === "/about") return "nav_about";
  if (pathname.startsWith("/work/")) {
    return `case_nav_${pathname.slice("/work/".length)}`;
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
        <BookLink source={`${source}_m`} className="nav-book">
          Book a call
        </BookLink>
      </div>
    </nav>
  );
}
