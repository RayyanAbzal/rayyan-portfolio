import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/styles/refs/brightman.css";
import { BookBadge } from "@/components/book-badge";
import { BookLink } from "@/components/book-link";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import { PROCESS_STEPS } from "@/content/about";
import { HARNESS_STATS } from "@/content/harness";
import { FeedhackSchematic } from "@/components/schematics/feedhack-schematic";
import { InfluenceSchematic } from "@/components/schematics/influence-schematic";
import { InfluenceV2Schematic } from "@/components/schematics/influence-v2-schematic";
import { PumpdatSchematic } from "@/components/schematics/pumpdat-schematic";
import { ClientRows, CountUp, LeanMarquee, Magnetic, RevealRoot, TiltCard } from "@/components/refs/brightman-client";
import { EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/site";
import type { Rich } from "@/content/rich";

const idx = (n: number) => `[${String(n).padStart(2, "0")}]`;

function renderRich(parts: Rich): ReactNode[] {
  return parts.map((p, i) => {
    if (typeof p === "string") return p;
    if ("mark" in p) return <span key={i} className="bm-accent">{p.mark}</span>;
    if ("nowrap" in p) return <span key={i} className="bm-nowrap">{p.nowrap}</span>;
    if ("hi" in p) return p.hi;
    if ("strong" in p) return <strong key={i}>{p.strong}</strong>;
    return p.link;
  });
}

function plainRich(parts: Rich): string {
  return parts
    .map((p) => (typeof p === "string" ? p : "mark" in p ? p.mark : "nowrap" in p ? p.nowrap : "hi" in p ? p.hi : "strong" in p ? p.strong : p.link))
    .join("");
}

/** Simple line icons for the three offers. */
function OfferIcon({ n }: { n: number }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (n === 0)
    return (
      <svg {...common}>
        <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
        <path d="M20 4v4.5h-4.5" />
        <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
        <path d="M4 20v-4.5h4.5" />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...common}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2z" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M16.5 13v7M13 16.5h7" />
    </svg>
  );
}

/** Line illustrations for the bento cards, drawn in ink and green. */
function Illustration({ n }: { n: number }) {
  const p = { viewBox: "0 0 120 90", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, className: "bm-illo" };
  if (n === 0)
    return (
      <svg {...p}>
        <rect x="8" y="14" width="30" height="20" rx="4" />
        <rect x="8" y="56" width="30" height="20" rx="4" />
        <rect x="82" y="35" width="30" height="20" rx="4" className="bm-live-stroke" />
        <path d="M38 24h22c8 0 8 21 22 21M38 66h22c8 0 8-21 22-21" />
        <path d="M16 22h14M16 28h8M16 64h14M16 70h8" />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...p}>
        <rect x="10" y="12" width="72" height="56" rx="6" />
        <path d="M10 26h72" />
        <path d="M20 38h30M20 48h42M20 58h24" />
        <circle cx="94" cy="62" r="14" className="bm-live-stroke" />
        <path d="M94 54v16M86 62h16" className="bm-live-stroke" />
      </svg>
    );
  if (n === 2)
    return (
      <svg {...p}>
        <path d="M60 10l38 16v6L60 48 22 32v-6z" />
        <path d="M22 44l38 16 38-16" />
        <path d="M22 58l38 16 38-16" className="bm-live-stroke" />
      </svg>
    );
  return (
    <svg {...p}>
      <circle cx="60" cy="45" r="26" />
      <path d="M46 46l10 10 20-22" />
    </svg>
  );
}

const MARQUEE_A = "What I build";
const MARQUEE_B = "How it works";

const PREVIEWS: Record<string, ReactNode> = {
  influence: <InfluenceSchematic />,
  feedhack: <FeedhackSchematic />,
  pumpdat: <PumpdatSchematic />,
  "influence-v2": <InfluenceV2Schematic />,
};

export function DesignBrightman() {
  const [first, second, third] = OFFERS;
  const offers = [first, second, third];
  const headline = renderRich(HOME.heroHeadline);

  return (
    <main id="top" className="ref-root ref-brightman">
      <RevealRoot />
      <div className="bm-wide">
        <header className="bm-header">
          <Link href="/" className="bm-logo" aria-label={`${SITE_NAME}, home`}>
            <span className="bm-logo-dot" aria-hidden="true" />
            {SITE_NAME}
          </Link>
          <div className="bm-header-right">
            <span className="bm-header-loc">Auckland, NZ</span>
            <Magnetic strength={0.25}><BookLink source="design_preview" className="bm-btn-sm">Contact</BookLink></Magnetic>
          </div>
        </header>

        <section className="bm-hero" aria-labelledby="bm-h1">
          <div className="bm-headline">
            <h1 id="bm-h1" className="bm-h1" data-rv>{headline}</h1>
            <span className="bm-cluster">
              <span className="bm-paren" aria-hidden="true">(</span>
              <span className="bm-chips" aria-hidden="true">
                {[0, 1, 2].map((n) => (
                  <span key={n} className="bm-chip"><OfferIcon n={n} /></span>
                ))}
              </span>
              <span className="bm-cluster-text">Automation, AI features, whole tools</span>
              <span className="bm-paren" aria-hidden="true">)</span>
            </span>
          </div>

          <div className="bm-intro">
            <p className="bm-intro-text">{HOME.heroLede}</p>
            <Magnetic strength={0.4}><BookBadge source="design_preview" label="Book a free call" /></Magnetic>
          </div>
        </section>

        <section className="bm-stats" data-rv aria-label="How I build, in numbers">
          <ul>
            {HARNESS_STATS.map((s) => (
              <li key={s.label} data-rv>
                <span className="bm-stat-value"><CountUp value={s.value} /></span>
                <span className="bm-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <LeanMarquee text={MARQUEE_A} />

        <section className="bm-section" aria-labelledby="bm-services">
          <h2 id="bm-services" className="bm-sr">What I build</h2>
          <div className="bm-bento">
            {offers.map((o, i) => (
              <TiltCard key={o.title} className={`bm-card bm-card-${i}`}>
                <span className="bm-index">{idx(i + 1)}</span>
                <Illustration n={i} />
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <ul className="bm-tags">
                  <li>{o.duration}</li>
                  <li>{o.price}</li>
                </ul>
              </TiltCard>
            ))}
            <TiltCard className="bm-card bm-card-3 bm-card-accent">
              <span className="bm-index">{idx(4)}</span>
              <Illustration n={3} />
              <h3>Not sure which one you need?</h3>
              <p>{HOME.ctaBody}</p>
              <BookLink source="design_preview" className="bm-btn-accent">Book a free call</BookLink>
            </TiltCard>
          </div>
        </section>

        <section className="bm-blob-section" aria-labelledby="bm-who">
          <div className="bm-blob" aria-hidden="true" />
          <div className="bm-blob-copy" data-rv>
            <h2 id="bm-who" className="bm-eyebrow">{HOME.aboutHeading}</h2>
            <p className="bm-blob-text">{HOME.aboutBig}</p>
          </div>
        </section>

        <LeanMarquee text={MARQUEE_B} small />

        <section className="bm-section" aria-labelledby="bm-process">
          <h2 id="bm-process" className="bm-sr">How it works</h2>
          <ol className="bm-steps">
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.title} className="bm-step" data-rv>
                <span className="bm-index">{idx(i + 1)}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="bm-when">{s.when}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bm-clients" aria-labelledby="bm-clients-h">
          <h2 id="bm-clients-h" className="bm-big-h">Clients</h2>
          <ClientRows
            rows={CLIENT_PROJECTS.map((c) => ({ slug: c.slug, name: c.name, title: c.title, outcome: c.outcome, preview: PREVIEWS[c.slug] }))}
          />
        </section>

        <section className="bm-cta" aria-labelledby="bm-cta-h" data-rv>
          <h2 id="bm-cta-h" className="bm-cta-title">{plainRich(HOME.ctaTitle)}</h2>
          <p className="bm-cta-body">{HOME.ctaBody}</p>
          <div className="bm-cta-actions">
            <Magnetic>
              <BookLink source="design_preview" className="pill pill-solid">
                Book a free call <span className="pill-plus" aria-hidden="true">+</span>
              </BookLink>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="pill pill-ghost">Email me</a>
            </Magnetic>
          </div>
        </section>

        <footer className="bm-footer">
          <p className="bm-footer-line">
            {SITE_NAME}, <span>AI engineer and consultant.</span>
          </p>
          <dl className="bm-footer-cols">
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Rayyan Abzal</a></dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Auckland, New Zealand</dd>
            </div>
          </dl>
          <p className="bm-copy">&copy; {SITE_NAME}</p>
        </footer>
      </div>
    </main>
  );
}
