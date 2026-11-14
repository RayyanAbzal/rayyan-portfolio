"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

export interface SesStageItem {
  slug: string;
  name: string;
  title: string;
  outcome: string;
}

interface SesStageProps {
  items: readonly SesStageItem[];
  /** One server-rendered visual per item, same order. */
  visuals: readonly ReactNode[];
}

/** Segmented control on a soft stage: one project's schematic at a time. */
export function SesStage({ items, visuals }: SesStageProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement | null>(null);
  const [ind, setInd] = useState<CSSProperties | null>(null);

  useEffect(() => {
    function measure(): void {
      const tab = tabs.current[active];
      if (!tab) return;
      setInd({ transform: `translateX(${tab.offsetLeft}px) scaleX(${tab.offsetWidth / 100})` });
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (list.current) ro.observe(list.current);
    return () => ro.disconnect();
  }, [active]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    const last = items.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="stage">
      <div
        ref={list}
        className="seg seg-center"
        role="tablist"
        aria-label="Client projects"
        data-ind={ind ? "1" : undefined}
      >
        {ind ? <span className="seg-ind" aria-hidden="true" style={ind} /> : null}
        {items.map((item, i) => (
          <button
            key={item.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`ses-tab-${item.slug}`}
            aria-selected={i === active}
            aria-controls={`ses-panel-${item.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="seg-tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.slug}
          role="tabpanel"
          id={`ses-panel-${item.slug}`}
          aria-labelledby={`ses-tab-${item.slug}`}
          hidden={i !== active}
          className="stage-panel"
        >
          <div className="stage-visual">{visuals[i]}</div>
          <h3 className="stage-title">{item.title}</h3>
          <p className="stage-outcome">{item.outcome}</p>
        </div>
      ))}
    </div>
  );
}
