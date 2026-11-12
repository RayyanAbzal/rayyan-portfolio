import type { Metadata } from "next";

import { BookLink } from "@/components/book-link";
import { HarnessDrawing } from "@/components/harness/harness-drawing";
import { HarnessExplorer } from "@/components/harness/harness-explorer";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import {
  HARNESS,
  HARNESS_CHANGES,
  HARNESS_LAYERS,
  HARNESS_PRINCIPLES,
  HARNESS_STATS,
} from "@/content/harness";
import harnessLd from "@/content/jsonld/harness.json";
import harnessBreadcrumbLd from "@/content/jsonld/harness-breadcrumb.json";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HARNESS.title,
  description: HARNESS.description,
  path: "/harness",
});

export default function HarnessPage() {
  return (
    <>
      <JsonLd data={harnessBreadcrumbLd} />
      <JsonLd data={harnessLd} />
      <main id="top" tabIndex={-1}>
        <div className="wrap">
          <header className="harness-head">
            <h1>{HARNESS.h1}</h1>
            <p>{HARNESS.lede}</p>
          </header>

          <section className="home-sec" aria-labelledby="drawing-title">
            <div className="sec-head">
              <h2 id="drawing-title">{HARNESS.drawingHeading}</h2>
            </div>
            <HarnessExplorer
              layers={HARNESS_LAYERS}
              defaultSelected="hooks"
              labels={{
                exploded: HARNESS.explodedLabel,
                assembled: HARNESS.assembledLabel,
                hint: HARNESS.drawingHint,
                caption: HARNESS.drawingCaption,
                why: HARNESS.whyLabel,
              }}
            >
              <HarnessDrawing />
            </HarnessExplorer>
          </section>

          <section id="numbers" className="home-sec" aria-labelledby="numbers-title">
            <div className="sec-head">
              <h2 id="numbers-title">{HARNESS.statsHeading}</h2>
            </div>
            <ul className="cols cols-4">
              {HARNESS_STATS.map((stat) => (
                <li key={stat.label} className="col harness-stat">
                  <span className="stat-value">{stat.value}</span>
                  <p>{stat.label}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="home-sec" aria-labelledby="changes-title">
            <div className="sec-head">
              <h2 id="changes-title">{HARNESS.changesHeading}</h2>
            </div>
            <p className="harness-intro">{HARNESS.changesIntro}</p>
            <ol className="harness-log">
              {HARNESS_CHANGES.map((change) => (
                <li key={`${change.date}-${change.title}`}>
                  <time dateTime={change.date}>{change.label}</time>
                  <div>
                    <h3>{change.title}</h3>
                    <p className="trigger">{change.trigger}</p>
                  </div>
                  <p className="result">{change.result}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="home-sec" aria-labelledby="principles-title">
            <div className="sec-head">
              <h2 id="principles-title">{HARNESS.principlesHeading}</h2>
            </div>
            <ol className="cols cols-4">
              {HARNESS_PRINCIPLES.map((principle, index) => (
                <li key={principle.title} className="col">
                  <span className="col-num">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="contact" className="home-close" aria-labelledby="contact-title">
            <div>
              <h2 id="contact-title" className="display">{HARNESS.closingTitle}</h2>
              <p>{HARNESS.closingBody}</p>
            </div>
            <div className="close-actions">
              <Button asChild variant="gold">
                <BookLink source="harness_contact">{HARNESS.closingButton}</BookLink>
              </Button>
              <span className="alt">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </div>
          </section>
        </div>
      </main>
      <StickyBookCta showAfter="#numbers" hideAt="#contact" source="sticky_mobile_harness" />
    </>
  );
}
