import type { Metadata } from "next";
import { AboutFacts } from "@/components/about/facts";
import { AboutFaq } from "@/components/about/faq";
import { AboutOpening } from "@/components/about/opening";
import { AboutPrinciples } from "@/components/about/principles";
import { AboutProcess } from "@/components/about/process";
import { AboutTestimonials } from "@/components/about/testimonials";
import { BookLink } from "@/components/book-link";
import { JsonLd } from "@/components/json-ld";
import { StickyBookCta } from "@/components/sticky-book-cta";
import { Button } from "@/components/ui/button";
import aboutLd from "@/content/jsonld/about.json";
import aboutBreadcrumbLd from "@/content/jsonld/about-breadcrumb.json";
import { ABOUT, FAQ_ITEMS } from "@/content/about";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: ABOUT.title,
  description: ABOUT.description,
  socialDescription: ABOUT.socialDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ_ITEMS)} />
      <JsonLd data={aboutBreadcrumbLd} />
      <JsonLd data={aboutLd} />
      <main id="top" tabIndex={-1}>
        <AboutOpening />
        <AboutFacts />
        <AboutPrinciples />
        <AboutProcess />
        <AboutTestimonials />
        <AboutFaq />

        <section id="contact" className="wrap has-rule">
          <div className="cta-panel">
            <div>
              <h2 className="display">{ABOUT.ctaTitle}</h2>
              <p>{ABOUT.ctaBody}</p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="gold">
                <BookLink source="about_contact">{ABOUT.ctaButton}</BookLink>
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
