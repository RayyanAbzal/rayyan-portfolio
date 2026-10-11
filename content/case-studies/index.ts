import type { CaseSlug } from "@/lib/book";

import { feedhack } from "./feedhack";
import { influence } from "./influence";
import { influenceV2 } from "./influence-v2";
import { pumpdat } from "./pumpdat";
import type { CaseStudy } from "./types";

export const CASE_STUDIES: Record<CaseSlug, CaseStudy> = {
  influence,
  "influence-v2": influenceV2,
  feedhack,
  pumpdat,
};

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return Object.values(CASE_STUDIES).find((study) => study.slug === slug);
}
