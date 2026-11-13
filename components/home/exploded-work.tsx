"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { DATA_LABEL, PLATE_KINDS, WORK_HINT, type ProjectLayers } from "@/content/home-novelty";

export interface WorkRow extends ProjectLayers {
  name: string;
  title: string;
}

interface ExplodedWorkProps {
  rows: readonly WorkRow[];
}

const DATA_CELLS = Array.from({ length: 42 }, (_, i) => i);
const SWAP_MS = 320;

function logicPath(nodes: WorkRow["logic"]): string {
  const pts = nodes.map((n) => [n.x + 8, n.y + 6] as const);
  return pts
    .slice(1)
    .map((q, k) => {
      const p = pts[k];
      const mid = (p[0] + q[0]) / 2;
      return `M${p[0]} ${p[1]} C${mid} ${p[1]} ${mid} ${q[1]} ${q[0]} ${q[1]}`;
    })
    .join(" ");
}

/**
 * Client work as a list of links beside a three-plate stack: interface on top, logic in
 * the middle, data underneath. Hovering or focusing a row takes that build apart; the
 * row itself still goes to the case study. The stack is decoration (aria-hidden), the
 * list carries every fact.
 */
export function ExplodedWork({ rows }: ExplodedWorkProps) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);

  // First paint: plates closed, then open once the page has settled.
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(1)));
    return () => cancelAnimationFrame(id);
  }, []);

  // Swap: close to a sliver, blur the faces, refill, open again.
  const swap = useRef(0);
  useEffect(() => () => window.clearTimeout(swap.current), []);
  const choose = (i: number) => {
    if (i === active) return;
    setActive(i);
    window.clearTimeout(swap.current);
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setShown(i);
      return;
    }
    setSwapping(true);
    setOpen(0.15);
    swap.current = window.setTimeout(() => {
      setShown(i);
      setSwapping(false);
      setOpen(1);
    }, SWAP_MS);
  };

  // Pointer tilt, lerped so the stack trails the hand slightly.
  useEffect(() => {
    const box = stage.current;
    const el = rig.current;
    if (!box || !el) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover)").matches) return;
    let tx = 52;
    let tz = -38;
    let rx = 52;
    let rz = -38;
    let raf = 0;
    const step = () => {
      rx += (tx - rx) * 0.12;
      rz += (tz - rz) * 0.12;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--rz", `${rz}deg`);
      raf = Math.abs(tx - rx) + Math.abs(tz - rz) > 0.05 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const r = box.getBoundingClientRect();
      tx = 52 - ((event.clientY - r.top) / r.height - 0.5) * 16;
      tz = -38 + ((event.clientX - r.left) / r.width - 0.5) * 20;
      el.classList.add("tilting");
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onLeave = () => {
      tx = 52;
      tz = -38;
      if (!raf) raf = requestAnimationFrame(step);
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const row = rows[shown];
  if (!row) return null;
  const openVar = { "--open": open } as CSSProperties;
  const plate = (z: number, i: number) => ({ "--z": z, "--i": i }) as CSSProperties;

  return (
    <div className="b-work">
      <div>
        <p className="hint b-hint">{WORK_HINT}</p>
        <ul className="b-list">
          {rows.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/work/${r.slug}`}
                data-active={i === active ? "" : undefined}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") choose(i);
                }}
                onFocus={() => choose(i)}
              >
                <span className="name">
                  {r.name}
                  <span>{r.weeks}</span>
                </span>
                <span className="what">{r.title}</span>
                <span className="out">{r.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={swapping ? "b-stage swap" : "b-stage"} ref={stage} aria-hidden="true">
        <div className="b-rig" ref={rig} style={openVar}>
          <div className="b-plate" style={plate(-115, 2)}>
            <div className="b-face">
              <div className="b-data">
                {DATA_CELLS.map((i) => (
                  <i key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="b-plate" style={plate(0, 1)}>
            <div className="b-face">
              <div className="b-logic">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d={logicPath(row.logic)} vectorEffect="non-scaling-stroke" />
                </svg>
                {row.logic.map((n) => (
                  <span key={n.label} className="b-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                    {n.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="b-plate" style={plate(115, 0)}>
            <div className="b-face b-ui">
              <div className="panel">
                <div className="panel-bar">
                  <b>{row.ui.title}</b>
                  <small>{DATA_LABEL}</small>
                </div>
                <table>
                  <tbody>
                    <tr>
                      {row.ui.head.map((h, c) => (
                        <th key={h} className={row.ui.numeric.includes(c) ? "num" : undefined}>
                          {h}
                        </th>
                      ))}
                    </tr>
                    {row.ui.rows.map((cells, k) => (
                      <tr key={cells.join("|")} className={k === row.ui.hi ? "hi" : undefined}>
                        {cells.map((cell, c) => (
                          <td key={c} className={row.ui.numeric.includes(c) ? "num" : undefined}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="b-legend" style={openVar}>
          {row.layers.map((layer, j) => (
            <span key={PLATE_KINDS[j]} className="b-tag" style={{ "--i": j } as CSSProperties}>
              {layer} <small>{PLATE_KINDS[j]}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
