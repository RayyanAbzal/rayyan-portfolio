import Link from "next/link";
import { Fragment } from "react";

import type { Rich } from "@/content/rich";

/** Renders inline copy runs: plain text, `.hi`, `.mark`, `<strong>` or a link. */
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, index) => {
        if (typeof part === "string") return <Fragment key={index}>{part}</Fragment>;
        if ("hi" in part) return <span key={index} className="hi">{part.hi}</span>;
        if ("mark" in part) return <span key={index} className="mark">{part.mark}</span>;
        if ("link" in part) {
          return part.href.startsWith("/") ? (
            <Link key={index} className="link" href={part.href}>{part.link}</Link>
          ) : (
            <a key={index} className="link" href={part.href} target="_blank" rel="noopener">{part.link}</a>
          );
        }
        return <strong key={index}>{part.strong}</strong>;
      })}
    </>
  );
}
