// Copy for /harness. Facts come from my ~/.claude config and its git history,
// checked on 2026-11-12. No employer, client or repo names on this page.

export interface HarnessLayer {
  /** Matches a part id in content/harness/drawing.ts. */
  id: string;
  name: string;
  what: string;
  why: string;
  fact: string;
}

export interface HarnessChange {
  date: string;
  /** Human date, e.g. "16 Jun". */
  label: string;
  title: string;
  trigger: string;
  result: string;
}

export interface HarnessStat {
  value: string;
  label: string;
}

export const HARNESS = {
  title: "My AI harness: how I build fast without shipping mistakes",
  description:
    "The rules, guardrails, reviewers and second opinions around the AI I build with, drawn as a teardown, and the dated changes that put each one there.",
  h1: "The system around the AI is where the quality comes from.",
  lede:
    "Anyone can prompt a model. What I bring is the harness around it: the rules it reads, the guardrails it cannot cross, the reviewers that check its work and the loop that runs it overnight. I change it most weeks, and every change starts with something that went wrong.",
  drawingHeading: "Take it apart",
  drawingHint: "Pick a layer to see what it does and why it is there.",
  whyLabel: "Why it is there:",
  explodedLabel: "Exploded",
  assembledLabel: "Assembled",
  drawingCaption: "Concept drawing. Each plate is one layer of the harness, bottom to top in the order a task passes through them.",
  statsHeading: "In numbers",
  changesHeading: "What changed, and why",
  changesIntro:
    "A selection from the change log. Each one names the failure that triggered it, because a rule with no incident behind it is a guess.",
  principlesHeading: "How I decide what goes in",
  closingTitle: "This is what builds your project.",
  closingBody:
    "Same harness, same guardrails, same second opinions. You get the speed of AI with checks on every change before it reaches you.",
  closingButton: "Book a free intro call",
  teaserHeading: "How I build",
  teaserTitle: "The harness around the AI, taken apart.",
  teaserBody:
    "Eight layers of rules, guardrails and reviewers sit between the model and your project. See each one, and the mistake that put it there.",
  teaserLink: "See the harness",
} as const;

/** Bottom to top, matching the drawing. */
export const HARNESS_LAYERS: readonly HarnessLayer[] = [
  {
    id: "model",
    name: "Model",
    what: "Claude does the thinking. Three tiers: the strongest for architecture, a fast one for routine building, the cheapest for searching and sweeping.",
    why: "Matching the model to the job keeps quality high where it matters and cost low where it does not.",
    fact: "Model picks are reviewed at every release, not set once.",
  },
  {
    id: "memory",
    name: "Memory",
    what: "A decision log, an index of what each project has learned, and a list of ideas I tried and rejected.",
    why: "A fresh session forgets everything. Without memory it re-proposes the idea we already ruled out.",
    fact: "Memory only records what I said or what was checked against a source, never something an email or web page claimed.",
  },
  {
    id: "rules",
    name: "Rules",
    what: "Standing instructions the model reads before it starts: how to commit, how to handle secrets, what done means.",
    why: "Every repeated mistake gets written down once so it never needs correcting twice.",
    fact: "Rules that only matter for one kind of file load only when that file is touched, so they cost nothing elsewhere.",
  },
  {
    id: "skills",
    name: "Skills",
    what: "Written playbooks for jobs I do often: shipping a change, reviewing an interface, scoping a client process.",
    why: "A workflow I repeat should be one file, not a long prompt I retype and get slightly wrong.",
    fact: "76 active skills. A skill unused for 30 days gets deleted at the next audit.",
  },
  {
    id: "hooks",
    name: "Guardrails",
    what: "Scripts that run before and after every action and block the dangerous ones outright: force pushes, production deploys, reading secret files.",
    why: "Asking a model to be careful is not a control. Anything irreversible is blocked in code.",
    fact: "27 guardrail scripts, each with a smoke test that proves it still fires.",
  },
  {
    id: "reviewers",
    name: "Reviewers",
    what: "Separate agents, each with a fresh context and one lens: correctness, security, blast radius. A judge checks their findings against the code.",
    why: "A model reviewing its own work in the same session agrees with itself. Fresh eyes do not.",
    fact: "Findings default to refuted until the judge finds evidence in the code.",
  },
  {
    id: "second",
    name: "Second opinion",
    what: "On risky changes, a model from a different company reads the diff in an empty folder and reports what it sees.",
    why: "Two models from the same family share blind spots. A different family catches different bugs.",
    fact: "Claude plus an outside model caught 56.7% of planted bugs, against 42.7% for two Claude reviewers.",
  },
  {
    id: "runner",
    name: "Goal runner",
    what: "I write a goal with a finish line a test can check. The runner works it in its own branch, loops until the checks pass, and opens a pull request.",
    why: "Prompting step by step was the bottleneck. Goals and loops let the work run overnight.",
    fact: "It only interrupts me for things that cannot be undone: a production deploy, a destructive database change, money.",
  },
];

export const HARNESS_STATS: readonly HarnessStat[] = [
  { value: "318", label: "changes to the harness since 6 September 2026" },
  { value: "27", label: "guardrail scripts that block irreversible actions" },
  { value: "1,154", label: "second-opinion reviews logged" },
  { value: "56.7%", label: "of planted bugs caught with an outside reviewer, up from 42.7%" },
];

/** Oldest first. */
export const HARNESS_CHANGES: readonly HarnessChange[] = [
  {
    date: "2026-06-12",
    label: "12 Jun",
    title: "Reviewers start from “wrong until proven”",
    trigger: "A broad review stalled and another crashed on one empty result.",
    result: "Reviewers now get a fixed file list and must prove each finding. In one six-reviewer run, three plausible but wrong findings died before they reached me.",
  },
  {
    date: "2026-06-16",
    label: "16 Jun",
    title: "Secrets never get printed, even to work around a block",
    trigger: "A database password showed up in an error message on screen.",
    result: "I rotated it the same day. A rule now forbids dumping any secrets file, and a blocked command means simplify, never route around.",
  },
  {
    date: "2026-06-29",
    label: "29 Jun",
    title: "Commit after every file",
    trigger: "Three delegated build agents ran out of time with work done and nothing saved.",
    result: "Agents now edit, test and commit one file before reading the next, so a stopped run loses minutes, not hours.",
  },
  {
    date: "2026-07-02",
    label: "2 Jul",
    title: "Big builds run one task at a time",
    trigger: "A 15-task build in one long session kept losing its place.",
    result: "A loop hands each task to a fresh agent and checks its output before the next. All 14 build tasks landed.",
  },
  {
    date: "2026-07-08",
    label: "8 Jul",
    title: "A context limit set by my own data",
    trigger: "My limit of 60k tokens was ignored in 45% of sessions.",
    result: "I measured my own sessions: interruptions sit at 0.33% under 100k tokens and climb to 3.15% past 400k. The trigger moved to 100k.",
  },
  {
    date: "2026-09-26",
    label: "26 Sep",
    title: "No pull request without a passing gate",
    trigger: "Changes could reach review before the checks had run.",
    result: "A guardrail now blocks opening or merging a pull request until the pre-ship gate has passed on that exact version.",
  },
  {
    date: "2026-10-13",
    label: "13 Oct",
    title: "A second model family joins the review",
    trigger: "Claude reviewers kept agreeing with each other on the same misses.",
    result: "Risky changes now go to an outside model as well. Coverage of planted bugs rose from 42.7% to 56.7%.",
  },
  {
    date: "2026-10-14",
    label: "14 Oct",
    title: "A review only counts if it was read",
    trigger: "An outside review could come back clean without reading the input.",
    result: "Every review must echo a read receipt. No receipt means a missing review, never a pass. A planted-bug control passed 3 of 3 on two models.",
  },
  {
    date: "2026-10-14",
    label: "14 Oct",
    title: "Cutting the rulebook",
    trigger: "The rules had grown long enough to crowd out the actual work.",
    result: "Eight rule files condensed in one pass. Full text archived, only the working version loads.",
  },
  {
    date: "2026-11-11",
    label: "11 Nov",
    title: "Only irreversible things reach my phone",
    trigger: "Pings for reversible items trained me to ignore pings.",
    result: "The runner now handles anything that can be undone on its own. I hear about deploys, destructive migrations, leaked secrets and spend. Nothing else.",
  },
];

export const HARNESS_PRINCIPLES: readonly { title: string; body: string }[] = [
  {
    title: "Block what cannot be undone. Explain the rest.",
    body: "A force push is stopped by code. Writing a good commit message is a rule. Mixing the two up is how harnesses get either brittle or ignored.",
  },
  {
    title: "Check with something outside the conversation.",
    body: "Tests, a fresh reviewer, a different model, or me. A model checking its own work in the same session is not a check.",
  },
  {
    title: "No rule without an incident.",
    body: "Corrections are staged first and promoted at a quarterly audit, once they have proven they come up again.",
  },
  {
    title: "Keep it thin.",
    body: "Anything unused for 30 days is deleted. A lighter harness is faster, cheaper and easier for the model to follow.",
  },
];
