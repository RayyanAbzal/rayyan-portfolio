import type { ComponentType } from "react";

import type { CaseSlug } from "@/lib/book";

import AriaChat from "./aria-chat";
import FeedhackPayout from "./feedhack-payout";
import Influence from "./influence";
import InfluenceCpa from "./influence-cpa";
import Pumpdat from "./pumpdat";

// One live demo per project. Cards and case pages read this map, so a project
// gets its demo everywhere at once; a missing entry falls back to its schematic.

export const CLIENT_DEMOS: Partial<Record<CaseSlug, ComponentType>> = {
  influence: Influence,
  feedhack: FeedhackPayout,
  pumpdat: Pumpdat,
  "influence-v2": InfluenceCpa,
};

/** Keyed by PersonalProject.title. */
export const PERSONAL_DEMOS: Partial<Record<string, ComponentType>> = {
  ARIA: AriaChat,
};
