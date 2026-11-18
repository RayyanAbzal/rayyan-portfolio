import type { DesignSlug } from "@/content/designs";

import { PAGES as astapable } from "./astapable";
import { PAGES as brightman } from "./brightman";
import { PAGES as nexora } from "./nexora";
import { PAGES as outcrowd } from "./outcrowd";
import { PAGES as refined } from "./refined";
import { PAGES as ses } from "./ses";
import { PAGES as synapse } from "./synapse";
import type { DirectionPages } from "./types";

// TEMPORARY: every direction's inner pages, keyed by slug.
export const DIRECTION_PAGES: Record<DesignSlug, DirectionPages> = {
  refined,
  astapable,
  brightman,
  ses,
  nexora,
  outcrowd,
  synapse,
};
