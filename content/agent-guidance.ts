import { CONTACT } from "@/content/contact";
import { OFFERS } from "@/content/home";

/**
 * Guidance for AI agents, rendered into llms.txt. Every line restates copy
 * that already appears on the site (home, about, contact, FAQ).
 */
export const AGENT_GUIDANCE = {
  whenToUseHeading: "When to use this",
  audience:
    "Best fit: founders, startups, and small businesses with a manual process that eats a team’s week. Based in Auckland, New Zealand; clients in NZ, Europe, and the US; everything runs remotely.",
  jobs: OFFERS.map((offer) => ({
    title: offer.title,
    detail: `${offer.duration}, ${offer.price.toLowerCase()}`,
  })),
  engageHeading: "How to engage",
  engage: [
    "Book the free 30-minute intro call with the booking link.",
    "Or email with a short first message.",
    `A first message works best with: ${CONTACT.firstMessageItems.map((item) => item.replace(/\.$/, "").replace(/^./, (c) => c.toLowerCase())).join("; ")}.`,
    "After the call, a written proposal with a fixed price follows within 48 hours.",
  ],
  whenNotToUseHeading: "When not to use this",
  whenNotToUse:
    "This is a solo practice with two active projects at most, so it is not an agency with an accounts team. A deterministic workflow gets normal automation rather than AI.",
} as const;
