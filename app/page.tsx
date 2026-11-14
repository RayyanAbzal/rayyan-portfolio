import type { Metadata } from "next";
import Link from "next/link";

import { BookBadge } from "@/components/book-badge";
import { BookLink } from "@/components/book-link";
import { RichText } from "@/components/case/rich-text";
import { HarnessDrawing } from "@/components/harness/harness-drawing";
import { AucklandClock } from "@/components/home/auckland-clock";
import { ExplodedWork, type WorkRow } from "@/components/home/exploded-work";
import { LivingOffers } from "@/components/home/living-offers";
import { TeardownHero, type HeroPiece } from "@/components/home/teardown-hero";
import { JsonLd } from "@/components/json-ld";
import { LitText, RisePanel } from "@/components/rise-panel";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/content/about";
import { HARNESS_LAYERS, HARNESS_PEOPLE } from "@/content/harness";
import { HOME, OFFERS } from "@/content/home";
import { HERO, PROJECT_LAYERS, SECTION_LABELS } from "@/content/home-novelty";
import homeLd from "@/content/jsonld/home.json";
import { CLIENT_PROJECTS } from "@/content/projects";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HOME.title,
  description: HOME.description,
  path: "/",
});

const PIECES: readonly HeroPiece[] = [...HARNESS_LAYERS, ...HARNESS_PEOPLE].map(({ id, name, piece, what }) => ({
  id,
  name,
  piece,
  what,
}));

const WORK_ROWS: readonly WorkRow[] = PROJECT_LAYERS.flatMap((layers) => {
  const project = CLIENT_PROJECTS.find((p) => p.slug === layers.slug);
  return project ? [{ ...layers, name: project.name, title: project.title }] : [];
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeLd} />
      <main id="top" tabIndex={-1} className="home-n">
        <div className="wrap">
          <section className="n-hero" aria-label="Introduction">
            <div className="page-top n-top">
              <div>
                <div className="status">
                  <span>
                    <span className="dot" aria-hidden="true" />
                    {HERO.status}
                  </span>
                  <AucklandClock place={HERO.place} />
                </div>
                <h1 className="lede">
                  <RichText value={HOME.heroHeadline} />
                </h1>
              </div>
              <BookBadge source="hero_badge" label={HOME.heroCta} />
            </div>
            <RisePanel>
              <div className="rise-chips" aria-hidden="true">
                {HARNESS_LAYERS.slice(0, 4).map((layer) => (
                  <span key={layer.id}>{layer.name}</span>
                ))}
              </div>
              <p className="rise-text">
                <LitText text={HOME.heroLede} />
              </p>
              <div className="actions">
                <BookLink source="hero" className="pill pill-solid">
                  {HOME.heroCta}
                  <span className="pill-plus" aria-hidden="true">+</span>
                </BookLink>
                <Link href="/harness" className="pill pill-ghost">{HERO.secondary} ↗</Link>
              </div>
            </RisePanel>
            <TeardownHero pieces={PIECES}>
              <HarnessDrawing />
            </TeardownHero>
          </section>

          <section id="work" className="row" aria-labelledby="work-title">
            <h2 id="work-title">{HOME.workTitle}</h2>
            <div>
              <ExplodedWork rows={WORK_ROWS} />
              <p className="hint">
                <Link className="link link-arrow" href="/work">{HOME.workLink}</Link>
              </p>
            </div>
          </section>

          <section id="services" className="row" aria-labelledby="services-title">
            <h2 id="services-title">{HOME.servicesTitle}</h2>
            <LivingOffers offers={OFFERS} note={SECTION_LABELS.offersNote} />
          </section>

          <section className="row" aria-labelledby="words-title">
            <h2 id="words-title">{SECTION_LABELS.words}</h2>
            <div className="quotes">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.project}>
                  <p>“{t.quote}”</p>
                  <footer>
                    {t.role}, <Link href={t.linkHref}>{t.project}</Link>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section id="contact" className="row n-close" aria-labelledby="contact-title">
            <h2 id="contact-title">{SECTION_LABELS.next}</h2>
            <div>
              <p className="n-close-title"><RichText value={HOME.ctaTitle} /></p>
              <p>{HOME.ctaBody}</p>
              <div className="actions">
                <Button asChild>
                  <BookLink source="contact">{HOME.ctaButton}</BookLink>
                </Button>
                <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <StickyBookCta showAfter="#services" hideAt="#contact" source="sticky_mobile" />
    </>
  );
}
