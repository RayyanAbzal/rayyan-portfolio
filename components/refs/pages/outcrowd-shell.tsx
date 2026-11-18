import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/outcrowd.css";
import "@/app/styles/refs/outcrowd-pages.css";
import { BookLink } from "@/components/book-link";
import { OutcrowdFx } from "@/components/refs/outcrowd-client";
import type { Rich } from "@/content/rich";
import type { BookingSource } from "@/lib/book";
import { FOOTER_LINKS } from "@/lib/site";

export const OC = "/designs/outcrowd";

export type OcCurrent = "home" | "projects" | "about" | "contact";

export const OC_NAV = [
  { key: "projects", label: "Projects", href: `${OC}/projects` },
  { key: "about", label: "About", href: `${OC}/about` },
  { key: "contact", label: "Contact", href: `${OC}/contact` },
] as const;

/** Maps a real-site path inside copy to its page in this direction. */
export function ocHref(href: string): string {
  if (href === "/work") return `${OC}/projects`;
  if (href.startsWith("/work/")) return `${OC}/case/${href.slice("/work/".length)}`;
  if (href === "/about" || href === "/contact") return `${OC}${href}`;
  return href;
}

/** Plain text of a Rich run, for places that cannot hold markup. */
export function richText(rich: Rich): string {
  return rich
    .map((part) => {
      if (typeof part === "string") return part;
      if ("hi" in part) return part.hi;
      if ("mark" in part) return part.mark;
      if ("strong" in part) return part.strong;
      if ("nowrap" in part) return part.nowrap;
      return part.link;
    })
    .join("");
}

export function OcRich({ rich }: { rich: Rich }) {
  return (
    <>
      {rich.map((part, i) => {
        if (typeof part === "string") return part;
        if ("hi" in part) return <em key={i} className="oc-hi">{part.hi}</em>;
        if ("mark" in part) return <mark key={i} className="oc-mark">{part.mark}</mark>;
        if ("strong" in part) return <strong key={i}>{part.strong}</strong>;
        if ("nowrap" in part) return <span key={i} className="oc-nowrap">{part.nowrap}</span>;
        const href = ocHref(part.href);
        return href.startsWith("http") ? (
          <a key={i} href={href} className="oc-inline">{part.link}</a>
        ) : (
          <Link key={i} href={href} className="oc-inline">{part.link}</Link>
        );
      })}
    </>
  );
}

export function OcNav({ current }: { current: OcCurrent }) {
  return (
    <header className="oc-nav">
      <Link href={OC} className="oc-name" aria-current={current === "home" ? "page" : undefined}>Rayyan Abzal</Link>
      <nav aria-label="Primary" className="oc-links">
        {OC_NAV.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current === l.key ? "page" : undefined}>{l.label}</Link>
        ))}
      </nav>
      <BookLink source="design_preview" className="oc-pill oc-pill-sm">Book a call</BookLink>
    </header>
  );
}

export function OcFooter() {
  const legal = FOOTER_LINKS.filter((l) => l.href === "/privacy");
  return (
    <footer className="oc-foot">
      <nav aria-label="Footer">
        <Link href={OC}>Home</Link>
        {OC_NAV.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </nav>
      <nav aria-label="Legal">
        {legal.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </nav>
    </footer>
  );
}

/** The rounded dark page every outcrowd page sits in. */
export function OcPage({ current, children }: { current: OcCurrent; children: ReactNode }) {
  return (
    <main id="top" className="ref-root ref-outcrowd">
      <div className="oc-card">
        <OutcrowdFx />
        <div className="oc-stars" aria-hidden="true" />
        <OcNav current={current} />
        {children}
        <OcFooter />
      </div>
    </main>
  );
}

/** Glow header for an inner page. */
export function OcPageHero({ id, title, lede, children }: { id: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="oc-hero oc-page-hero" aria-labelledby={id}>
      <div className="oc-beam" aria-hidden="true" />
      <div className="oc-hero-copy">
        <h1 id={id} className="oc-h1">{title}</h1>
        {lede ? <p className="oc-lede">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

/** Closing band with the cone glow and the one booking button. */
export function OcCta({ id, title, body, label, source = "design_preview" }: { id: string; title: string; body: string; label: string; source?: BookingSource }) {
  return (
    <section className="oc-cta oc-reveal" aria-labelledby={id}>
      <p className="oc-cta-name">Rayyan Abzal</p>
      <h2 id={id} className="oc-cta-h">{title}</h2>
      <p className="oc-lede">{body}</p>
      <BookLink source={source} className="oc-pill oc-pill-glow">{label}</BookLink>
      <div className="oc-cone" aria-hidden="true" />
    </section>
  );
}
