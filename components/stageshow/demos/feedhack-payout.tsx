"use client";

import { Avatar, Bar, Check, Connector, Count, Icon, Roll, Stage, Swap, type Act } from "../kit";
import "../look.css";
import "./feedhack-payout.css";

// FeedHack, as a system story with no cursor (after the payout-flow gold).
// The campaign pool counts in, submitted clips stagger under it, the top clip
// is verified, its payout card arrives beside it, a line ties the two, the
// payout sends on its own and the row settles to Paid. Synthetic data only.

interface S {
  step: number;
  sent: boolean;
}
const START: S = { step: 0, sent: false };

const ROWS = [
  { name: "Mira", views: "48.2k", w: 54 },
  { name: "Jonah", views: "31.9k", w: 46 },
  { name: "Tess", views: "22.4k", w: 60 },
  { name: "Ravi", views: "17.0k", w: 40 },
];

const script = async (a: Act<S>) => {
  await a.wait(300);
  a.mark("reveal");
  a.put({ step: 1 });
  await a.wait(700);
  a.put({ step: 2 });
  await a.wait(1500);
  a.mark("move");
  a.put({ step: 3 });
  await a.wait(1300);
  a.put({ step: 4 });
  await a.wait(1100);
  a.mark("send");
  a.put({ step: 5 });
  await a.wait(1300);
  a.put({ sent: true });
  await a.wait(500);
  a.put({ step: 6 });
};

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function FeedhackPayout() {
  return (
    <Stage<S>
      width={640}
      height={400}
      compact={{ below: 600, width: 358, height: 610 }}
      initial={START}
      play="once"
      poster={{ step: 6, sent: true }}
      script={script}
      className="look-ra fh"
    >
      {(s, rect, layout) => {
        const compact = layout === "compact";
        const row = rect("row-0");
        const card = rect("payout");
        return (
          <>
            <section className="fh-pool" data-in={s.step >= 1 || undefined} data-aside={s.step >= 3 || undefined}>
              <span className="fh-muted">Campaign pool left</span>
              <Count className="fh-total" value={s.step >= 1 ? 4210.5 : 0} duration={1400} format={money} />
              <Bar w={120} h={5} tone={2} />
              <div className="fh-head">
                <span className="fh-strong">Clips this week</span>
                <span className="fh-muted">Views</span>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.name}
                  className="fh-row"
                  data-target={`row-${i}`}
                  data-in={s.step >= 2 || undefined}
                  style={{ transitionDelay: s.step >= 2 ? `${i * 90}ms` : "0ms" }}
                >
                  <Avatar {...(i === 0 ? { name: r.name } : { plain: true })} size={22} />
                  <Bar w={r.w} h={5} tone={3} />
                  <span className="fh-views">{r.views}</span>
                  <span className="fh-paid" data-pending={(i === 0 && !s.sent) || undefined}>
                    {i === 0 ? <Roll variant="fade">{s.sent ? "Paid" : "Verified"}</Roll> : "Paid"}
                  </span>
                </div>
              ))}
            </section>

            <section className="fh-payout" data-target="payout" data-in={s.step >= 3 || undefined}>
              <div className="fh-payout__head" style={{ ["--i" as string]: 0 }}>
                <span className="fh-payout__mark">
                  <Icon name="bolt" size={14} filled />
                </span>
                <span className="fh-strong">Automatic payout</span>
              </div>
              <div className="fh-payout__amount" style={{ ["--i" as string]: 1 }}>$241.00</div>
              <div className="fh-fields" style={{ ["--i" as string]: 2 }}>
                <div className="fh-field">
                  <span className="fh-muted">Views checked</span>
                  <span>48,210</span>
                </div>
                <div className="fh-field">
                  <span className="fh-muted">Rate</span>
                  <span>$5 per 1k</span>
                </div>
              </div>
              <div className="fh-button" style={{ ["--i" as string]: 3 }} data-sent={s.sent || undefined}>
                <span className="fh-state" data-on={s.step < 5 || undefined}>
                  Queued
                </span>
                <span className="fh-state" data-on={s.step >= 5 || undefined}>
                  <Check on={s.sent} pending={!s.sent} size={14} />
                  <Swap id={s.sent ? "sent" : "sending"}>{s.sent ? "Paid to Mira" : "Sending"}</Swap>
                </span>
              </div>
            </section>

            {row.width > 0 && card.width > 0 && (
              <Connector
                show={s.step >= 4}
                from={{ x: compact ? row.x - 6 : row.x + row.width + 6, y: row.y + row.height / 2 }}
                to={{ x: card.x, y: compact ? card.y + 24 : row.y + row.height / 2 }}
                route={compact ? "v" : "straight"}
              />
            )}

            <div className="fh-note" data-in={s.step >= 6 || undefined} style={{ left: card.x, top: card.y + card.height + 16 }}>
              Paid automatically once views were checked
            </div>
          </>
        );
      }}
    </Stage>
  );
}
