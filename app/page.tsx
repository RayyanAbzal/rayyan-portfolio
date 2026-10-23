import type { Metadata } from "next";
import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import { HOME, HOME_SIDE_CARDS, OFFERS } from "@/content/home";
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
        <div className="wrap">
          <section className="home-hero" aria-label="Introduction">
            <h1 className="display"><RichText value={HOME.heroHeadline} /></h1>
            <div className="hero-side">
              <p className="hero-lede">{HOME.heroLede}</p>
              <div className="hero-actions">
                <Button asChild>
                  <BookLink source="hero">{HOME.heroCta}</BookLink>
                </Button>
                <a className="link link-arrow" href="#work">{HOME.heroSecondary}</a>
              </div>
            </div>
          </section>

          <section id="work" className="home-sec" aria-labelledby="work-title">
            <div className="sec-head">
              <h2 id="work-title">{HOME.workTitle}</h2>
              <Link className="link link-arrow" href="/work">{HOME.workLink}</Link>
            </div>
            <ol className="builds">
              {CLIENT_PROJECTS.map((project) => (
                <li key={project.slug} className="build">
                  <span className="build-name">{project.name}</span>
                  <h3>
                    <Link
                      href={`/work/${project.slug}`}
                      className="build-link"
                      aria-describedby={`build-${project.slug}-outcome`}
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p id={`build-${project.slug}-outcome`}>{project.outcome}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="services" className="home-sec" aria-labelledby="services-title">
            <div className="sec-head">
              <h2 id="services-title">{HOME.servicesTitle}</h2>
            </div>
            <p className="sec-lede">{HOME.servicesLede}</p>
            <ul className="offers">
              {OFFERS.map((offer) => (
                <li key={offer.title} className="offer-row">
                  <h3>{offer.title}</h3>
                  <div className="offer-body">
                    <p>{offer.body}</p>
                    <Link className="link link-arrow" href={offer.linkHref}>{offer.linkLabel}</Link>
                  </div>
                  <div className="when">
                    {offer.duration}
                    <small>{offer.price}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" className="home-sec" aria-labelledby="about-title">
            <div className="sec-head">
              <h2 id="about-title">{HOME.aboutHeading}</h2>
            </div>
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

          <section id="contact" className="home-close" aria-labelledby="contact-title">
            <div>
              <h2 id="contact-title" className="display"><RichText value={HOME.ctaTitle} /></h2>
              <p>{HOME.ctaBody}</p>
            </div>
            <div className="close-actions">
              <Button asChild variant="gold">
                <BookLink source="contact">{HOME.ctaButton}</BookLink>
              </Button>
              <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
          </section>
        </div>
      </main>
      <StickyBookCta showAfter="#services" hideAt="#contact" source="sticky_mobile" />
    </>
  );
}
