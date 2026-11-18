"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import type { Offer } from "@/content/home";
import { OFFER_SCENES as S } from "@/content/home-novelty";

interface LivingOffersProps {
  offers: readonly Offer[];
  note: string;
}

const DUR = 5200;
const DONE = ["collapsed", "answered", "built"] as const;
const SPARK = [40, 55, 48, 66, 60, 80, 100];

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * The three offers, each with a short scene that shows it working: manual steps that
 * collapse into one job, an ask answered inside a product, a tool assembling from its
 * parts. Scenes play in turn while the section is on screen; picking an offer stops the
 * rotation. Reduced motion shows each scene's end state. The scenes are aria-hidden;
 * the offer text carries every fact.
 */
export function LivingOffers({ offers, note }: LivingOffersProps) {
  const [cur, setCur] = useState(0);
  const [stage, setStage] = useState<string>("");
  const [ticked, setTicked] = useState(0);
  const [typed, setTyped] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLDivElement>(null);
  const auto = useRef(true);
  const visible = useRef(false);
  const timers = useRef<number[]>([]);
  const raf = useRef(0);
  const playRef = useRef<(i: number) => void>(() => {});
  // Set when a scene finished off screen, so the rotation picks up on the way back.
  const stalled = useRef<number | null>(null);

  const play = useCallback((i: number) => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    cancelAnimationFrame(raf.current);
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    stalled.current = null;
    setCur(i);
    setTicked(0);
    setStage("");
    setTyped("");
    if (!motionOK) {
      setStage(DONE[i]);
      setTicked(S.steps.length);
      setTyped(S.ask);
      return;
    }
    if (i === 0) {
      S.steps.forEach((_, k) => later(() => setTicked(k + 1), 400 + k * 380));
      later(() => setStage(DONE[0]), 2600);
    }
    if (i === 1) {
      [...S.ask].forEach((_, k) => later(() => setTyped(S.ask.slice(0, k + 1)), 300 + k * 38));
      later(() => setStage(DONE[1]), 300 + S.ask.length * 38 + 250);
    }
    if (i === 2) later(() => setStage(DONE[2]), 200);

    const bars = meter.current ? [...meter.current.querySelectorAll<HTMLElement>("i")] : [];
    const start = performance.now();
    const tick = (now: number) => {
      const f = Math.min(1, (now - start) / DUR);
      bars.forEach((b, k) => {
        b.style.transform = `scaleX(${k < i ? 1 : k === i ? f : 0})`;
      });
      if (f < 1) raf.current = requestAnimationFrame(tick);
      // One full pass, then it rests on the last scene; nothing loops forever.
      else if (auto.current && i < 2 && visible.current) playRef.current(i + 1);
      else if (auto.current && i < 2) stalled.current = i + 1;
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  // Start when the section first comes into view; pause the rotation off screen.
  useEffect(() => {
    playRef.current = play;
    const el = root.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = Boolean(entry?.isIntersecting);
        if (visible.current && !started) {
          started = true;
          play(0);
        } else if (visible.current && stalled.current !== null) {
          play(stalled.current);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const pending = timers.current;
    return () => {
      io.disconnect();
      pending.forEach(window.clearTimeout);
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const pick = (i: number) => {
    auto.current = false;
    play(i);
  };

  return (
    <div className="c-offers" ref={root}>
      <ul className="offers">
        {offers.map((offer, i) => (
          <li key={offer.title} data-on={i === cur ? "" : undefined}>
            <button type="button" className="c-pick" aria-pressed={i === cur} onClick={() => pick(i)}>
              {offer.title}
            </button>
            <span className="dur">{offer.duration}</span>
            <p>{offer.body}</p>
            <Link className="link link-arrow" href={offer.linkHref}>
              {offer.linkLabel}
            </Link>
          </li>
        ))}
        <li className="offers-note hint">{note}</li>
      </ul>

      <div className="c-side">
        <div className="c-stage" aria-hidden="true">
          <div className={`c-scene${cur === 0 ? " on" : ""}${cur === 0 && stage ? ` ${stage}` : ""}`}>
            <div className="s1">
              {S.steps.map((step, k) => (
                <div key={step} className={k < ticked && cur === 0 ? "step ticked" : "step"} style={v({ "--i": k })}>
                  <span className="box" />
                  <span>{step}</span>
                </div>
              ))}
              <div className="auto">
                <b>{S.autoTitle}</b>
                <small>
                  <span className="dot" />
                  {S.autoBody}
                </small>
              </div>
            </div>
          </div>

          <div className={`c-scene${cur === 1 ? " on" : ""}${cur === 1 && stage ? ` ${stage}` : ""}`}>
            <div className="panel s2">
              <div className="panel-bar">
                <b>{S.productTitle}</b>
                <small>{S.productTag}</small>
              </div>
              <div className="ask">
                <span>{cur === 1 ? typed : ""}</span>
                <span className="caret" />
              </div>
              <table>
                <tbody>
                  <tr>
                    {S.suggestions.head.map((h, c) => (
                      <th key={h} className={c > 0 ? "num" : undefined}>
                        {h}
                      </th>
                    ))}
                  </tr>
                  {S.suggestions.rows.map((cells) => (
                    <tr key={cells[0]} className="sug">
                      {cells.map((cell, c) => (
                        <td key={c} className={c > 0 ? "num" : undefined}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`c-scene${cur === 2 ? " on" : ""}${cur === 2 && stage ? ` ${stage}` : ""}`}>
            <div className="s3">
              <div className="blk" style={v({ "--i": 0, left: 0, top: 0, right: 0, height: "34px", "--sx": "-40px", "--sy": "-60px", "--sr": "-8deg" })}>
                <b>{S.blocks.title}</b>
              </div>
              <div className="blk" style={v({ "--i": 1, left: 0, top: "44px", width: "30%", bottom: 0, "--sx": "-90px", "--sy": "30px", "--sr": "10deg" })}>
                <b>{S.blocks.side}</b>
                {S.blocks.sideItems.map((item) => (
                  <span key={item} className="blk-item">{item}</span>
                ))}
              </div>
              <div className="blk" style={v({ "--i": 2, left: "calc(30% + 10px)", top: "44px", right: 0, height: "110px", "--sx": "80px", "--sy": "-50px", "--sr": "7deg" })}>
                <b>{S.blocks.chart}</b>
                <div className="spark">
                  {SPARK.map((h) => (
                    <i key={h} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="blk" style={v({ "--i": 3, left: "calc(30% + 10px)", top: "164px", width: "calc(35% - 15px)", bottom: 0, "--sx": "-30px", "--sy": "90px", "--sr": "-12deg" })}>
                <b>{S.blocks.metric}</b>
                {S.blocks.metricBody}
              </div>
              <div className="blk" style={v({ "--i": 4, left: "calc(65% + 5px)", top: "164px", right: 0, bottom: 0, "--sx": "100px", "--sy": "70px", "--sr": "9deg" })}>
                <b>{S.blocks.next}</b>
                {S.blocks.nextBody}
              </div>
            </div>
          </div>
        </div>
        <div className="c-meter" ref={meter} aria-hidden="true">
          {[0, 1, 2].map((k) => (
            <span key={k}>
              <i />
            </span>
          ))}
        </div>
        <div className="c-cap hint">
          <span>{S.captions[cur]}</span>
          <span>{S.note}</span>
        </div>
      </div>
    </div>
  );
}
