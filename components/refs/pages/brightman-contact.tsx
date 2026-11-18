import { BookLink } from "@/components/book-link";
import { CONTACT } from "@/content/contact";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";

import { BmPage, idx } from "./brightman-shared";

function Arrow() {
  return (
    <span className="bm-arrow-chip" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M8 6h10v10" /></svg>
    </span>
  );
}

export function BrightmanContact() {
  return (
    <BmPage current="contact">
      <section className="bm-hero bm-page-hero" aria-labelledby="bm-h1">
        <div className="bm-headline">
          <h1 id="bm-h1" className="bm-h1 bm-h1-page" data-rv>{CONTACT.h1}</h1>
        </div>
        <div className="bm-intro">
          <p className="bm-intro-text">{CONTACT.lede}</p>
        </div>
      </section>

      <section className="bm-section bm-ways" aria-labelledby="bm-ways-h">
        <h2 id="bm-ways-h" className="bm-big-h bm-big-h-md" data-rv>{CONTACT.waysHeading}</h2>
        <ul className="bm-way-list">
          <li>
            <BookLink source="contact_page" className="bm-way" data-rv>
              <span className="bm-way-name">{CONTACT.bookLabel}</span>
              <span className="bm-way-note">{CONTACT.bookNote}</span>
              <Arrow />
            </BookLink>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className="bm-way" data-rv>
              <span className="bm-way-name">{CONTACT.emailLabel}</span>
              <span className="bm-way-note">{EMAIL}</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL} className="bm-way" target="_blank" rel="noopener noreferrer" data-rv>
              <span className="bm-way-name">{CONTACT.linkedinLabel}</span>
              <span className="bm-way-note">Rayyan Abzal</span>
              <Arrow />
            </a>
          </li>
        </ul>
      </section>

      <section className="bm-contact-grid" aria-label="Before you write">
        <div className="bm-card bm-card-panel bm-place" data-rv>
          <h2>{CONTACT.locationHeading}</h2>
          <p>{CONTACT.location}</p>
        </div>
        <div className="bm-card bm-include" data-rv>
          <h2>{CONTACT.firstMessageHeading}</h2>
          <p>{CONTACT.firstMessageIntro}</p>
          <ol>
            {CONTACT.firstMessageItems.map((item, i) => (
              <li key={item}>
                <span className="bm-index">{idx(i + 1)}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="bm-card bm-card-accent bm-next" data-rv>
          <h2>{CONTACT.nextHeading}</h2>
          {CONTACT.next.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>
    </BmPage>
  );
}
