import type { CaseSlug } from "@/lib/book";

export interface ClientProject {
  slug: CaseSlug;
  name: string;
  title: string;
  blurb: string;
  outcome: string;
}

/** Card order on the home and projects pages. */
export const CLIENT_PROJECTS: readonly ClientProject[] = [
  {
    slug: "influence",
    name: "Influence",
    title: "Influencer CRM for a Malta agency",
    blurb:
      "An influencer agency went from spreadsheets to a purpose-built platform. Scouting, valuation, campaign matching, and reminders now run end to end.",
    outcome: "Spreadsheets to one platform. About 6 weeks, in daily use.",
  },
  {
    slug: "feedhack",
    name: "FeedHack",
    title: "Discord clip payouts on autopilot",
    blurb:
      "Zero manual overhead. Creator clip submissions are validated, ranked, and paid out automatically, with a dashboard on top for the team.",
    outcome: "Manual admin hours to zero. About 8 weeks, fully automated.",
  },
  {
    slug: "pumpdat",
    name: "pumpdat",
    title: "Token launchpad on Ethereum mainnet",
    blurb:
      "Shipped end to end: smart contracts, a real-time trade feed, the frontend, and auth. Live and handed over to the founder.",
    outcome: "Shipped to Ethereum mainnet. About 10 weeks, handed over.",
  },
  {
    slug: "influence-v2",
    name: "Influence v2",
    title: "Partner dashboard for a repeat client",
    blurb:
      "The same agency came back. Live partner management moved out of chat threads and into the platform: KPI uploads, progress tracking, automatic CPA.",
    outcome: "Repeat client. About 4 weeks, in daily use.",
  },
];

export interface PersonalProject {
  title: string;
  blurb: string;
  stack: string;
}

export const PERSONAL_PROJECTS: readonly PersonalProject[] = [
  {
    title: "FIOS",
    blurb:
      "A B2B API that turns fragrance names into structured product data: notes, accords, longevity, descriptions, images. Production-grade auth, rate limits, and async batch enrichment.",
    stack: "Next.js, Supabase, Anthropic",
  },
  {
    title: "ARIA",
    blurb:
      "An AI personal stylist. Upload an outfit photo and chat with ARIA for specific feedback based on the occasion, the weather, and your goals. Vision end to end.",
    stack: "React Native, Flask, Anthropic",
  },
  {
    title: "NZ Job Finder",
    blurb:
      "Scrapes Seek, LinkedIn, and Indeed for graduate roles, scores each against your CV, and drafts a tailored cover letter. Two passes: a seniority filter, then a full match.",
    stack: "TypeScript, Playwright, Anthropic",
  },
];
