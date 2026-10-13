/** Inline copy: plain text, or a run wrapped as a highlight, mark, strong or link. */
export type Rich = readonly (
  | string
  | { hi: string }
  | { mark: string }
  | { strong: string }
  | { nowrap: string }
  | { link: string; href: string }
)[];
