"use client";

import { Upload } from "lucide-react";
import {
  Avatar,
  Bar,
  Button,
  Collapse,
  Count,
  Icon,
  Meter,
  Roll,
  Stage,
  States,
  Window,
  type Act,
} from "../kit";
import "../look.css";
import "./influence-cpa.css";

// Influence v2: the Current Roster in an agency CRM (after the upload gold for
// the file arriving, the overlap gold for the satellite). Staff upload the
// month's KPI file, every partner row refreshes in turn, and the focal
// partner's card shows sign-ups against the monthly target on a gauge, the cost
// per sign-up rolling, and the next contact reminder landing last. Partners
// and numbers are made up. No chat-app marks.

interface S {
  file: boolean;
  p: number;
  done: boolean;
  r: number;
  gauge: boolean;
  chip: boolean;
}

const START: S = { file: false, p: 0, done: false, r: 0, gauge: false, chip: false };
const POSTER: S = { file: true, p: 1, done: true, r: 5, gauge: true, chip: true };

interface Partner {
  name: string;
  ftd: [number, number];
  cpa: [number, number];
  fee: string;
  next: string;
}

const PARTNERS: Partner[] = [
  { name: "Northline Media", ftd: [612, 847], cpa: [38.4, 34.2], fee: "€2,400", next: "Thu" },
  { name: "Vela Creators", ftd: [204, 231], cpa: [31.0, 29.8], fee: "€1,800", next: "Mon" },
  { name: "Bright Ox", ftd: [96, 118], cpa: [41.5, 40.1], fee: "€1,200", next: "Fri" },
  { name: "Kestrel Social", ftd: [58, 70], cpa: [36.2, 35.4], fee: "€900", next: "Tue" },
  { name: "Harbour and Pine", ftd: [44, 52], cpa: [37.0, 36.2], fee: "€800", next: "Wed" },
];

const TARGET = 1200;
const eur = (n: number) => `€${n.toFixed(2)}`;
const whole = (n: number) => n.toLocaleString("en-IE");

const script = async (a: Act<S>) => {
  await a.wait(900);
  a.mark("upload");
  await a.move({ at: "upload", x: 0.5, y: 0.5 });
  await a.wait(250);
  await a.click();
  a.put({ file: true });
  await a.wait(600);
  for (const p of [0.38, 0.74, 1]) {
    a.put({ p });
    await a.wait(520);
  }
  a.put({ done: true });
  await a.wait(500);
  a.mark("refresh");
  for (let r = 1; r <= 5; r++) {
    a.put({ r });
    if (r === 1) a.put({ gauge: true });
    await a.wait(420);
  }
  await a.wait(700);
  a.mark("reminder");
  a.put({ chip: true });
  await a.wait(3200);
};

function Sidebar() {
  return (
    <aside className="ic-side">
      <Bar w={58} h={8} tone={4} />
      <div className="ic-side__list">
        <div className="ic-side__row">
          <Bar w={64} h={6} tone={2} />
        </div>
        <div className="ic-side__row" data-active="">
          <span>Roster</span>
        </div>
        {[52, 70, 46].map((w, i) => (
          <div key={i} className="ic-side__row">
            <Bar w={w} h={6} tone={2} />
          </div>
        ))}
      </div>
    </aside>
  );
}

function Gauge({ value }: { value: number }) {
  return (
    <svg className="ic-gauge" viewBox="0 0 120 68" aria-hidden="true">
      <path className="ic-gauge__track" d="M 10 62 A 50 50 0 0 1 110 62" pathLength="1" />
      <path className="ic-gauge__fill" d="M 10 62 A 50 50 0 0 1 110 62" pathLength="1" style={{ strokeDasharray: `${value} 1` }} />
    </svg>
  );
}

export default function InfluenceCpa() {
  return (
    <Stage<S>
      width={760}
      height={456}
      compact={{ below: 600, width: 358, height: 628 }}
      initial={START}
      poster={POSTER}
      script={script}
      play="once"
      cursor={{ at: { x: 640, y: 420 } }}
      className="look-ra ic"
    >
      {(s, _rect, layout) => {
        const compact = layout === "compact";
        const focal = PARTNERS[0];
        const after = s.gauge;
        return (
          <>
            <Window
              className="ic-win"
              title="Current Roster"
              sidebar={compact ? undefined : <Sidebar />}
              sidebarWidth={112}
              toolbar={
                <Button size="small" variant="secondary" icon={<Upload size={13} strokeWidth={2} />} data-target="upload">
                  Upload CSV
                </Button>
              }
            >
              <div className="ic-main">
                <div className="ic-sub">
                  <span>Week 24</span>
                  <span className="ic-dot" aria-hidden="true" />
                  <span>
                    CSV synced <Roll>{s.done ? "just now" : "3m ago"}</Roll>
                  </span>
                </div>

                <Collapse open={s.file} reveal="drop">
                  <div className="ic-file">
                    <span className="ic-file__icon">
                      <Icon name="file" size={14} />
                    </span>
                    <span className="ic-file__name">kpi_week24.csv</span>
                    <States
                      value={s.done ? "done" : "up"}
                      align="start"
                      states={{
                        up: <Meter className="ic-file__bar" value={s.p} />,
                        done: (
                          <span className="ic-file__done">
                            <Icon name="check" size={13} filled />
                            Synced
                          </span>
                        ),
                      }}
                    />
                  </div>
                </Collapse>

                <div className="ic-table">
                  <div className="ic-tr ic-tr--head">
                    <span>Partner</span>
                    <span className="ic-num">FTD</span>
                    <span className="ic-num">CPA</span>
                    <span className="ic-num ic-opt">Flat fee</span>
                    <span className="ic-num ic-opt">Next contact</span>
                  </div>
                  {PARTNERS.map((p, i) => {
                    const on = s.r > i;
                    return (
                      <div key={p.name} className="ic-tr" data-sel={i === 0 || undefined}>
                        <span className="ic-who">{p.name}</span>
                        <span className="ic-num">
                          <Count value={p.ftd[on ? 1 : 0]} duration={800} format={whole} />
                        </span>
                        <span className="ic-num">
                          <Count value={p.cpa[on ? 1 : 0]} duration={800} format={eur} />
                        </span>
                        <span className="ic-num ic-opt">{p.fee}</span>
                        <span className="ic-num ic-opt">{p.next}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Window>

            <div className="ic-card">
              <div className="ic-card__head">
                <Avatar name="Northline" size={26} />
                <div className="ic-card__who">
                  <span className="ic-card__name">{focal.name}</span>
                  <span className="ic-card__sub">Flat fee {focal.fee}</span>
                </div>
              </div>
              <div className="ic-card__gauge">
                <Gauge value={(after ? focal.ftd[1] : focal.ftd[0]) / TARGET} />
                <div className="ic-card__read">
                  <Count className="ic-card__ftd" value={after ? focal.ftd[1] : focal.ftd[0]} duration={1100} format={whole} />
                  <span className="ic-card__of">of {whole(TARGET)} FTD target</span>
                </div>
              </div>
              <div className="ic-card__cpa">
                <span>CPA</span>
                <Count value={after ? focal.cpa[1] : focal.cpa[0]} duration={900} format={eur} />
              </div>
              <Collapse open={s.chip} reveal="drop" from="below">
                <span className="ic-chip">
                  <Icon name="bell" size={13} />
                  Next contact: {focal.next}
                </span>
              </Collapse>
            </div>
          </>
        );
      }}
    </Stage>
  );
}
