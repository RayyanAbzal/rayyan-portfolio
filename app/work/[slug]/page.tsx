import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookLink } from "@/components/book-link";
import { CasePreview } from "@/components/case/previews";
import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, findCaseStudy } from "@/content/case-studies";
import type { CaseBlock, CaseNavLink } from "@/content/case-studies/types";
import feedhackArticle from "@/content/jsonld/feedhack-article.json";
import feedhackCrumbs from "@/content/jsonld/feedhack-breadcrumb.json";
import influenceArticle from "@/content/jsonld/influence-article.json";
import influenceCrumbs from "@/content/jsonld/influence-breadcrumb.json";
import influenceV2Article from "@/content/jsonld/influence-v2-article.json";
import influenceV2Crumbs from "@/content/jsonld/influence-v2-breadcrumb.json";
import pumpdatArticle from "@/content/jsonld/pumpdat-article.json";
import pumpdatCrumbs from "@/content/jsonld/pumpdat-breadcrumb.json";
import type { CaseSlug } from "@/lib/book";
import { pageMetadata } from "@/lib/seo";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

const MODIFIED = "2026-10-12";

const STRUCTURED_DATA: Record<CaseSlug, { crumbs: object; article: object }> = {
  influence: { crumbs: influenceCrumbs, article: influenceArticle },
  "influence-v2": { crumbs: influenceV2Crumbs, article: influenceV2Article },
  feedhack: { crumbs: feedhackCrumbs, article: feedhackArticle },
  pumpdat: { crumbs: pumpdatCrumbs, article: pumpdatArticle },
};

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.metaTitle,
    description: study.description,
    ...(study.socialDescription ? { socialDescription: study.socialDescription } : {}),
    path: `/work/${study.slug}`,
    article: { modifiedTime: MODIFIED },
  });
}

function Block({ block }: { block: CaseBlock }) {
  return (
    <article className="case-block">
      <div className="case-block-body">
        <h2><RichText value={block.heading} /></h2>
        {block.paragraphs.map((paragraph, index) => (
          <p key={index}><RichText value={paragraph} /></p>
        ))}
      </div>
    </article>
  );
}

function NavLink({ link, side }: { link: CaseNavLink; side: "prev" | "next" }) {
  return (
    <Link href={link.href} className={side}>
      <span className="label">{link.label}</span>
      <span className="target">{link.target}</span>
    </Link>
  );
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) notFound();
  const data = STRUCTURED_DATA[study.slug];

  return (
    <>
      <JsonLd data={data.crumbs} />
      <JsonLd data={data.article} />
      <main id="top" tabIndex={-1}>
        <section className="wrap case-hero">
          <Link href="/work" className="case-back">All projects</Link>
          <h1 className="case-title display">{study.title}</h1>
          <p className="case-summary"><RichText value={study.summary} /></p>
          <p className="case-facts">
            {study.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </p>

          <div className="case-body">
            <CasePreview data={study.preview} />
            <Block block={study.problem} />
            <Block block={study.built} />
            <Block block={study.outcome} />
            <article className="case-block case-stack-block">
              <div className="case-block-body">
                <div className="case-stack-list">
                  {study.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {study.quote && (
            <figure className="quote">
              <blockquote><RichText value={study.quote.text} /></blockquote>
              <figcaption className="attrib">
                <span><strong>{study.quote.role}</strong>, {study.quote.project}</span>
              </figcaption>
            </figure>
          )}

          <div className="case-cta">
            <div>
              <h3>Have a similar bottleneck?</h3>
              <p>Free 30-minute intro call. Written proposal with a fixed price within 48 hours.</p>
            </div>
            <Button asChild variant="gold">
              <BookLink source={study.ctaSource}>Book a free intro call</BookLink>
            </Button>
          </div>

          <nav className="case-nav" aria-label="More case studies">
            <NavLink link={study.prev} side="prev" />
            <NavLink link={study.next} side="next" />
          </nav>
        </section>
      </main>
      <StickyBookCta
        showAfter=".case-body > .case-block:nth-child(2)"
        hideAt=".case-cta"
        source="sticky_mobile_case"
      />
    </>
  );
}
