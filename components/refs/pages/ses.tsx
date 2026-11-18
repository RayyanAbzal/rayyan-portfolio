import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { SES_BASE, SesFrame, SesRich } from "@/components/refs/pages/ses-chrome";
import { SesCase } from "@/components/refs/pages/ses-case";
import { SesSheet, type SheetRow } from "@/components/refs/pages/ses-sheet";
import { SesClientVisual, SesPersonalVisual } from "@/components/refs/pages/ses-visual";
import { ABOUT, ABOUT_SIDE_CARDS, FAQ_ITEMS, PRINCIPLES, PROCESS_STEPS, TESTIMONIALS } from "@/content/about";
import { CONTACT } from "@/content/contact";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import type { DirectionPages } from "./types";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function Projects() {
  return (
    <SesFrame current="projects">
      <section className="pg-hero wrap" aria-labelledby="pg-h1">
        <h1 id="pg-h1" className="pg-h">
          {WORK.h1}
        </h1>
        <p className="pg-lede">{WORK.lede}</p>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="pg-client">
        <p className="ses-eyebrow">Live demos, made-up data</p>
        <h2 id="pg-client" className="sec-h">
          {WORK.clientHeading}
        </h2>
        <ul className="proj-grid">
          {CLIENT_PROJECTS.map((p) => (
            <li key={p.slug} className="pcard">
              <div className="pcard-stage">
                <SesClientVisual slug={p.slug} />
              </div>
              <div className="pcard-body">
                <p className="pcard-name">{p.name}</p>
                <h3 className="pcard-title" id={`pc-${p.slug}`}>
                  <Link href={`${SES_BASE}/case/${p.slug}`} className="pcard-link" aria-labelledby={`pc-${p.slug}`} aria-describedby={`pb-${p.slug}`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="pcard-blurb" id={`pb-${p.slug}`}>
                  {p.blurb}
                </p>
                <p className="pcard-outcome">{p.outcome}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="pg-personal">
        <p className="ses-eyebrow">For myself</p>
        <h2 id="pg-personal" className="sec-h">
          {WORK.personalHeading}
        </h2>
        <p className="sec-lede">{WORK.personalLede}</p>
        <ul className="pers-grid">
          {PERSONAL_PROJECTS.map((p, i) => (
            <li key={p.title} className={`cat cat-${i + 1} pers`}>
              <div className="pers-stage">
                <SesPersonalVisual title={p.title} />
              </div>
              <div>
                <h3 className="cat-title">{p.title}</h3>
                <p className="pers-blurb">{p.blurb}</p>
              </div>
              <p className="cat-meta">{p.stack}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-wrap wrap" data-sharp aria-labelledby="pg-cta">
        <div className="band">
          <h2 id="pg-cta" className="band-text">
            {WORK.ctaTitle}
          </h2>
          <p className="band-body">{WORK.ctaBody}</p>
          <BookLink source="work_contact" className="sp sp-light sp-lg">
            {WORK.ctaButton}
          </BookLink>
        </div>
      </section>
    </SesFrame>
  );
}

const aboutFacts: SheetRow[] = ABOUT_SIDE_CARDS.map((card) => ({
  key: card.label,
  label: card.label,
  value: (
    <>
      <p>{card.title}</p>
      <p className="sheet-sub">
        <SesRich
          value={card.body.map((part) =>
            typeof part !== "string" && "link" in part && part.href === "/work"
              ? { link: part.link, href: `${SES_BASE}/projects` }
              : part,
          )}
        />
      </p>
    </>
  ),
}));

function About() {
  const [lead, ...rest] = ABOUT.paragraphs;
  return (
    <SesFrame current="about">
      <section className="pg-hero wrap" aria-labelledby="ab-h1">
        <p className="ses-eyebrow">{ABOUT.role}</p>
        <h1 id="ab-h1" className="pg-h">
          {ABOUT.h1}
        </h1>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="ab-story">
        <h2 id="ab-story" className="sr-only">
          The story
        </h2>
        <div className="story">
          <div className="story-copy">
            {lead ? (
              <p className="lead">
                <SesRich value={lead} />
              </p>
            ) : null}
            {rest.map((para, i) => (
              <p key={i}>
                <SesRich value={para} />
              </p>
            ))}
          </div>
          <SesSheet rows={aboutFacts} />
        </div>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="ab-prin">
        <p className="ses-eyebrow">{ABOUT.principlesIntro}</p>
        <h2 id="ab-prin" className="sec-h">
          {ABOUT.principlesHeading}
        </h2>
        <ol className="prin-grid">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className={`cat prin prin-${i + 1}`}>
              <h3 className="cat-title">{p.title}</h3>
              <p className="cat-body">{p.body}</p>
              <p className="prin-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flow wrap" data-sharp aria-labelledby="ab-flow">
        <p className="ses-eyebrow">{ABOUT.processLede}</p>
        <h2 id="ab-flow" className="sec-h">
          {ABOUT.processHeading}
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

      <section className="pg-sec wrap" data-sharp aria-labelledby="ab-words">
        <h2 id="ab-words" className="sec-h">
          {ABOUT.testimonialsHeading}
        </h2>
        <div className="words" style={{ marginTop: "clamp(24px, 4vw, 44px)" }}>
          {TESTIMONIALS.slice(1).map((t) => (
            <figure key={t.project} className="word">
              <figcaption className="word-who">
                <b>{t.role}</b>
                {t.project}
                <br />
                <Link href={`${SES_BASE}/case/${t.linkHref.split("/").pop()}`}>Read the {t.linkLabel} case</Link>
              </figcaption>
              <blockquote>{t.quote}</blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="ab-faq">
        <h2 id="ab-faq" className="sec-h">
          {ABOUT.faqHeading}
        </h2>
        <div className="faq" style={{ marginTop: "clamp(24px, 4vw, 44px)" }}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <p className="faq-a">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="band-wrap wrap" data-sharp aria-labelledby="ab-cta">
        <div className="band">
          <h2 id="ab-cta" className="band-text">
            {ABOUT.ctaTitle}
          </h2>
          <p className="band-body">{ABOUT.ctaBody}</p>
          <BookLink source="about_contact" className="sp sp-light sp-lg">
            {ABOUT.ctaButton}
          </BookLink>
        </div>
      </section>
    </SesFrame>
  );
}

function Contact() {
  return (
    <SesFrame current="contact">
      <section className="pg-hero wrap" aria-labelledby="ct-h1">
        <h1 id="ct-h1" className="pg-h">
          {CONTACT.h1}
        </h1>
        <p className="pg-lede">{CONTACT.lede}</p>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="ct-ways">
        <h2 id="ct-ways" className="sr-only">
          {CONTACT.waysHeading}
        </h2>
        <ul className="way-grid">
          <li className="cat way way-book">
            <h3 className="cat-title">
              <BookLink source="contact_page" className="way-link">
                {CONTACT.bookLabel}
              </BookLink>
            </h3>
            <p className="cat-body">{CONTACT.bookNote}</p>
            <p className="way-val">
              <span>Pick a time</span>
              <span className="way-go" aria-hidden="true">
                <Arrow />
              </span>
            </p>
          </li>
          <li className="cat way way-mail">
            <h3 className="cat-title">
              <a href={`mailto:${EMAIL}`} className="way-link">
                {CONTACT.emailLabel}
              </a>
            </h3>
            <p className="way-val">
              <span>{EMAIL}</span>
              <span className="way-go" aria-hidden="true">
                <Arrow />
              </span>
            </p>
          </li>
          <li className="cat way way-in">
            <h3 className="cat-title">
              <a href={LINKEDIN_URL} className="way-link" target="_blank" rel="noopener noreferrer">
                {CONTACT.linkedinLabel}
              </a>
            </h3>
            <p className="way-val">
              <span>Rayyan Abzal</span>
              <span className="way-go" aria-hidden="true">
                <Arrow />
              </span>
            </p>
          </li>
        </ul>
      </section>

      <section className="pg-sec wrap" data-sharp aria-labelledby="ct-sheet">
        <h2 id="ct-sheet" className="sr-only">
          Before you write
        </h2>
        <SesSheet
          rows={[
            { key: "where", label: CONTACT.locationHeading, value: <p className="sheet-sub">{CONTACT.location}</p> },
            {
              key: "first",
              label: CONTACT.firstMessageHeading,
              value: (
                <>
                  <p className="sheet-sub">{CONTACT.firstMessageIntro}</p>
                  <ol>
                    {CONTACT.firstMessageItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </>
              ),
            },
            {
              key: "next",
              label: CONTACT.nextHeading,
              value: (
                <>
                  {CONTACT.next.map((line) => (
                    <p key={line} className="sheet-sub">
                      {line}
                    </p>
                  ))}
                </>
              ),
            },
          ]}
        />
      </section>
    </SesFrame>
  );
}

export const PAGES: DirectionPages = {
  projects: () => <Projects />,
  about: () => <About />,
  contact: () => <Contact />,
  caseStudy: ({ slug }) => <SesCase slug={slug} />,
};
