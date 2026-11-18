import type { ReactNode } from "react";

import type { CaseSlug } from "@/lib/pages";

// TEMPORARY: the inner pages of one design direction. Each direction owns one
// module in this folder; the /designs routes read them through registry.tsx.
export interface DirectionPages {
  projects: () => ReactNode;
  about: () => ReactNode;
  contact: () => ReactNode;
  caseStudy: (props: { slug: CaseSlug }) => ReactNode;
}
