"use client";

import { Roll, Stage, Window, type Act } from "../kit";
import "../look.css";
import "./influence-cpa.css";

// Influence v2, after the table-edit gold. A partner's KPI upload lands as an
// edited sign-ups cell: the value is selected, the new count typed over it,
// Enter commits, the cell washes once, its CPA rolls, then the blended CPA in
// the footer rolls a beat later. Partners and numbers are made up.

interface S {
  edit: boolean;
  sel: boolean;
  val: string;
  signups: number;
  wash: boolean;
}

const ROWS = [
  { who: "Northline Media", spend: 4200, signups: 210 },
  { who: "Vela Creators", spend: 3000, signups: 120 },
  { who: "Bright Ox", spend: 1850, signups: 74 },
  { who: "Kestrel Social", spend: 2600, signups: 95 },
  { who: "Harbour and Pine", spend: 980, signups: 49 },
];
const EDIT = 1;
const AFTER = 164;

const eur = (n: number, digits = 0) =>
  `€${n.toLocaleString("en-IE", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
const count = (n: number) => n.toLocaleString("en-IE");

const initial: S = { edit: false, sel: false, val: "", signups: ROWS[EDIT].signups, wash: false };

async function script(a: Act<S>) {
  await a.wait(900);
  a.mark("open");
  await a.move({ at: "cell", x: 0.7, y: 0.5 });
  await a.wait(200);
  await a.click({ at: "cell", x: 0.7, y: 0.5 }, { double: true });
  a.put({ edit: true, sel: true, val: String(ROWS[EDIT].signups) });
  await a.move({ at: "cell", x: -0.5, y: 1.5 }, { duration: 450 });
  await a.wait(200);
  a.mark("type");
  a.put({ sel: false, val: "" });
  await a.type("val", String(AFTER), { interval: 90 });
  await a.wait(400);
  a.mark("commit");
  a.put({ edit: false, signups: AFTER, wash: true });
  await a.wait(900);
  a.put({ wash: false });
  await a.wait(1800);
}

export default function InfluenceCpa() {
  return (
    <Stage<S>
      width={660}
      height={400}
      compact={{ below: 660, width: 358, height: 400 }}
      initial={initial}
      poster={{ ...initial, signups: AFTER }}
      script={script}
      play="once"
      cursor={{ at: { x: 600, y: 350 } }}
      className="look-ra ic"
    >
      {(s) => {
        const rows = ROWS.map((r, i) => (i === EDIT ? { ...r, signups: s.signups } : r));
        const spend = rows.reduce((n, r) => n + r.spend, 0);
        const signups = rows.reduce((n, r) => n + r.signups, 0);
        return (
          <Window title="Partners, this month" className="ic-win">
            <div className="ic-body">
              <div className="ic-row ic-row--head">
                <span>Partner</span>
                <span className="ic-num ic-spend">Spend</span>
                <span className="ic-num">Sign-ups</span>
                <span className="ic-num">CPA</span>
              </div>
              {rows.map((r, i) => (
                <div key={r.who} className="ic-row">
                  <span className="ic-who">{r.who}</span>
                  <span className="ic-num ic-spend">{eur(r.spend)}</span>
                  {i === EDIT ? (
                    <span
                      className="ic-num ic-cell"
                      data-target="cell"
                      data-edit={s.edit || undefined}
                      data-wash={s.wash || undefined}
                    >
                      <span className="ic-ring" />
                      <span className="ic-text">
                        {s.edit ? (
                          <>
                            <span className="ic-sel" data-on={s.sel || undefined}>
                              {s.val}
                            </span>
                            <span className="ic-caret" data-hide={s.sel || undefined} key={s.val} />
                          </>
                        ) : (
                          count(r.signups)
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className="ic-num">{count(r.signups)}</span>
                  )}
                  <span className="ic-num">
                    {i === EDIT ? <Roll delay={250}>{eur(r.spend / r.signups, 2)}</Roll> : eur(r.spend / r.signups, 2)}
                  </span>
                </div>
              ))}
              <div className="ic-row ic-row--foot">
                <span>Blended CPA</span>
                <span className="ic-num ic-spend">{eur(spend)}</span>
                <span className="ic-num">
                  <Roll delay={450}>{count(signups)}</Roll>
                </span>
                <span className="ic-num">
                  <Roll delay={650}>{eur(spend / signups, 2)}</Roll>
                </span>
              </div>
            </div>
          </Window>
        );
      }}
    </Stage>
  );
}
