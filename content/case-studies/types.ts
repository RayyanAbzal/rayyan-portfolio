import type { BookingSource, CaseSlug } from "@/lib/book";

/** Inline copy: plain text, or a run wrapped as a highlight, mark or strong. */
export type Rich = readonly (string | { hi: string } | { mark: string } | { strong: string })[];

export type BadgeTone = "green" | "amber" | "dim";

export interface CaseBlock {
  heading: Rich;
  paragraphs: readonly Rich[];
}

export interface CaseQuote {
  text: Rich;
  role: string;
  project: string;
}

export interface CaseNavLink {
  label: string;
  target: string;
  href: string;
}

export interface CrmRow {
  handle: string;
  handleTone: "hi" | "text";
  platform: string;
  engagement: string;
  score: string;
  scoreHi?: boolean;
  stage: string;
  stageTone: BadgeTone;
}

export interface CrmPreviewData {
  kind: "crm";
  appName: string;
  appSub: string;
  badge: string;
  rows: readonly CrmRow[];
  footer: string;
}

export interface StatCard {
  value: string;
  label: string;
  hi?: boolean;
}

export interface RosterPreviewData {
  kind: "roster";
  appName: string;
  appSub: string;
  cards: readonly StatCard[];
  progressLabel: string;
  progressValue: string;
  progressPercent: number;
  footer: string;
}

export interface BotMessage {
  command: string;
  checks?: readonly string[];
  result?: { tier: string; payout: string; badge: string };
  failure?: { text: string; badge: string };
}

export interface BotPreviewData {
  kind: "bot";
  appName: string;
  appSub: string;
  badge: string;
  messages: readonly BotMessage[];
  footer: string;
}

export interface TokenRow {
  symbol: string;
  name: string;
  price: string;
  marketCap: string;
  holders: string;
  status: string;
}

export interface TradeRow {
  side: "BUY" | "SELL";
  wallet: string;
  amount: string;
  time: string;
}

export interface TokenPreviewData {
  kind: "token";
  appName: string;
  appSub: string;
  badge: string;
  token: TokenRow;
  tradesLabel: string;
  trades: readonly TradeRow[];
  footer: string;
}

export type PreviewData = CrmPreviewData | RosterPreviewData | BotPreviewData | TokenPreviewData;

export interface CaseStudy {
  slug: CaseSlug;
  title: string;
  metaTitle: string;
  description: string;
  /** Open Graph and Twitter description when it differs from `description`. */
  socialDescription?: string;
  summary: Rich;
  facts: readonly string[];
  preview: PreviewData;
  problem: CaseBlock;
  built: CaseBlock;
  outcome: CaseBlock;
  stack: readonly string[];
  quote?: CaseQuote;
  ctaSource: BookingSource;
  prev: CaseNavLink;
  next: CaseNavLink;
}
