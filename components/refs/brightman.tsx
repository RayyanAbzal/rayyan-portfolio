import Link from "next/link";
import "@/app/styles/refs/brightman.css";
import "@/app/styles/refs/brightman-pages.css";
import { BookBadge } from "@/components/book-badge";
import { BookLink } from "@/components/book-link";
import { HOME, OFFERS } from "@/content/home";
import { CLIENT_PROJECTS } from "@/content/projects";
import { HARNESS_STATS } from "@/content/harness";
import { CountUp, LeanMarquee, Magnetic, RevealRoot, TiltCard } from "@/components/refs/brightman-client";
import { BASE, BmFooter, BmHeader, BmProjectCard, idx, plainRich, renderRich } from "@/components/refs/pages/brightman-shared";
import { EMAIL } from "@/lib/site";

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

const TOP_PROJECTS = CLIENT_PROJECTS.slice(0, 3);

export function DesignBrightman() {
  const [first, second, third] = OFFERS;
  const offers = [first, second, third];
  const headline = renderRich(HOME.heroHeadline);

  return (
    <main id="top" className="ref-root ref-brightman">
      <RevealRoot />
      <div className="bm-wide">
        <BmHeader />

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
            <Link href={`${BASE}/about`} className="bm-all-link bm-all-link-center">{HOME.aboutLink}</Link>
          </div>
        </section>

        <section className="bm-section bm-home-work" aria-labelledby="bm-work-h">
          <div className="bm-sec-head" data-rv>
            <h2 id="bm-work-h" className="bm-big-h bm-big-h-md">{HOME.workTitle}</h2>
            <p>{HOME.workLede}</p>
          </div>
          <div className="bm-pgrid bm-pgrid-3">
            {TOP_PROJECTS.map((p, i) => (
              <BmProjectCard
                key={p.slug}
                id={`bm-home-${p.slug}`}
                n={i + 1}
                source={{ slug: p.slug }}
                name={p.name}
                title={p.title}
                outcome={p.outcome}
                href={`${BASE}/case/${p.slug}`}
              />
            ))}
          </div>
          <Link href={`${BASE}/projects`} className="bm-all-link" data-rv>{HOME.workLink}</Link>
        </section>

        <section className="bm-homequote" aria-label="Client words" data-rv>
          <figure>
            <blockquote><p>{renderRich(HOME.quote)}</p></blockquote>
            <figcaption>
              <strong>{HOME.quoteRole}</strong>
              <span>{HOME.quoteProject}</span>
            </figcaption>
          </figure>
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

        <BmFooter />
      </div>
    </main>
  );
}
