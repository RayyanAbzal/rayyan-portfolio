import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/styles/refs/nexora.css";
import "@/app/styles/refs/nexora-pages.css";
import { BookLink } from "@/components/book-link";
import { NexoraFx } from "@/components/refs/nexora-client";
import type { BookingSource } from "@/lib/book";
import { EMAIL } from "@/lib/site";

/** Base path of this direction. */
export const NX = "/designs/nexora";

export type NxCurrent = "home" | "projects" | "about" | "contact" | "case";

const NAV = [
  { label: "Projects", href: `${NX}/projects`, key: "projects" },
  { label: "About", href: `${NX}/about`, key: "about" },
  { label: "Contact", href: `${NX}/contact`, key: "contact" },
] as const;

/** A case study href from a content link such as "/work/feedhack"; anything else goes to Projects. */
export function caseHref(href: string): string {
  const match = /^\/work\/([a-z0-9-]+)$/.exec(href);
  return match ? `${NX}/case/${match[1]}` : `${NX}/projects`;
}

export function NxNav({ current }: { current: NxCurrent }) {
  return (
    <header className="nx-nav">
      <Link href={NX} className="nx-name">Rayyan Abzal</Link>
      <nav aria-label="Primary">
        <ul>
          {NAV.map((n) => (
            <li key={n.key}>
              <Link href={n.href} aria-current={current === n.key ? "page" : undefined}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <BookLink source="design_preview" className="nx-pill nx-pill-solid nx-nav-book">Book a call</BookLink>
    </header>
  );
}

export function NxFooter() {
  return (
    <footer className="nx-footer">
      <Link href={NX} className="nx-name">Rayyan Abzal</Link>
      <ul>
        {NAV.map((n) => (
          <li key={n.key}><Link href={n.href}>{n.label}</Link></li>
        ))}
        <li><Link href="/privacy">Privacy</Link></li>
      </ul>
    </footer>
  );
}

/** Root of every inner page: the aurora pointer lean and sharpen observer live in NexoraFx. */
export function NxPage({ children }: { children: ReactNode }) {
  return (
    <main id="top" className="ref-root ref-nexora">
      <NexoraFx />
      {children}
      <NxFooter />
    </main>
  );
}

interface HeroProps {
  current: NxCurrent;
  chip: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}

/** The home hero, shorter: aurora, centred headline, no trust row. */
export function NxPageHero({ current, chip, title, lede, children }: HeroProps) {
  return (
    <section className="nx-hero nx-hero-sm" aria-labelledby="nx-h1" data-nx-aurora>
      <NxNav current={current} />
      <div className="nx-hero-copy">
        <p className="nx-chip">{chip}</p>
        <h1 id="nx-h1">{title}</h1>
        <p className="nx-lede">{lede}</p>
        {children}
      </div>
    </section>
  );
}

export function NxSplit({ tag, title, body, id }: { tag: string; title: ReactNode; body?: string; id: string }) {
  return (
    <div className="nx-split" data-nx-sharpen>
      <div>
        <p className="nx-tag"><span aria-hidden="true" />{tag}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {body ? <p className="nx-split-body">{body}</p> : null}
    </div>
  );
}

interface CtaProps {
  id: string;
  title: ReactNode;
  body: string;
  button: string;
  source: BookingSource;
}

export function NxCta({ id, title, body, button, source }: CtaProps) {
  return (
    <section className="nx-cta" aria-labelledby={id} data-nx-aurora>
      <h2 id={id}>{title}</h2>
      <p>{body}</p>
      <div className="nx-actions">
        <BookLink source={source} className="nx-pill nx-pill-solid">{button}</BookLink>
        <a href={`mailto:${EMAIL}`} className="nx-pill nx-pill-ghost">Email me</a>
      </div>
    </section>
  );
}
