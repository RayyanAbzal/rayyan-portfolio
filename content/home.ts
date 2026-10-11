import type { Rich } from "@/content/rich";

export interface Offer {
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
  duration: string;
  price: string;
}

export interface SideCard {
  title: string;
  body: Rich;
}

export const DATA_NOTE =
  "The product visuals are drawn schematics with representative data, not client screenshots.";

export const HOME = {
  title: "AI Consultant & Automation, Auckland NZ | Rayyan Abzal",
  description:
    "AI consultant in Auckland, New Zealand. I build AI automation and custom software that replaces manual work for startups and small businesses. Free intro call.",
  heroHeadline: ["I build ", { mark: "AI" }, " that runs your business."] as Rich,
  heroLede:
    "Automation for a manual process, AI inside the product you already have, or the whole tool built from scratch. One person, end to end, from Auckland.",
  heroCta: "Book a free 30-minute call",
  heroSecondary: "See the shipped work",
  workTitle: "Four client builds, all live.",
  workLede:
    "Each one replaced a manual process with a system the team still uses every day. The title says what it did; the case study says how.",
  workLink: "All projects",
  servicesTitle: "What I build.",
  servicesLede:
    "Most engagements start with finding where AI or automation can replace manual work. When the project needs a whole product, I build that too.",
  aboutRole: "Founder, AI engineer, the person who writes the code",
  aboutBig:
    "One operator, end to end. The person who scopes your project is the person who builds it, ships it, and picks up when something breaks.",
  aboutParagraphs: [
    "I run a solo AI engineering practice out of Auckland. I have shipped production systems across creator-economy CRMs, payout automation, and on-chain platforms, and I also work as an AI engineer at Growlab, an Auckland AI consultancy. Different domains, same engine: find the manual bottleneck, replace it with the lightest system that solves it.",
    "No accounts team, no junior developer getting handed the real build. You talk to me, I write the system, you get the outcome.",
  ],
  aboutLink: "More about how I work",
  quote: [
    "We liked the first tool so much we brought Rayyan back to build a full performance dashboard on top of it. Everything we track as a team is now in one place, in exactly the design language we asked for. ",
    { mark: "Genuinely one of the best decisions we made for the business." },
  ] as Rich,
  quoteRole: "Agency Director",
  quoteProject: "Influence v2, Malta",
  quoteLink: "More client words",
  ctaTitle: "Book a free 30-minute call.",
  ctaBody:
    "You describe how your business runs. I tell you honestly whether AI can help, what I would build, and what it would cost.",
  ctaButton: "Book a free intro call",
} as const;

export const OFFERS: readonly Offer[] = [
  {
    title: "Automate a manual process",
    body: "I find the bottleneck, then build the automation or AI workflow that removes it. Your team keeps the tools they know while the busywork disappears.",
    linkLabel: "See FeedHack",
    linkHref: "/work/feedhack",
    duration: "1 to 3 weeks",
    price: "Fixed price",
  },
  {
    title: "Add AI to your existing product",
    body: "LLM features, agents, and pipelines added to the codebase you already have. Most of this work is additive, so your team keeps shipping while I build.",
    linkLabel: "See Influence v2",
    linkHref: "/work/influence-v2",
    duration: "2 to 4 weeks",
    price: "Fixed price",
  },
  {
    title: "Build the whole tool",
    body: "Platform, dashboard, bot, or contracts. Designed, built, and shipped end to end, then handed over with docs and a team walkthrough.",
    linkLabel: "See Influence",
    linkHref: "/work/influence",
    duration: "4 to 8 weeks",
    price: "Fixed price",
  },
];

export const HOME_SIDE_CARDS: readonly SideCard[] = [
  { title: "Open for the next project", body: ["Two active projects at most. Depth over breadth."] },
  { title: "Last shipped: Influence v2", body: ["Repeat client. A performance dashboard on top of the CRM I built them first."] },
  { title: "Auckland, New Zealand", body: ["Clients in NZ, Europe, and the US. Everything runs remotely."] },
];
