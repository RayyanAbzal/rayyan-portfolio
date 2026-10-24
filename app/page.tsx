import type { Metadata } from "next";
import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import { HOME, OFFERS } from "@/content/home";
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
            <div className="hero-sub">
              <p className="hero-lede">{HOME.heroLede}</p>
              <Button asChild>
                <BookLink source="hero">{HOME.heroCta}</BookLink>
              </Button>
            </div>
          </section>

          <section id="work" className="home-sec" aria-labelledby="work-title">
            <div className="sec-head">
              <h2 id="work-title">{HOME.workTitle}</h2>
              <Link className="link link-arrow" href="/work">{HOME.workLink}</Link>
            </div>
            <ol className="cols cols-4">
              {CLIENT_PROJECTS.map((project, index) => (
                <li key={project.slug} className="col">
                  <span className="col-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="build-name">{project.name}</span>
                  <h3>
                    <Link href={`/work/${project.slug}`} className="col-stretch">{project.title}</Link>
                  </h3>
                  <p>{project.outcome}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="services" className="home-sec" aria-labelledby="services-title">
            <div className="sec-head">
              <h2 id="services-title">{HOME.servicesTitle}</h2>
            </div>
            <ul className="cols cols-3">
              {OFFERS.map((offer, index) => (
                <li key={offer.title} className="col">
                  <span className="col-num">{String.fromCharCode(65 + index)}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.body}</p>
                  <p className="col-meta">{offer.duration}, {offer.price.toLowerCase()}</p>
                  <Link className="link link-arrow" href={offer.linkHref}>{offer.linkLabel}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" className="home-sec" aria-labelledby="about-title">
            <div className="sec-head">
              <h2 id="about-title">{HOME.aboutHeading}</h2>
            </div>
            <div className="about-grid">
              <p className="big">{HOME.aboutBig}</p>
              <div className="prose">
                {HOME.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p><Link className="link link-arrow" href="/about">{HOME.aboutLink}</Link></p>
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
