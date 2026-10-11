import type { Metadata } from "next";

import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/content/contact";
import contactLd from "@/content/jsonld/contact.json";
import contactBreadcrumbLd from "@/content/jsonld/contact-breadcrumb.json";
import { EMAIL, LINKEDIN_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: CONTACT.title,
  description: CONTACT.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactBreadcrumbLd} />
      <JsonLd data={contactLd} />
      <main id="top" tabIndex={-1}>
        <section className="wrap pb-[clamp(40px,5vw,64px)]">
          <div className="section-head mb-0">
            <h1 className="display max-w-[14ch] text-[clamp(2.5rem,6.5vw,5.25rem)]">{CONTACT.h1}</h1>
            <p className="lede">{CONTACT.lede}</p>
          </div>
        </section>

        <section className="wrap tight">
          <div className="about-split">
            <div className="prose">
              <h3 className="!mt-0">{CONTACT.waysHeading}</h3>
              <p className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button asChild>
                  <BookLink source="contact_page">{CONTACT.bookLabel}</BookLink>
                </Button>
                <span>{CONTACT.bookNote}</span>
              </p>
              <p>
                {CONTACT.emailLabel}: <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p>
                {CONTACT.linkedinLabel}:{" "}
                <a className="link" href={LINKEDIN_URL} target="_blank" rel="noopener">{LINKEDIN_URL}</a>
              </p>

              <h3>{CONTACT.locationHeading}</h3>
              <p>{CONTACT.location}</p>

              <h3>{CONTACT.firstMessageHeading}</h3>
              <p>{CONTACT.firstMessageIntro}</p>
              <ul className="list-disc space-y-2 pl-6 text-ink-2">
                {CONTACT.firstMessageItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>{CONTACT.nextHeading}</h3>
              {CONTACT.next.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="side">
              {CONTACT.sideCards.map((card) => (
                <div key={card.title} className="side-card">
                  <div className="v">{card.title}</div>
                  <p><RichText value={card.body} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
