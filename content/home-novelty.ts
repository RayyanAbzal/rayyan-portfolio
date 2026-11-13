// Copy and synthetic data for the three moving pieces on the home page:
// the teardown hero, the exploded client work and the living offer demos.
// Every table here is representative data, never a client screenshot.

import type { CaseSlug } from "@/lib/book";

export interface PlateTable {
  title: string;
  head: readonly string[];
  /** Columns right-aligned as numbers, by index. */
  numeric: readonly number[];
  rows: readonly (readonly string[])[];
  /** Row drawn as the one in progress. */
  hi: number;
}

export interface LogicNode {
  label: string;
  /** Position on the logic plate, in percent. */
  x: number;
  y: number;
}

export interface ProjectLayers {
  slug: CaseSlug;
  weeks: string;
  short: string;
  ui: PlateTable;
  logic: readonly LogicNode[];
  /** Names for the interface, logic and data plates, top to bottom. */
  layers: readonly [string, string, string];
}

export const HERO = {
  status: "Open for the next project",
  place: "in Auckland",
  secondary: "How I build",
  rangeLabel: "Take the drawing apart",
  closed: "In harness",
  open: "Taken apart",
  idleTitle: "Drag the drawing, or pick a piece.",
  idleBody:
    "The horse is the model. Each piece of tack is one layer I added so the work ships safely, and the carriage is the loop that runs it. Every piece is listed on How I build.",
} as const;

export const SECTION_LABELS = {
  words: "Client words",
  next: "Next step",
  offersNote: "Every project is fixed price.",
} as const;

export const WORK_HINT = "Client work. Hover or focus one to take it apart, then click to read the case study.";
export const WORK_OPEN = "Open case study";
export const WORK_PREVIEW = "Preview a build";
export const PLATE_KINDS = ["Interface", "Logic", "Data"] as const;
export const DATA_LABEL = "Representative data";

/** In the order the home list shows them. */
export const PROJECT_LAYERS: readonly ProjectLayers[] = [
  {
    slug: "feedhack",
    weeks: "8 weeks",
    short: "Manual admin hours to zero.",
    ui: {
      title: "Payout queue",
      head: ["Clip", "Views", "Rank", "Payout"],
      numeric: [1, 2, 3],
      rows: [
        ["Ranked match recap", "184,200", "1", "$120.00"],
        ["Patch notes in 60s", "96,410", "2", "$80.00"],
        ["Clutch round edit", "41,875", "3", "$40.00"],
      ],
      hi: 1,
    },
    logic: [
      { label: "Clips in", x: 8, y: 14 },
      { label: "Rules check", x: 38, y: 48 },
      { label: "Ranking", x: 64, y: 14 },
      { label: "Payouts", x: 66, y: 70 },
    ],
    layers: ["Dashboard", "Ranking and payouts", "Discord and the database"],
  },
  {
    slug: "influence",
    weeks: "6 weeks",
    short: "Spreadsheets to one platform.",
    ui: {
      title: "Creator shortlist",
      head: ["Creator", "Followers", "Est. value"],
      numeric: [1, 2],
      rows: [
        ["@coastline.eats", "212K", "€1,450"],
        ["@studio.mira", "88K", "€640"],
        ["@runwithdan", "41K", "€310"],
      ],
      hi: 1,
    },
    logic: [
      { label: "Scouting", x: 6, y: 16 },
      { label: "Valuation", x: 40, y: 46 },
      { label: "Matching", x: 66, y: 14 },
      { label: "Reminders", x: 64, y: 70 },
    ],
    layers: ["Agency platform", "Scouting and valuation", "Creators and campaigns"],
  },
  {
    slug: "influence-v2",
    weeks: "4 weeks",
    short: "Repeat client, in daily use.",
    ui: {
      title: "Partners this month",
      head: ["Partner", "Signups", "CPA"],
      numeric: [1, 2],
      rows: [
        ["North Shore Fitness", "312", "€4.10"],
        ["Harbour Coffee Co", "148", "€6.35"],
        ["Ponsonby Pilates", "96", "€7.80"],
      ],
      hi: 1,
    },
    logic: [
      { label: "KPI upload", x: 6, y: 16 },
      { label: "Progress", x: 40, y: 48 },
      { label: "CPA", x: 72, y: 16 },
      { label: "Alerts", x: 68, y: 70 },
    ],
    layers: ["Partner dashboard", "Tracking and CPA", "Partners and uploads"],
  },
  {
    slug: "pumpdat",
    weeks: "10 weeks",
    short: "Shipped to mainnet, handed over.",
    ui: {
      title: "Live trades",
      head: ["Token", "Side", "Amount", "Time"],
      numeric: [2, 3],
      rows: [
        ["KIWI", "Buy", "0.42 ETH", "12s ago"],
        ["TUI", "Sell", "0.08 ETH", "31s ago"],
        ["KIWI", "Buy", "1.10 ETH", "1m ago"],
      ],
      hi: 0,
    },
    logic: [
      { label: "Wallet sign-in", x: 4, y: 16 },
      { label: "Trade feed", x: 40, y: 46 },
      { label: "Launch", x: 72, y: 16 },
      { label: "Price curve", x: 64, y: 70 },
    ],
    layers: ["Launchpad", "Real-time trade feed", "Contracts on mainnet"],
  },
];

/** One short scene per offer, in OFFERS order. */
export const OFFER_SCENES = {
  captions: ["A manual process, automated", "AI inside a product you already have", "A whole tool, assembled"],
  note: "Synthetic example",
  steps: [
    "Download clip stats",
    "Paste views into the sheet",
    "Check each clip against the rules",
    "Work out the rankings",
    "Send each creator their payout",
  ],
  autoTitle: "Clip payouts",
  autoBody: "Runs on its own, every hour",
  productTitle: "Campaign: summer launch",
  productTag: "Your product",
  ask: "Find creators who fit this campaign",
  suggestions: {
    head: ["Creator", "Followers", "Fit"],
    rows: [
      ["@coastline.eats", "212K", "Strong"],
      ["@studio.mira", "88K", "Strong"],
      ["@runwithdan", "41K", "Good"],
    ],
  },
  blocks: {
    title: "Partner dashboard",
    side: "Partners",
    sideItems: ["Signups", "Uploads", "Payouts"],
    chart: "Signups this month",
    metric: "CPA",
    metricBody: "Worked out automatically",
    next: "Next upload",
    nextBody: "Friday",
  },
} as const;
