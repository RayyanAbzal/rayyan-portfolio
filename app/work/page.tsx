import type { Metadata } from "next";

import { BookBadge } from "@/components/book-badge";
import { BookLink } from "@/components/book-link";
import { JsonLd } from "@/components/json-ld";
import { ClientProjectCard, PersonalProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { LitText, RisePanel } from "@/components/rise-panel";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import workLd from "@/content/jsonld/work.json";
import workBreadcrumbLd from "@/content/jsonld/work-breadcrumb.json";
import { DATA_NOTE } from "@/content/home";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { WORK } from "@/content/work";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: WORK.title,
  description: WORK.description,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={workBreadcrumbLd} />
      <JsonLd data={workLd} />
      <main id="top" tabIndex={-1}>
        <section className="wrap pb-[clamp(24px,3vw,40px)]">
          <div className="page-top">
            <h1 className="display max-w-[12ch] text-[clamp(2.5rem,6.5vw,5.25rem)]">
              {WORK.h1}
            </h1>
            <BookBadge source="work_badge" label={WORK.ctaButton} />
          </div>
          <RisePanel className="mt-[clamp(32px,4vw,48px)]">
            <p className="rise-text small">
              <LitText text={WORK.lede} />
            </p>
          </RisePanel>
        </section>

        <section id="client" className="wrap tight">
          <div className="section-head">
            <h2 className="display text-[clamp(1.625rem,3vw,2.125rem)]">{WORK.clientHeading} <span className="count">({CLIENT_PROJECTS.length})</span></h2>
          </div>
          <Reveal className="grid-2 tall-cards" stagger={100}>
            {CLIENT_PROJECTS.map((project) => (
              <ClientProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
          <p className="data-note">{DATA_NOTE}</p>
        </section>

        <section id="personal">
          <div className="wrap">
            <div className="section-head">
              <h2 className="display text-[clamp(1.625rem,3vw,2.125rem)]">{WORK.personalHeading} <span className="count">({PERSONAL_PROJECTS.length})</span></h2>
              <p className="lede">{WORK.personalLede}</p>
            </div>
            <Reveal className="grid-3" stagger={100}>
              {PERSONAL_PROJECTS.map((project) => (
                <PersonalProjectCard key={project.title} project={project} />
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contact" className="wrap">
          <div className="cta-panel">
            <div>
              <h2 className="display">{WORK.ctaTitle}</h2>
              <p>{WORK.ctaBody}</p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="work_contact">{WORK.ctaButton}</BookLink>
              </Button>
              <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
          </div>
        </section>
      </main>
      <StickyBookCta showAfter="#personal" hideAt="#contact" source="sticky_mobile_work" />
    </>
  );
}
