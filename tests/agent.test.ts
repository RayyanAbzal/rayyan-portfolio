import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { AGENT_GUIDANCE } from "@/content/agent-guidance";
import { FAQ_ITEMS } from "@/content/about";
import { CONTACT } from "@/content/contact";
import contactLd from "@/content/jsonld/contact.json";
import homeLd from "@/content/jsonld/home.json";
import privacyLd from "@/content/jsonld/privacy.json";
import { OFFERS } from "@/content/home";
import { PRIVACY, CALENDLY_PRIVACY_URL, VERCEL_PRIVACY_URL } from "@/content/privacy";
import { buildFaqJsonLd } from "@/lib/jsonld";
import { findMarkdownPage, llmsTxt } from "@/lib/markdown";
import { EMAIL, FOOTER_LINKS, NAV_ITEMS } from "@/lib/site";

interface Node {
  "@type": string;
  contactPoint?: { "@type": string; email: string; contactType: string };
  description?: string;
  address?: { "@type": string };
}

function graph(data: object): Node[] {
  return (data as { "@graph": Node[] })["@graph"];
}

describe("llms.txt agent guidance", () => {
  const text = llmsTxt();

  it("has when-to-use, how-to-engage and when-not-to-use sections", () => {
    expect(text).toContain("## When to use this");
    expect(text).toContain("## How to engage");
    expect(text).toContain("## When not to use this");
  });

  it("names every offer as a best-fit job and the engagement route", () => {
    for (const offer of OFFERS) expect(text).toContain(offer.title);
    expect(text).toContain("https://calendly.com/rayyanabzal/discovery");
    expect(text).toContain(EMAIL);
    expect(text).toContain("within 48 hours");
    expect(AGENT_GUIDANCE.whenNotToUse).toContain("two active projects at most");
  });

  it("lists the contact and privacy mirrors", () => {
    expect(text).toContain("https://rayyanabzal.com/contact.md");
    expect(text).toContain("https://rayyanabzal.com/privacy.md");
  });
});

describe("organization schema", () => {
  it("adds a ContactPoint to the ProfessionalService node, keeping its address", () => {
    const business = graph(homeLd).find((node) => node["@type"] === "ProfessionalService");
    expect(business?.contactPoint).toEqual({ "@type": "ContactPoint", email: EMAIL, contactType: "sales" });
    expect(business?.address?.["@type"]).toBe("PostalAddress");
  });
});

describe("contact and privacy pages", () => {
  it("have at least 500 visible characters in their markdown mirrors", () => {
    expect(findMarkdownPage("/contact")?.markdown.length).toBeGreaterThan(500);
    expect(findMarkdownPage("/privacy")?.markdown.length).toBeGreaterThan(500);
  });

  it("keep JSON-LD descriptions equal to the visible copy and use the right types", () => {
    expect(graph(contactLd)[0]?.["@type"]).toBe("ContactPage");
    expect(graph(contactLd)[0]?.description).toBe(CONTACT.description);
    expect(graph(privacyLd)[0]?.["@type"]).toBe("WebPage");
    expect(graph(privacyLd)[0]?.description).toBe(PRIVACY.description);
  });

  it("states the update date and links both third-party policies", () => {
    expect(PRIVACY.updatedLabel).toBe("Last updated: 2026-10-12");
    const markdown = findMarkdownPage("/privacy")?.markdown ?? "";
    expect(markdown).toContain(VERCEL_PRIVACY_URL);
    expect(markdown).toContain(CALENDLY_PRIVACY_URL);
  });

  it("appear in the footer links and not in the top nav", () => {
    expect(FOOTER_LINKS.map((link) => link.href)).toEqual(["/contact", "/privacy"]);
    expect(NAV_ITEMS.map((link) => link.href)).not.toContain("/contact");
  });
});

describe("faq json-ld", () => {
  it("answers equal the visible faq answers, in the same order", () => {
    const ld = buildFaqJsonLd(FAQ_ITEMS) as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(ld.mainEntity).toHaveLength(FAQ_ITEMS.length);
    ld.mainEntity.forEach((entity, index) => {
      expect(entity.name).toBe(FAQ_ITEMS[index]?.question);
      expect(entity.acceptedAnswer.text).toBe(FAQ_ITEMS[index]?.answer);
    });
  });

  it("keeps the wording the visible page uses", () => {
    const text = JSON.stringify(buildFaqJsonLd(FAQ_ITEMS));
    expect(text).toContain("you receive a written proposal");
    expect(text).toContain("computer science degree");
    expect(text).not.toContain("CS degree");
  });
});

describe("llms.txt stack and faq", () => {
  const text = llmsTxt();

  it("has a Stack section with the stated languages", () => {
    expect(text).toContain("## Stack");
    expect(text).toContain("TypeScript, Node.js, Python");
  });

  it("has a FAQ section with every question and visible answer", () => {
    expect(text).toContain("## FAQ");
    for (const item of FAQ_ITEMS) expect(text).toContain(`**${item.question}** ${item.answer}`);
  });

  it("is mirrored in the about markdown", () => {
    const about = findMarkdownPage("/about")?.markdown ?? "";
    expect(about).toContain("TypeScript, Node.js, Python");
    for (const item of FAQ_ITEMS) expect(about).toContain(item.answer);
  });
});

describe("privacy wording", () => {
  const markdown = findMarkdownPage("/privacy")?.markdown ?? "";

  it("keeps the booking and email claims and the reworded hosting sentence", () => {
    expect(markdown).toContain("A booking creates an appointment with me, so I see the details you enter.");
    expect(markdown).toContain("If you email me, I receive your message and email address and use them to reply.");
    expect(markdown).toContain("My hosting provider, Vercel, may process request data such as IP addresses");
  });

  it("links the final policy urls and stays over 500 characters", () => {
    expect(CALENDLY_PRIVACY_URL).toBe("https://calendly.com/legal/privacy-notice");
    expect(VERCEL_PRIVACY_URL).toBe("https://vercel.com/legal/privacy-notice");
    expect(markdown).toContain(CALENDLY_PRIVACY_URL);
    expect(markdown).toContain(VERCEL_PRIVACY_URL);
    expect(markdown).toContain("Last updated: 2026-10-12");
    expect(markdown.length).toBeGreaterThan(500);
  });
});

describe("card text colours", () => {
  it("raises outcome and stack line specificity above `.card p`", () => {
    const css = readFileSync(new URL("../app/styles/cards.css", import.meta.url), "utf8");
    expect(css).toContain(".card .card-outcome {");
    expect(css).toContain(".card .card-stackline {");
    expect(css).toMatch(/\.card \.card-outcome \{[^}]*color: var\(--pine-2\)/);
  });
});

describe("home layout pass content", () => {
  const home = findMarkdownPage("/")?.markdown ?? "";

  it("adds the Who builds it heading once, in the mirror", () => {
    expect(home.match(/^## Who builds it$/gm)).toHaveLength(1);
  });

  it("keeps the CTA heading text intact despite the no-wrap run", () => {
    expect(home).toContain("## Book a free 30-minute call.");
  });
});
