import type { Metadata } from "next";

import { RichText } from "@/components/case/rich-text";
import { JsonLd } from "@/components/json-ld";
import privacyLd from "@/content/jsonld/privacy.json";
import privacyBreadcrumbLd from "@/content/jsonld/privacy-breadcrumb.json";
import { PRIVACY } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: PRIVACY.title,
  description: PRIVACY.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={privacyBreadcrumbLd} />
      <JsonLd data={privacyLd} />
      <main id="top" tabIndex={-1}>
        <section className="wrap pb-[clamp(40px,5vw,64px)]">
          <div className="section-head mb-0">
            <h1 className="display max-w-[14ch] text-[clamp(2.5rem,6.5vw,5.25rem)]">{PRIVACY.h1}</h1>
            <p className="lede">{PRIVACY.lede}</p>
          </div>
        </section>

        <section className="wrap tight">
          <div className="prose">
            <p className="text-ink-3">
              <time dateTime="2026-10-12">{PRIVACY.updatedLabel}</time>
            </p>
            {PRIVACY.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}><RichText value={paragraph} /></p>
                ))}
              </div>
            ))}
            <p>{PRIVACY.contactNote}</p>
          </div>
        </section>
      </main>
    </>
  );
}
