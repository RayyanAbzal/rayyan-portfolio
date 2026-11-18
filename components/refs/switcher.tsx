import Link from "next/link";

import { DESIGN_PAGES, DESIGN_REFS, type DesignRef } from "@/content/designs";
import { CASE_STUDIES } from "@/content/case-studies";
import { CASE_SLUGS } from "@/lib/pages";

// TEMPORARY: the dark switcher pinned to every /designs/<slug> page. It moves between
// directions on the same page, and between the pages of one direction.

interface SwitcherProps {
  design: DesignRef;
  /** The path after /designs/<slug>: "" for home, "/about", "/case/feedhack". */
  at: string;
}

export function DirectionSwitcher({ design, at }: SwitcherProps) {
  const pages = [
    { path: "", name: "Home" },
    ...DESIGN_PAGES.slice(0, 1).map((p) => ({ path: `/${p.slug}`, name: p.name })),
    ...CASE_SLUGS.map((s) => ({ path: `/case/${s}`, name: CASE_STUDIES[s].title })),
    ...DESIGN_PAGES.slice(1).map((p) => ({ path: `/${p.slug}`, name: p.name })),
  ];
  return (
    <nav className="ds-switch" aria-label="Design directions">
      <p>
        After {design.credit}. <a href={design.url}>Reference</a>
      </p>
      <ul>
        {DESIGN_REFS.map((d, i) => (
          <li key={d.slug}>
            <Link href={`/designs/${d.slug}${at}`} aria-current={d.slug === design.slug ? "page" : undefined}>
              {i + 1} {d.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="ds-pages">
        {pages.map((p) => (
          <li key={p.path}>
            <Link href={`/designs/${design.slug}${p.path}`} aria-current={p.path === at ? "page" : undefined}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
