import Link from "next/link";

import { AucklandClock } from "@/components/home/auckland-clock";
import { BookLink } from "@/components/book-link";
import { ClientGrid } from "@/components/refs/pages/astapable-cards";
import { Arrow, AsRich, AsShell, BASE, dirHref, plain } from "@/components/refs/pages/astapable-shell";
import { HOME, HOME_SIDE_CARDS, OFFERS } from "@/content/home";
import { HERO } from "@/content/home-novelty";
import { EMAIL } from "@/lib/site";

/** Three thin plates in isometric view: interface, logic, data. Top plate green. */
function PlateStack() {
  const ys = [92, 152, 212];
  return (
    <svg className="as-stack" viewBox="0 0 300 300" aria-hidden="true" fill="none" overflow="visible" strokeLinejoin="round" strokeLinecap="round">
      <g stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="3 4">
        <path d="M50 92v60M150 142v60M250 92v60M50 152v60M250 152v60M150 202v60" />
      </g>
      {ys.map((y, i) => {
        const top = i === 0;
        return (
          <g key={y} className={`as-plate as-plate-${i}`} stroke="var(--ink)" strokeWidth="1.4">
            <path d={`M50 ${y}l100 50v10L50 ${y + 10}Z`} fill={top ? "var(--tint)" : "var(--sunken)"} />
            <path d={`M150 ${y + 50}l100-50v10l-100 50Z`} fill={top ? "var(--tint)" : "var(--sunken)"} />
            <path d={`M150 ${y - 50}l100 50-100 50L50 ${y}Z`} fill={top ? "var(--live)" : "var(--surface)"} />
            <path d={`M95 ${y + 3}l55-27 55 27`} strokeWidth="1" stroke={top ? "var(--ink)" : "var(--line-2)"} />
          </g>
        );
      })}
    </svg>
  );
}

export function DesignAstapable() {
  const side = HOME_SIDE_CARDS;
  const cta = plain(HOME.ctaTitle).replace(/\.$/, "");
  const split = cta.indexOf("30");

  return (
    <AsShell>
      <section className="as-hero" aria-labelledby="as-h1">
        <div className="as-hero-art">
          <PlateStack />
        </div>
        <div className="as-hero-foot">
          <div className="as-sharp">
            <h1 id="as-h1">Rayyan Abzal</h1>
            <p>{plain(side[2].body)}</p>
          </div>
          <p className="as-status">
            <i aria-hidden="true" />
            {HERO.status}
            <span className="as-sep" aria-hidden="true" />
            <AucklandClock place={HERO.place} />
          </p>
        </div>
      </section>

      <section aria-labelledby="as-work" className="as-section">
        <h2 id="as-work" className="as-title as-sharp">
          Client work
        </h2>
        <ClientGrid slugs={["feedhack", "influence-v2"]} />
        <p className="as-more as-sharp">
          <Link className="as-btn as-btn-out" href={`${BASE}/projects`}>
            All projects
          </Link>
        </p>
      </section>

      <section aria-labelledby="as-apps" className="as-section">
        <h2 id="as-apps" className="as-title as-sharp">
          {HOME.servicesTitle.replace(/\.$/, "")}
        </h2>
        <ul className="as-apps">
          {OFFERS.map((o, i) => (
            <li key={o.title} className="as-app as-sharp">
              <span className="as-tile" aria-hidden="true">
                {i + 1}
              </span>
              <h3>
                <Link href={dirHref(o.linkHref)} className="as-cover">
                  {o.title}
                </Link>
              </h3>
              <p>{o.body}</p>
              <span className="as-go" aria-hidden="true">
                <Arrow />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="as-quote" className="as-section">
        <h2 id="as-quote" className="as-title as-sharp">
          Client words
        </h2>
        <figure className="as-quote as-sharp">
          <blockquote>
            <p>
              <AsRich value={HOME.quote} />
            </p>
          </blockquote>
          <figcaption>
            {HOME.quoteRole}, {HOME.quoteProject}
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="as-cta" className="as-close">
        <h2 id="as-cta" className="as-sharp">
          <span>{cta.slice(0, split).trim()}</span>
          <span className="as-nowrap">
            {cta.slice(split)} <Arrow size={56} />
          </span>
        </h2>
        <div className="as-actions as-sharp">
          <a className="as-btn as-btn-out" href={`mailto:${EMAIL}`}>
            Email me
          </a>
          <BookLink source="design_preview" className="as-btn as-btn-ink">
            Book a call
          </BookLink>
        </div>
      </section>
    </AsShell>
  );
}
