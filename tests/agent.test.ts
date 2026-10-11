import { describe, expect, it } from "vitest";

import { AGENT_GUIDANCE } from "@/content/agent-guidance";
import { CONTACT } from "@/content/contact";
import contactLd from "@/content/jsonld/contact.json";
import homeLd from "@/content/jsonld/home.json";
import privacyLd from "@/content/jsonld/privacy.json";
import { OFFERS } from "@/content/home";
import { PRIVACY, CALENDLY_PRIVACY_URL, VERCEL_PRIVACY_URL } from "@/content/privacy";
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
