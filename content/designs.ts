// TEMPORARY: reference-led design previews at /designs/<slug>. Delete once Ray picks a direction.

export type DesignSlug = "refined" | "astapable" | "brightman" | "ses" | "nexora" | "outcrowd" | "synapse";

export interface DesignRef {
  slug: DesignSlug;
  /** Short name shown in the switcher. */
  name: string;
  /** Who made the reference. */
  credit: string;
  /** Where the reference lives. */
  url: string;
  /** One line on the structure this design borrows. */
  borrows: string;
}

export const DESIGN_REFS: readonly DesignRef[] = [
  {
    slug: "refined",
    name: "Refined",
    credit: "Refined, Framer template",
    url: "https://refined.framer.website/",
    borrows: "Centred two-line hero, project showcase, numbered 2x2 solutions, list rows, pricing pair, FAQ, form card, centred sign-off.",
  },
  {
    slug: "astapable",
    name: "Astapable",
    credit: "Evgenii Astapov",
    url: "https://astapable.com/",
    borrows: "Name-first hero with an object, pale centred section titles, big two-column work grid with tag chips, app cards, huge closing line.",
  },
  {
    slug: "brightman",
    name: "Brightman",
    credit: "Cuberto",
    url: "https://dribbble.com/shots/25085123-Brightman-Motion-Design",
    borrows: "Huge light headline, gradient intro panel with round badge, dark stats panel, services marquee, staggered bento, steps, dark CTA and footer.",
  },
  {
    slug: "ses",
    name: "SES",
    credit: "Zajno",
    url: "https://dribbble.com/shots/27806238-AI-Energy-Technology-Website",
    borrows: "Segmented pill nav, pale centred headline, three tall gradient cards, statement band, stats column, horizontal pipeline, spec-sheet rows.",
  },
  {
    slug: "nexora",
    name: "Nexora",
    credit: "QClay",
    url: "https://dribbble.com/shots/27209933-AI-Agency-Landing-Page",
    borrows: "Aurora hero with centred headline, trust row, centred stats row with hairlines, eyebrow split headings, four feature cards with a green fill.",
  },
  {
    slug: "outcrowd",
    name: "Outcrowd",
    credit: "Outcrowd",
    url: "https://dribbble.com/shots/26742281-Website-for-an-Incident-Management-Platform",
    borrows: "Dark rounded page on a tinted ground, glow hero with product mock, hanging labels card, connected platform diagram, bento, tilted tile stack.",
  },
  {
    slug: "synapse",
    name: "Synapse",
    credit: "Synapse AI",
    url: "https://dribbble.com/shots/27802410-Synapse-AI-AI-Agency-Website",
    borrows: "Dark wave hero, connected diagram, accordion beside a stair-step roadmap, case carousel, light calculator panel, solid colour CTA.",
  },
];

export function findDesign(slug: string): DesignRef | undefined {
  return DESIGN_REFS.find((d) => d.slug === slug);
}
