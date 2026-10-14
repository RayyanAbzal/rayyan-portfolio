import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import { ClientProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DATA_NOTE, HOME, HOME_SIDE_CARDS, OFFERS } from "@/content/home";
import homeLd from "@/content/jsonld/home.json";
import { CLIENT_PROJECTS } from "@/content/projects";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HOME.title,
  description: HOME.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeLd} />
      <main id="top" tabIndex={-1}>
        <section className="hero wrap">
          <div className="hero-panel">
            <h1 className="display"><RichText value={HOME.heroHeadline} /></h1>
            <p className="lede">{HOME.heroLede}</p>
            <div className="hero-actions">
              <Button asChild>
                <BookLink source="hero">{HOME.heroCta}</BookLink>
              </Button>
              <a className="link link-arrow" href="#work">{HOME.heroSecondary}</a>
            </div>
          </div>
        </section>

        <section id="work" className="wrap">
          <div className="section-head has-link">
            <h2 className="display">{HOME.workTitle}</h2>
            <p className="lede">{HOME.workLede}</p>
            <Link className="link link-arrow" href="/work">{HOME.workLink}</Link>
          </div>
          <Reveal className="grid-2" stagger={100}>
            {CLIENT_PROJECTS.map((project) => (
              <ClientProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
          <p className="data-note">{DATA_NOTE}</p>
        </section>

        <section id="services">
          <div className="wrap has-rule">
            <div className="section-head">
              <h2 className="display">{HOME.servicesTitle}</h2>
              <p className="lede">{HOME.servicesLede}</p>
            </div>
            <div className="offer-list">
              <Separator className="bg-line-2" />
              {OFFERS.map((offer) => (
                <Fragment key={offer.title}>
                  <div className="offer">
                    <div className="when">
                      {offer.duration}
                      <small>{offer.price}</small>
                    </div>
                    <h3>{offer.title}</h3>
                    <div className="offer-body">
                      <p>{offer.body}</p>
                      <div className="card-links">
                        <Link className="link link-arrow" href={offer.linkHref}>{offer.linkLabel}</Link>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="wrap has-rule">
          <h2 className="display mb-[clamp(32px,4vw,48px)]">{HOME.aboutHeading}</h2>
          <div className="about-split">
            <div>
              <div className="who">
                <div className="mono-mark" aria-hidden="true">RA</div>
                <div>
                  <div className="name">Rayyan Abzal</div>
                  <div className="role">{HOME.aboutRole}</div>
                </div>
              </div>
              <div className="prose">
                <p className="big">{HOME.aboutBig}</p>
                {HOME.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p><Link className="link link-arrow" href="/about">{HOME.aboutLink}</Link></p>
              </div>
            </div>
            <div className="side">
              {HOME_SIDE_CARDS.map((card) => (
                <div key={card.title} className="side-card">
                  <div className="v">{card.title}</div>
                  <p><RichText value={card.body} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonial" className="wrap has-rule">
          <figure className="quote">
            <blockquote><RichText value={HOME.quote} /></blockquote>
            <figcaption className="attrib">
              <span><strong>{HOME.quoteRole}</strong>, {HOME.quoteProject}</span>
              <Link className="link link-arrow" href="/about#testimonials">{HOME.quoteLink}</Link>
            </figcaption>
          </figure>
        </section>

        <section id="contact" className="wrap has-rule">
          <div className="cta-panel">
            <div>
              <h2 className="display"><RichText value={HOME.ctaTitle} /></h2>
              <p>{HOME.ctaBody}</p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="contact">{HOME.ctaButton}</BookLink>
              </Button>
              <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
          </div>
        </section>
      </main>
      <StickyBookCta showAfter="#services" hideAt="#contact" source="sticky_mobile" />
    </>
  );
}
