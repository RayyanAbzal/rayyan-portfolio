import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { SES_BASE, SesFrame, SesRich } from "@/components/refs/pages/ses-chrome";
import { SesClientVisual } from "@/components/refs/pages/ses-visual";
import { SesStage } from "@/components/refs/ses-client";
import { HARNESS, HARNESS_STATS } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import type { Rich } from "@/content/rich";

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

function ObjectArt({ kind }: { kind: (typeof OBJECTS)[number] }) {
  return (
    <div className={`obj obj-${kind}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

const HOME_PROJECTS = CLIENT_PROJECTS.slice(0, 3);

export function DesignSes() {
  const headline = HOME.heroHeadline;
  const lede = firstSentences(HOME.heroLede, 1);
  const statsLede = firstSentences(HARNESS.lede, 2);

  return (
    <SesFrame current="home">
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
          items={HOME_PROJECTS.map((p) => ({
            slug: p.slug,
            name: p.name,
            title: p.title,
            outcome: p.outcome,
            href: `${SES_BASE}/case/${p.slug}`,
          }))}
          visuals={HOME_PROJECTS.map((p) => <SesClientVisual key={p.slug} slug={p.slug} />)}
        />
        <p className="work-more">
          <Link href={`${SES_BASE}/projects`} className="sp sp-ghost">
            {HOME.workLink}
          </Link>
        </p>
      </section>

      <section className="band-wrap wrap" data-sharp aria-labelledby="ses-band">
        <div className="band">
          <h2 id="ses-band" className="sr-only">
            {HOME.aboutHeading}
          </h2>
          <p className="band-text">{HOME.aboutBig}</p>
          <Link href={`${SES_BASE}/about`} className="sp sp-light">
            {HOME.aboutLink}
          </Link>
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

      <section className="home-quote wrap" data-sharp aria-labelledby="ses-quote">
        <h2 id="ses-quote" className="sr-only">
          Client words
        </h2>
        <figure className="hq">
          <blockquote>
            <p>
              <SesRich value={HOME.quote} />
            </p>
          </blockquote>
          <figcaption>
            {HOME.quoteRole}, {HOME.quoteProject}
          </figcaption>
        </figure>
      </section>

      <section className="close wrap" data-sharp aria-labelledby="ses-close">
        <h2 id="ses-close" className="close-h">
          {richText(HOME.ctaTitle)}
        </h2>
        <BookLink source="design_preview" className="sp sp-ink sp-lg">
          {HOME.ctaButton}
        </BookLink>
      </section>
    </SesFrame>
  );
}
