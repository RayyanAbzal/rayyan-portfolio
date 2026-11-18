import { BookLink } from "@/components/book-link";
import { CONTACT } from "@/content/contact";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { NxAbout } from "./nexora-about";
import { NxCase } from "./nexora-case";
import { NxClientRow, NxPersonalRow } from "./nexora-rows";
import { NxCta, NxPage, NxPageHero, NxSplit } from "./nexora-shell";
import type { DirectionPages } from "./types";

function Projects() {
  return (
    <NxPage>
      <NxPageHero current="projects" chip="Projects" title={WORK.h1} lede={WORK.lede} />

      <section className="nx-section" aria-labelledby="nx-clients-h">
        <NxSplit id="nx-clients-h" tag="Client work" title={WORK.clientHeading} />
        <ul className="nx-rows">
          {CLIENT_PROJECTS.map((p) => (
            <NxClientRow key={p.slug} project={p} />
          ))}
        </ul>
      </section>

      <section className="nx-section" aria-labelledby="nx-personal-h">
        <NxSplit id="nx-personal-h" tag="Side projects" title={WORK.personalHeading} body={WORK.personalLede} />
        <ul className="nx-rows">
          {PERSONAL_PROJECTS.map((p) => (
            <NxPersonalRow key={p.title} project={p} />
          ))}
        </ul>
      </section>

      <NxCta id="nx-cta-h" title={WORK.ctaTitle} body={WORK.ctaBody} button={WORK.ctaButton} source="work_contact" />
    </NxPage>
  );
}

const WAY_ICONS = {
  book: <path d="M5 6h14v13H5zM5 10h14M9 3v4M15 3v4" />,
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  linkedin: <path d="M5 10v9M5 5.5v.01M10 19v-9M10 14c0-2.5 1.5-4 3.5-4s3 1.3 3 3.5V19" />,
} as const;

function WayIcon({ name }: { name: keyof typeof WAY_ICONS }) {
  return (
    <span className="nx-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {WAY_ICONS[name]}
      </svg>
    </span>
  );
}

function Contact() {
  return (
    <NxPage>
      <NxPageHero current="contact" chip="Contact" title={CONTACT.h1} lede={CONTACT.lede} />

      <section className="nx-section" aria-labelledby="nx-ways-h">
        <NxSplit id="nx-ways-h" tag="Start here" title={CONTACT.waysHeading} />
        <ul className="nx-ways">
          <li className="nx-way nx-way-fill">
            <WayIcon name="book" />
            <h3>{CONTACT.bookLabel}</h3>
            <p>{CONTACT.bookNote}</p>
            <BookLink source="contact_page" className="nx-pill nx-pill-solid">Pick a time</BookLink>
          </li>
          <li className="nx-way">
            <WayIcon name="mail" />
            <h3>{CONTACT.emailLabel}</h3>
            <a className="nx-way-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li className="nx-way">
            <WayIcon name="linkedin" />
            <h3>{CONTACT.linkedinLabel}</h3>
            <a className="nx-way-link" href={LINKEDIN_URL} target="_blank" rel="noopener">Rayyan Abzal</a>
          </li>
        </ul>
      </section>

      <section className="nx-section nx-contact-cols" aria-label="Before you write">
        <div data-nx-sharpen>
          <p className="nx-tag"><span aria-hidden="true" />First message</p>
          <h2 className="nx-h2-sm">{CONTACT.firstMessageHeading}</h2>
          <p className="nx-split-body">{CONTACT.firstMessageIntro}</p>
          <ol className="nx-checklist">
            {CONTACT.firstMessageItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="nx-contact-side" data-nx-sharpen>
          <div>
            <p className="nx-tag"><span aria-hidden="true" />Location</p>
            <h2 className="nx-h2-sm">{CONTACT.locationHeading}</h2>
            <p className="nx-split-body">{CONTACT.location}</p>
          </div>
          <div>
            <p className="nx-tag"><span aria-hidden="true" />After you write</p>
            <h2 className="nx-h2-sm">{CONTACT.nextHeading}</h2>
            {CONTACT.next.map((line) => (
              <p key={line} className="nx-split-body">{line}</p>
            ))}
          </div>
        </div>
      </section>
    </NxPage>
  );
}

export const PAGES: DirectionPages = {
  projects: () => <Projects />,
  about: () => <NxAbout />,
  contact: () => <Contact />,
  caseStudy: ({ slug }) => <NxCase slug={slug} />,
};
