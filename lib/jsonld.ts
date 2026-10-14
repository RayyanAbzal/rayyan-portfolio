import type { FaqItem } from "@/content/about";

/** FAQPage JSON-LD built from the same items the visible accordion renders. */
export function buildFaqJsonLd(items: readonly FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
