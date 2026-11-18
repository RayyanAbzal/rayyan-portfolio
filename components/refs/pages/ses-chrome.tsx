import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/ses.css";
import "@/app/styles/refs/ses-pages.css";

import { BookLink } from "@/components/book-link";
import { SesFx } from "@/components/refs/ses-fx";
import type { Rich } from "@/content/rich";
import { EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

export type SesPage = "home" | "projects" | "about" | "contact";

export const SES_BASE = "/designs/ses";

const TABS: readonly { id: SesPage; label: string; href: string }[] = [
  { id: "home", label: "Home", href: SES_BASE },
  { id: "projects", label: "Projects", href: `${SES_BASE}/projects` },
  { id: "about", label: "About", href: `${SES_BASE}/about` },
];

/** The segmented pill nav shared by the home and every inner page. */
export function SesTop({ current }: { current: SesPage }) {
  return (
    <header className="top">
      <nav className="top-nav" aria-label="Main">
        <div className="seg">
          <Link href={SES_BASE} className="ses-chip" aria-label={`${SITE_NAME}, home`}>
            <i />
            <i />
          </Link>
          <ul className="seg-list">
            {TABS.map((t) => (
              <li key={t.id}>
                <Link href={t.href} className="seg-tab" aria-current={t.id === current ? "page" : undefined}>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="top-actions">
          <Link
            href={`${SES_BASE}/contact`}
            className="sp sp-ghost"
            aria-current={current === "contact" ? "page" : undefined}
          >
            Contact
          </Link>
          <BookLink source="design_preview" className="sp sp-ink">
            Book a call
          </BookLink>
        </div>
      </nav>
    </header>
  );
}

export function SesFoot() {
  return (
    <footer className="foot wrap">
      <p className="foot-name">{SITE_NAME}</p>
      <nav aria-label="Footer" className="foot-links">
        <Link href={`${SES_BASE}/projects`}>Projects</Link>
        <Link href={`${SES_BASE}/about`}>About</Link>
        <Link href={`${SES_BASE}/contact`}>Contact</Link>
        <Link href="/harness">How I build</Link>
        <a href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
          LinkedIn
        </a>
      </nav>
      <a href={`mailto:${EMAIL}`} className="foot-mail">
        {EMAIL}
      </a>
    </footer>
  );
}

/** Page frame: root element, behaviour layer, nav and footer. */
export function SesFrame({ current, children }: { current: SesPage; children: ReactNode }) {
  return (
    <main id="top" className="ref-root ref-ses">
      <SesFx />
      <SesTop current={current} />
      {children}
      <SesFoot />
    </main>
  );
}

/** Inline copy runs: highlight and mark take the brand colour, links stay links. */
export function SesRich({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) => {
        if (typeof part === "string") return part;
        if ("hi" in part) return <span key={i} className="r-hi">{part.hi}</span>;
        if ("mark" in part) return <span key={i} className="r-mark">{part.mark}</span>;
        if ("strong" in part) return <strong key={i}>{part.strong}</strong>;
        if ("nowrap" in part) return <span key={i} className="nowrap">{part.nowrap}</span>;
        return part.href.startsWith("/") ? (
          <Link key={i} className="r-link" href={part.href}>{part.link}</Link>
        ) : (
          <a key={i} className="r-link" href={part.href} target="_blank" rel="noopener noreferrer">{part.link}</a>
        );
      })}
    </>
  );
}
