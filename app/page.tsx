import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { BookLink } from "@/components/book-link";
import { JsonLd } from "@/components/json-ld";
import { ClientProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import homeLd from "@/content/jsonld/home.json";
import { CLIENT_PROJECTS } from "@/content/projects";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "AI consultant in Auckland, New Zealand. I build AI automation and custom software that replaces manual work for startups and small businesses. Free intro call.";

export const metadata: Metadata = pageMetadata({
  title: "AI Consultant & Automation, Auckland NZ | Rayyan Abzal",
  description: DESCRIPTION,
  path: "/",
});

interface Offer {
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
  duration: string;
}

const OFFERS: readonly Offer[] = [
  {
    title: "Automate a manual process",
    body: "I find the bottleneck, then build the automation or AI workflow that removes it. Your team keeps the tools they know while the busywork disappears.",
    linkLabel: "See FeedHack",
    linkHref: "/work/feedhack",
    duration: "1 to 3 weeks",
  },
  {
    title: "Add AI to your existing product",
    body: "LLM features, agents, and pipelines added to the codebase you already have. Most of this work is additive, so your team keeps shipping while I build.",
    linkLabel: "See Influence v2",
    linkHref: "/work/influence-v2",
    duration: "2 to 4 weeks",
  },
  {
    title: "Build the whole tool",
    body: "Platform, dashboard, bot, or contracts. Designed, built, and shipped end to end, then handed over with docs and a team walkthrough.",
    linkLabel: "See Influence",
    linkHref: "/work/influence",
    duration: "4 to 8 weeks",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeLd} />
      <main id="top" tabIndex={-1}>
        <section className="hero wrap">
          <Reveal className="hero-panel">
            <h1 className="display">
              I build <span className="mark">AI</span> that runs your business.
            </h1>
            <p className="lede">
              Automation for a manual process, AI inside the product you already have, or the whole tool built from scratch. One person, end to end, from Auckland.
            </p>
            <div className="hero-actions">
              <Button asChild>
                <BookLink source="hero">Book a free 30-minute call</BookLink>
              </Button>
              <a className="link link-arrow" href="#work">See the shipped work</a>
            </div>
          </Reveal>
        </section>

        <section id="work" className="wrap">
          <div className="section-head has-link">
            <h2 className="display">Four client builds, all live.</h2>
            <p className="lede">
              Each one replaced a manual process with a system the team still uses every day. The title says what it did; the case study says how.
            </p>
            <Link className="link link-arrow" href="/work">All projects</Link>
          </div>
          <Reveal className="grid-2" stagger={90}>
            {CLIENT_PROJECTS.map((project) => (
              <ClientProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
          <p className="data-note">
            The product visuals are drawn schematics with representative data, not client screenshots.
          </p>
        </section>

        <section id="services">
          <div className="wrap">
            <div className="section-head">
              <h2 className="display">What I build.</h2>
              <p className="lede">
                Most engagements start with finding where AI or automation can replace manual work. When the project needs a whole product, I build that too.
              </p>
            </div>
            <div className="offer-list">
              <Separator className="bg-line-2" />
              {OFFERS.map((offer) => (
                <Fragment key={offer.title}>
                  <div className="offer">
                    <div className="when">
                      {offer.duration}
                      <small>Fixed price</small>
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

        <section id="about" className="wrap">
          <div className="about-split">
            <div>
              <div className="who">
                <div className="mono-mark" aria-hidden="true">RA</div>
                <div>
                  <div className="name">Rayyan Abzal</div>
                  <div className="role">Founder, AI engineer, the person who writes the code</div>
                </div>
              </div>
              <div className="prose">
                <p className="big">
                  One operator, end to end. The person who scopes your project is the person who builds it, ships it, and picks up when something breaks.
                </p>
                <p>
                  I run a solo AI engineering practice out of Auckland. I have shipped production systems across creator-economy CRMs, payout automation, and on-chain platforms, and I also work as an AI engineer at Growlab, an Auckland AI consultancy. Different domains, same engine: find the manual bottleneck, replace it with the lightest system that solves it.
                </p>
                <p>
                  No accounts team, no junior developer getting handed the real build. You talk to me, I write the system, you get the outcome.
                </p>
                <p><Link className="link link-arrow" href="/about">More about how I work</Link></p>
              </div>
            </div>
            <div className="side">
              <div className="side-card">
                <div className="v">Open for the next project</div>
                <p>Two active projects at most. Depth over breadth.</p>
              </div>
              <div className="side-card">
                <div className="v">Last shipped: Influence v2</div>
                <p>Repeat client. A performance dashboard on top of the CRM I built them first.</p>
              </div>
              <div className="side-card">
                <div className="v">Auckland, New Zealand</div>
                <p>Clients in NZ, Europe, and the US. Everything runs remotely.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonial" className="wrap tight">
          <figure className="quote">
            <blockquote>
              We liked the first tool so much we brought Rayyan back to build a full performance dashboard on top of it. Everything we track as a team is now in one place, in exactly the design language we asked for.{" "}
              <span className="mark">Genuinely one of the best decisions we made for the business.</span>
            </blockquote>
            <figcaption className="attrib">
              <span><strong>Agency Director</strong>, Influence v2, Malta</span>
              <Link className="link link-arrow" href="/about#testimonials">More client words</Link>
            </figcaption>
          </figure>
        </section>

        <section id="contact" className="wrap">
          <div className="cta-panel">
            <div>
              <h2 className="display">Book a free 30-minute call.</h2>
              <p>
                You describe how your business runs. I tell you honestly whether AI can help, what I would build, and what it would cost.
              </p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="contact">Book a free intro call</BookLink>
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
