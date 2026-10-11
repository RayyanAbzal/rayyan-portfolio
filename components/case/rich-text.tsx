import { Fragment } from "react";

import type { Rich } from "@/content/case-studies/types";

/** Renders inline copy runs: plain text, `.hi`, `.mark` or `<strong>`. */
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, index) => {
        if (typeof part === "string") return <Fragment key={index}>{part}</Fragment>;
        if ("hi" in part) return <span key={index} className="hi">{part.hi}</span>;
        if ("mark" in part) return <span key={index} className="mark">{part.mark}</span>;
        return <strong key={index}>{part.strong}</strong>;
      })}
    </>
  );
}
