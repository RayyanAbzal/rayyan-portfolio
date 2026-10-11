import type { Metadata } from "next";
import Link from "next/link";

import { RichText } from "@/components/case/rich-text";
import { BookLink } from "@/components/book-link";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import aboutLd from "@/content/jsonld/about.json";
import aboutBreadcrumbLd from "@/content/jsonld/about-breadcrumb.json";
import {
  ABOUT,
  ABOUT_SIDE_CARDS,
  FAQ_ITEMS,
  PRINCIPLES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/content/about";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: ABOUT.title,
  description: ABOUT.description,
  socialDescription: ABOUT.socialDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ_ITEMS)} />
      <JsonLd data={aboutBreadcrumbLd} />
      <JsonLd data={aboutLd} />
      <main id="top" tabIndex={-1}>
        <section className="wrap pb-[clamp(40px,5vw,64px)]">
          <div className="section-head mb-0">
            <h1 className="display max-w-[14ch] text-[clamp(2.5rem,6.5vw,5.25rem)]">
              {ABOUT.h1}
            </h1>
          </div>
        </section>

        <section className="wrap tight">
          <div className="about-split">
            <div>
              <div className="who">
                <div className="mono-mark" aria-hidden="true">RA</div>
                <div>
                  <div className="name">Rayyan Abzal</div>
                  <div className="role">{ABOUT.role}</div>
                </div>
              </div>
              <div className="prose">
                <p className="big">{ABOUT.big}</p>
                {ABOUT.paragraphs.map((paragraph, index) => (
                  <p key={index}><RichText value={paragraph} /></p>
                ))}

                <h3>{ABOUT.principlesHeading}</h3>
                <p>{ABOUT.principlesIntro}</p>
                {PRINCIPLES.map((principle) => (
                  <div key={principle.title}>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="side">
              {ABOUT_SIDE_CARDS.map((card) => (
                <div key={card.title} className="side-card">
                  <div className="v">{card.title}</div>
                  <p><RichText value={card.body} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="wrap">
          <div className="section-head">
            <h2 className="display">{ABOUT.processHeading}</h2>
            <p className="lede">{ABOUT.processLede}</p>
          </div>
          <div className="steps">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title} className="step">
                <div className="n" aria-hidden="true">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="when">{step.when}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials">
          <div className="wrap">
            <div className="section-head">
              <h2 className="display">{ABOUT.testimonialsHeading}</h2>
            </div>
            <div className="quote-row">
              {TESTIMONIALS.map((item) => (
                <figure key={item.project} className="quote">
                  <blockquote>{item.quote}</blockquote>
                  <figcaption className="attrib">
                    <span><strong>{item.role}</strong>, {item.project}</span>
                    <Link
                      className="link link-arrow"
                      href={item.linkHref}
                      aria-label={`Case study: ${item.linkLabel}`}
                    >
                      Case study
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="wrap">
          <div className="section-head">
            <h2 className="display">{ABOUT.faqHeading}</h2>
          </div>
          <Accordion type="single" collapsible defaultValue="faq-0" className="faq">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="a">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="contact" className="wrap tight">
          <div className="cta-panel">
            <div>
              <h2 className="display">{ABOUT.ctaTitle}</h2>
              <p>{ABOUT.ctaBody}</p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="about_contact">{ABOUT.ctaButton}</BookLink>
              </Button>
              <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
          </div>
        </section>
      </main>
      <StickyBookCta showAfter="#testimonials" hideAt="#contact" source="sticky_mobile_about" />
    </>
  );
}
