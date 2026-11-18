import Link from "next/link";

import { BookLink } from "@/components/book-link";
import { OcProjectCard } from "@/components/refs/pages/outcrowd-project";
import { OC, OcCta, OcPage, richText } from "@/components/refs/pages/outcrowd-shell";
import { OFFERS, HOME } from "@/content/home";
import { HARNESS, HARNESS_LAYERS, HARNESS_PRINCIPLES, HARNESS_STATS } from "@/content/harness";
import { CLIENT_PROJECTS } from "@/content/projects";

/** The first words of the headline are lit green, the rest stays on-panel. */
function Headline() {
  const full = richText(HOME.heroHeadline);
  const cut = full.indexOf(" that ");
  const lead = full.slice(0, cut);
  const rest = full.slice(cut);
  return (
    <h1 id="oc-hero-h" className="oc-h1">
      <span className="oc-green">{lead}</span>
      {rest}
    </h1>
  );
}

const THREADS = HARNESS_LAYERS.slice(0, 6);
const FLOW_LAYERS = HARNESS_LAYERS.slice(1, 5);
const TOP_PROJECTS = CLIENT_PROJECTS.slice(0, 3);

/** Line chart, decorative: two smooth curves over faint grid lines. */
function Chart() {
  return (
    <svg className="oc-chart" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g className="oc-grid">
        <path d="M0 20H320M0 50H320M0 80H320M0 110H320" />
      </g>
      <path className="oc-line-a" d="M0 92C30 92 40 30 70 30S110 100 140 88S180 20 215 34S270 96 320 60" />
      <path className="oc-line-b" d="M0 100C40 96 60 70 100 74S160 50 200 62S280 40 320 30" />
    </svg>
  );
}

/** Circuit lines from the four cards to the chip. Decorative. */
function Circuit() {
  return (
    <svg className="oc-circuit" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 37H70C100 37 100 120 130 120H200" />
      <path d="M0 112H60C90 112 100 135 130 135H200" />
      <path d="M0 187H60C90 187 100 165 130 165H200" />
      <path d="M0 262H70C100 262 100 180 130 180H200" />
      <g className="oc-pulses">
        <path pathLength={100} d="M0 37H70C100 37 100 120 130 120H200" />
        <path pathLength={100} d="M0 112H60C90 112 100 135 130 135H200" />
        <path pathLength={100} d="M0 187H60C90 187 100 165 130 165H200" />
        <path pathLength={100} d="M0 262H70C100 262 100 180 130 180H200" />
      </g>
    </svg>
  );
}

export function DesignOutcrowd() {
  return (
    <OcPage current="home">
        {/* 1. hero */}
        <section className="oc-hero" aria-labelledby="oc-hero-h">
          <div className="oc-beam" aria-hidden="true" />
          <div className="oc-hero-copy">
            <Headline />
            <p className="oc-lede">{HOME.heroLede}</p>
            <div className="oc-actions">
              <BookLink source="design_preview" className="oc-pill oc-pill-glow">{HOME.heroCta}</BookLink>
              <Link href={`${OC}/projects`} className="oc-pill oc-pill-ghost">{HOME.heroSecondary}</Link>
            </div>
          </div>

          <div className="oc-dash-wrap">
            <div className="oc-dash" role="group" aria-label="Harness numbers">
              <div className="oc-dash-top">
                <h2 className="oc-dash-title">Harness, in numbers</h2>
                <span className="oc-live-dot" aria-hidden="true" />
              </div>
              <div className="oc-dash-body">
                <div className="oc-dash-main">
                  <ul className="oc-stats">
                    {HARNESS_STATS.slice(0, 3).map((s) => (
                      <li key={s.label}>
                        <b>{s.value}</b>
                        <span>{s.label}</span>
                      </li>
                    ))}
                  </ul>
                  <Chart />
                </div>
                <aside className="oc-dash-side">
                  <p className="oc-side-k">{HARNESS_STATS[3].value}</p>
                  <p className="oc-side-t">{HARNESS_STATS[3].label}</p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* 2. top projects, each card plays its live demo */}
        <section className="oc-work oc-reveal" aria-labelledby="oc-work-h">
          <h2 id="oc-work-h" className="oc-h2">{HOME.workTitle}</h2>
          <p className="oc-sub">{HOME.workLede}</p>
          <div className="oc-work-grid">
            {TOP_PROJECTS.map((p) => (
              <OcProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <Link href={`${OC}/projects`} className="oc-pill oc-pill-ghost oc-work-all">{HOME.workLink}</Link>
        </section>

        {/* 3. wide card with threaded labels */}
        <section className="oc-wide oc-reveal" aria-labelledby="oc-wide-h">
          <div className="oc-wide-copy">
            <h2 id="oc-wide-h" className="oc-h2-left">{OFFERS[0].title}</h2>
            <p>{OFFERS[0].body}</p>
          </div>
          <ul className="oc-threads" aria-label="Layers of the harness">
            {THREADS.map((l) => (
              <li key={l.id}><span>{l.name}</span></li>
            ))}
          </ul>
        </section>

        {/* 4. one platform */}
        <section className="oc-platform oc-reveal" aria-labelledby="oc-plat-h">
          <h2 id="oc-plat-h" className="oc-h2">{HARNESS.teaserTitle}</h2>
          <p className="oc-sub">{HARNESS.teaserBody}</p>
          <div className="oc-flow">
            <ul className="oc-flow-cards">
              {FLOW_LAYERS.map((l) => (
                <li key={l.id}>
                  <h3>{l.name}</h3>
                  <p>{l.piece}</p>
                </li>
              ))}
            </ul>
            <Circuit />
            <div className="oc-chipwrap">
              <div className="oc-chip" role="img" aria-label="The model sits at the centre of the harness">AI</div>
            </div>
          </div>
        </section>

        {/* 5. capabilities bento */}
        <section className="oc-caps oc-reveal" aria-labelledby="oc-caps-h">
          <h2 id="oc-caps-h" className="oc-h2">{HOME.servicesTitle}</h2>
          <div className="oc-bento">
            <article className="oc-b oc-b-green">
              <h3>{OFFERS[0].title}</h3>
              <p>{OFFERS[0].body}</p>
              <p className="oc-meta">{OFFERS[0].duration}. {OFFERS[0].price}.</p>
            </article>
            <figure className="oc-b oc-b-chat">
              <blockquote className="oc-bubble">{richText(HOME.quote)}</blockquote>
              <figcaption>{HOME.quoteRole}, {HOME.quoteProject}</figcaption>
            </figure>
            <article className="oc-b oc-b-offers">
              {[OFFERS[1], OFFERS[2]].map((o) => (
                <div key={o.title}>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                  <p className="oc-meta">{o.duration}. {o.price}.</p>
                </div>
              ))}
            </article>
          </div>
        </section>

        {/* 6. foundation */}
        <section className="oc-found oc-reveal" aria-labelledby="oc-found-h">
          <h2 id="oc-found-h" className="oc-h2">{HARNESS.principlesHeading}</h2>
          <ul className="oc-tiles">
            {HARNESS_PRINCIPLES.map((f, i) => (
              <li key={f.title} tabIndex={0} className={i === 1 ? "oc-tile oc-tile-solid" : "oc-tile"}>
                <span className="oc-icon" aria-hidden="true">{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. final CTA */}
        <OcCta id="oc-cta-h" title={richText(HOME.ctaTitle)} body={HOME.ctaBody} label={HOME.ctaButton} />
    </OcPage>
  );
}
