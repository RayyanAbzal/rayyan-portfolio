import type { Metadata } from "next";
import Link from "next/link";

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
import aboutFaqLd from "@/content/jsonld/about-faq.json";
import { FAQ_ITEMS, PRINCIPLES, PROCESS_STEPS, TESTIMONIALS } from "@/content/about";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const GROWLAB_URL = "https://www.growlab.co.nz/about";

export const metadata: Metadata = pageMetadata({
  title: "About Rayyan Abzal | AI Consultant, Auckland NZ",
  description:
    "How I work: a solo AI engineering practice in Auckland, plus AI engineering at Growlab. Four principles, client testimonials, and founder FAQs.",
  socialDescription:
    "How I work: a solo AI engineering practice in Auckland. Four principles, client testimonials, and answers to the questions founders ask before booking a call.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutFaqLd} />
      <JsonLd data={aboutBreadcrumbLd} />
      <JsonLd data={aboutLd} />
      <main id="top" tabIndex={-1}>
        <section className="wrap pb-[clamp(40px,5vw,64px)]">
          <div className="section-head mb-0">
            <h1 className="display max-w-[14ch] text-[clamp(2.5rem,6.5vw,5.25rem)]">
              I scope it, build it, and ship it myself.
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
                  <div className="role">AI engineer. Own practice, plus Growlab. Auckland, New Zealand</div>
                </div>
              </div>
              <div className="prose">
                <p className="big">
                  The person who scopes your project is the person who writes the code, deploys it, and answers when something breaks.
                </p>
                <p>
                  I am Rayyan Abzal, an AI consultant and engineer in Auckland, New Zealand, running a solo practice. I have shipped production systems across creator-economy CRMs, payout automation, and on-chain platforms, for clients in New Zealand, Malta, and the US. Different domains, same engine: find the manual bottleneck, replace it with the lightest system that solves it.
                </p>
                <p>
                  Solo by design, so there is no accounts team and no junior developer getting handed the actual build. You talk to me, I write the system, you get the outcome.
                </p>
                <p>
                  Alongside the practice I work as a Full Stack Developer and AI Engineer at{" "}
                  <a className="link" href={GROWLAB_URL} target="_blank" rel="noopener">Growlab</a>, an AI transformation consultancy in Parnell, Auckland, building custom AI systems for infrastructure and engineering firms. Same discipline there as here: production systems that a real team runs every day.
                </p>

                <h3>AI is a tool, not a deliverable</h3>
                <p>Four principles shape every engagement.</p>
                {PRINCIPLES.map((principle) => (
                  <div key={principle.title}>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="side">
              <div className="side-card">
                <div className="v">AI engineer at Growlab</div>
                <p>
                  Full-stack and AI work for an Auckland AI transformation consultancy, alongside this practice.{" "}
                  <a className="link" href={GROWLAB_URL} target="_blank" rel="noopener">growlab.co.nz</a>
                </p>
              </div>
              <div className="side-card">
                <div className="v">TypeScript, Node.js, Python</div>
                <p>Plus whatever the problem needs.</p>
              </div>
              <div className="side-card">
                <div className="v">Four client builds, all live</div>
                <p>Plus three personal builds. <Link className="link" href="/work">See the projects</Link>.</p>
              </div>
              <div className="side-card">
                <div className="v">Two active projects, maximum</div>
                <p>Depth over breadth. Currently open for the next one.</p>
              </div>
              <div className="side-card">
                <div className="v">Auckland, New Zealand (UTC+12)</div>
                <p>Everything runs remotely: the call, weekly updates, a live staging link, handover.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="wrap">
          <div className="section-head">
            <h2 className="display">How every engagement runs.</h2>
            <p className="lede">Every engagement runs the same way. You always know what stage we are at.</p>
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
              <h2 className="display">What clients say.</h2>
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
            <h2 className="display">Common questions.</h2>
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
              <h2 className="display">Bring the rest to the call.</h2>
              <p>
                Free, 30 minutes, no pitch. You describe how your business runs, I tell you honestly whether AI can help.
              </p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="about_contact">Book a free intro call</BookLink>
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
