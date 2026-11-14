import type { Metadata } from "next";
import Link from "next/link";

import { DESIGN_REFS } from "@/content/designs";

// TEMPORARY: index of the reference-led design previews. Not in the sitemap, noindex.

export const metadata: Metadata = {
  title: "Design directions | Rayyan Abzal",
  robots: { index: false, follow: false },
};

export default function DesignsIndex() {
  return (
    <main id="top" className="wrap section">
      <h1>Design directions</h1>
      <p className="lede">One full site per reference: its structure and layout, our tokens, type and copy.</p>
      <ol className="ds-index">
        {DESIGN_REFS.map((d) => (
          <li key={d.slug}>
            <Link href={`/designs/${d.slug}`}>{d.name}</Link>
            <span>After {d.credit}. {d.borrows}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
