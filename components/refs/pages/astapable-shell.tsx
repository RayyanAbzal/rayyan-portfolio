import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/astapable.css";
import "@/app/styles/refs/astapable-pages.css";
import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { AstapableFx } from "@/components/refs/astapable-client";
import type { Rich } from "@/content/rich";
import type { BookingSource } from "@/lib/book";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

export const BASE = "/designs/astapable";

export type AsPage = "projects" | "about" | "contact";

const NAV: readonly { key: AsPage; label: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

/** Plain text of an inline run, for places that cannot take markup. */
export function plain(rich: Rich): string {
  return rich
    .map((part) => {
      if (typeof part === "string") return part;
      if ("mark" in part) return part.mark;
      if ("nowrap" in part) return part.nowrap;
      if ("strong" in part) return part.strong;
      if ("hi" in part) return part.hi;
      return part.link;
    })
    .join("");
}

/** Maps a real-site path from content/ onto this direction's route. */
export function dirHref(href: string): string {
  if (href === "/work" || href === "/#work") return `${BASE}/projects`;
  if (href.startsWith("/work/")) return `${BASE}/case/${href.slice("/work/".length)}`;
  if (href === "/about") return `${BASE}/about`;
  if (href === "/contact") return `${BASE}/contact`;
  return href;
}

/** RichText with internal links pointed at this direction. */
export function AsRich({ value }: { value: Rich }) {
  const mapped = value.map((part) =>
    typeof part !== "string" && "link" in part ? { ...part, href: dirHref(part.href) } : part,
  ) as Rich;
  return <RichText value={mapped} />;
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.54h.05c.53-1 1.82-1.84 3.75-1.84 4 0 4.75 2.5 4.75 5.76V21h-4v-5.1c0-1.22-.02-2.78-1.8-2.78-1.8 0-2.07 1.34-2.07 2.69V21h-4V9.75Z" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function AsHeader({ current }: { current?: AsPage }) {
  return (
    <header className="as-bar">
      <div className="as-brand">
        <Link href={BASE} className="as-name">
          Rayyan Abzal
        </Link>
        <span className="as-chip">AI engineer</span>
      </div>
      <nav aria-label="Primary" className="as-links">
        {NAV.map((n) => (
          <Link key={n.key} href={`${BASE}/${n.key}`} aria-current={current === n.key ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="as-tools">
        <a className="as-round" href={LINKEDIN_URL} aria-label="Rayyan on LinkedIn" rel="noopener">
          <IconLinkedIn />
        </a>
        <a className="as-round" href={`mailto:${EMAIL}`} aria-label="Email Rayyan">
          <IconMail />
        </a>
        <BookLink source="design_preview" className="as-btn as-btn-ink">
          Book a call
        </BookLink>
      </div>
    </header>
  );
}

export function AsFooter() {
  return (
    <footer className="as-foot as-sharp">
      <p>Rayyan Abzal</p>
      <p>AI engineer and consultant</p>
      <p>Auckland, New Zealand</p>
    </footer>
  );
}

/** Page frame shared by home and every inner page. */
export function AsShell({ current, children }: { current?: AsPage; children: ReactNode }) {
  return (
    <main id="top" className="ref-root ref-astapable">
      <AstapableFx />
      <a className="as-skip" href="#as-main">
        Skip to content
      </a>
      <AsHeader current={current} />
      <div id="as-main">{children}</div>
      <AsFooter />
    </main>
  );
}

/** Huge closing line with one booking button, used by projects, about and case pages. */
export function AsClosing({ title, body, source, id }: { title: string; body: string; source: BookingSource; id: string }) {
  return (
    <section aria-labelledby={id} className="as-close as-close-page">
      <h2 id={id} className="as-sharp">
        {title}
      </h2>
      <p className="as-close-body as-sharp">{body}</p>
      <div className="as-actions as-sharp">
        <BookLink source={source} className="as-btn as-btn-ink">
          Book a free intro call
        </BookLink>
      </div>
    </section>
  );
}
