import "@/app/styles/refs/ses.css";

import Link from "next/link";
import type { ReactNode } from "react";

import { BookLink } from "@/components/book-link";
import { SesStage } from "@/components/refs/ses-client";
import { SesFx } from "@/components/refs/ses-fx";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { PROCESS_STEPS } from "@/content/about";
import { CASE_STUDIES } from "@/content/case-studies";
import { HARNESS, HARNESS_STATS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS, type ClientProject } from "@/content/projects";
import type { Rich } from "@/content/rich";
import { EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

const SCHEMATICS: Record<ClientProject["slug"], () => ReactNode> = {
  influence: () => <InfluenceSchematic />,
  feedhack: () => <FeedhackSchematic />,
  pumpdat: () => <PumpdatSchematic />,
  "influence-v2": () => <InfluenceV2Schematic />,
};

const NAV_TABS = [
  { label: "Home", href: "#top", current: true },
  { label: "Projects", href: "/work", current: false },
  { label: "About", href: "/about", current: false },
  { label: "How I build", href: "/harness", current: false },
] as const;

const OBJECTS = ["plates", "block", "orbs"] as const;

function richText(parts: Rich): string {
  return parts
    .map((p) => {
      if (typeof p === "string") return p;
      if ("hi" in p) return p.hi;
      if ("mark" in p) return p.mark;
      if ("strong" in p) return p.strong;
      if ("nowrap" in p) return p.nowrap;
      return p.link;
    })
    .join("");
}

function firstSentences(text: string, count: number): string {
  return text.split(/(?<=\.)\s+/).slice(0, count).join(" ");
}

interface SpecRow {
  label: string;
  value: string;
}

/** Splits "Outcome sentence. Timeline, status." into spec table rows. */
function specRows(project: ClientProject): SpecRow[] {
  const sentences = project.outcome.split(". ");
  const outcome = (sentences[0] ?? "").replace(/\.$/, "");
  const tail = (sentences[1] ?? "").replace(/\.$/, "");
  const [timeline = "", status = ""] = tail.split(", ");
  const rows: SpecRow[] = [{ label: "Outcome", value: outcome }];
  if (timeline) rows.push({ label: "Timeline", value: timeline });
  if (status) rows.push({ label: "Status", value: status.charAt(0).toUpperCase() + status.slice(1) });
  rows.push({ label: "Stack", value: CASE_STUDIES[project.slug].stack.slice(0, 5).join(", ") });
  return rows;
}

function ObjectArt({ kind }: { kind: (typeof OBJECTS)[number] }) {
  return (
    <div className={`obj obj-${kind}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

export function DesignSes() {
  const headline = HOME.heroHeadline;
  const lede = firstSentences(HOME.heroLede, 1);
  const statsLede = firstSentences(HARNESS.lede, 2);

  return (
    <main id="top" className="ref-root ref-ses">
      <SesFx />
      <header className="top">
        <nav className="top-nav" aria-label="Main">
          <div className="seg">
            <span className="ses-chip" aria-hidden="true">
              <i />
              <i />
            </span>
            <ul className="seg-list">
              {NAV_TABS.map((t) => (
                <li key={t.label}>
                  {t.href.startsWith("#") ? (
                    <a href={t.href} className="seg-tab" aria-current={t.current ? "page" : undefined}>
                      {t.label}
                    </a>
                  ) : (
                    <Link href={t.href} className="seg-tab">
                      {t.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="top-actions">
            <Link href="/contact" className="sp sp-ghost">
              Contact
            </Link>
            <BookLink source="design_preview" className="sp sp-ink">
              Book a call
            </BookLink>
          </div>
        </nav>
      </header>

      <section className="ses-hero wrap" aria-labelledby="ses-h1">
        <h1 id="ses-h1" className="ses-hero-h">
          {headline.map((part, i) =>
            typeof part === "string" ? (
              <span key={i}>{part}</span>
            ) : "mark" in part ? (
              <span key={i} className="key">
                {part.mark}
              </span>
            ) : (
              <span key={i}>{richText([part])}</span>
            ),
          )}
        </h1>
        <p className="ses-hero-lede">{lede}</p>
      </section>

      <section className="cats wrap" data-sharp aria-labelledby="ses-offers">
        <h2 id="ses-offers" className="sr-only">
          {HOME.servicesTitle}
        </h2>
        <ul className="cat-grid">
          {OFFERS.map((offer, i) => (
            <li key={offer.title} className={`cat cat-${i + 1}`}>
              <h3 className="cat-title">{offer.title}</h3>
              <p className="cat-body">{offer.body}</p>
              <ObjectArt kind={OBJECTS[i] ?? "plates"} />
              <p className="cat-meta">{offer.duration}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="work wrap" data-sharp aria-labelledby="ses-work">
        <p className="ses-eyebrow">Client work</p>
        <h2 id="ses-work" className="sec-h">
          {HOME.workTitle}
        </h2>
        <SesStage
          items={CLIENT_PROJECTS.map((p) => ({
            slug: p.slug,
            name: p.name,
            title: p.title,
            outcome: p.outcome,
          }))}
          visuals={CLIENT_PROJECTS.map((p) => SCHEMATICS[p.slug]())}
        />
      </section>

      <section className="band-wrap wrap" data-sharp aria-labelledby="ses-band">
        <div className="band">
          <h2 id="ses-band" className="sr-only">
            {HOME.aboutHeading}
          </h2>
          <p className="band-text">{HOME.aboutBig}</p>
        </div>
      </section>

      <section className="nums wrap" data-sharp aria-labelledby="ses-nums">
        <div className="nums-text">
          <p className="ses-eyebrow">{HARNESS.statsHeading}</p>
          <h2 id="ses-nums" className="nums-h">
            {HARNESS.h1}
          </h2>
          <p className="nums-lede">{statsLede}</p>
          <Link href="/harness" className="sp sp-ghost">
            {HARNESS.teaserLink}
          </Link>
        </div>
        <dl className="stat-col">
          {HARNESS_STATS.map((s) => (
            <div key={s.label} className="stat">
              <dt className="stat-l">{s.label}</dt>
              <dd className="stat-v" data-count={s.value}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flow wrap" data-sharp aria-labelledby="ses-flow">
        <p className="ses-eyebrow">How it works</p>
        <h2 id="ses-flow" className="sec-h">
          From first call to handover.
        </h2>
        <ol className="pipe">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title} className="pipe-step">
              <div className="pipe-node">
                <span className="pipe-label">{step.title}</span>
                <span className="diamond" aria-hidden="true" />
                <span className="drop" aria-hidden="true" />
              </div>
              <div className="pipe-card">
                <span className="pipe-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="pipe-title">{step.title}</h3>
                <p className="pipe-body">{step.body}</p>
                <p className="pipe-when">{step.when}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="specs wrap" data-sharp aria-labelledby="ses-specs">
        <p className="ses-eyebrow">Every build, in detail</p>
        <h2 id="ses-specs" className="sec-h">
          {HOME.workLede.split(". ")[0]}.
        </h2>
        <ul className="spec-list">
          {CLIENT_PROJECTS.map((p) => (
            <li key={p.slug} className="spec">
              <div className="spec-copy">
                <p className="spec-name">{p.name}</p>
                <h3 className="spec-title">
                  <Link href={`/work/${p.slug}`} className="spec-link">
                    {p.title}
                  </Link>
                </h3>
                <p className="spec-blurb">{p.blurb}</p>
              </div>
              <div className="spec-stage">{SCHEMATICS[p.slug]()}</div>
              <table className="spec-table">
                <caption className="sr-only">{p.name} facts</caption>
                <tbody>
                  {specRows(p).map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </section>

      <section className="close wrap" data-sharp aria-labelledby="ses-close">
        <h2 id="ses-close" className="close-h">
          {richText(HOME.ctaTitle)}
        </h2>
        <BookLink source="design_preview" className="sp sp-ink sp-lg">
          {HOME.ctaButton}
        </BookLink>
      </section>

      <footer className="foot wrap">
        <p className="foot-name">{SITE_NAME}</p>
        <nav aria-label="Footer" className="foot-links">
          <Link href="/work">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/harness">How I build</Link>
          <Link href="/contact">Contact</Link>
          <a href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
        </nav>
        <a href={`mailto:${EMAIL}`} className="foot-mail">
          {EMAIL}
        </a>
      </footer>
    </main>
  );
}
