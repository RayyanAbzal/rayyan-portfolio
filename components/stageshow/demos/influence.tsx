"use client";

import { FileText } from "lucide-react";
import { Avatar, Badge, Button, Collapse, Count, Icon, Roll, Stage, Window, type Act } from "../kit";
import "../look.css";
import "./influence.css";

// Influence (v1): the creator pipeline in an agency CRM (after the upload gold
// for the arriving file and the overlap gold for the satellite). The team
// imports a creator export, three new creators open into the table with their
// value scores counting up, the best one is matched to a campaign and moves
// into outreach, and its Telegram follow-up reminder lands last. Handles,
// campaigns and numbers are made up. No chat-app marks.

interface S {
  imported: boolean;
  rows: number;
  match: boolean;
  outreach: boolean;
  chip: boolean;
}

const START: S = { imported: false, rows: 0, match: false, outreach: false, chip: false };
const POSTER: S = { imported: true, rows: 3, match: true, outreach: true, chip: true };

type Tone = "neutral" | "warning" | "success";

interface Creator {
  handle: string;
  platform: string;
  eng: string;
  score: number;
  campaign: string;
  stage: string;
  tone: Tone;
  fresh?: number;
}

// Sorted by value score; the imported creators carry the order they open in.
const CREATORS: Creator[] = [
  { handle: "@mara.cooks", platform: "IG", eng: "5.4%", score: 9.4, campaign: "Summer launch", stage: "Scouted", tone: "neutral", fresh: 1 },
  { handle: "@ines.travel", platform: "IG", eng: "4.2%", score: 9.1, campaign: "Summer launch", stage: "Deal closed", tone: "success" },
  { handle: "@sam.lifts", platform: "IG", eng: "6.8%", score: 8.4, campaign: "Autumn drop", stage: "In outreach", tone: "warning" },
  { handle: "@tomas.runs", platform: "YT", eng: "3.1%", score: 7.9, campaign: "Autumn drop", stage: "Scouted", tone: "neutral", fresh: 2 },
  { handle: "@nik.reviews", platform: "YT", eng: "2.9%", score: 7.6, campaign: "Autumn drop", stage: "In outreach", tone: "warning" },
  { handle: "@leila.studio", platform: "TT", eng: "7.2%", score: 7.4, campaign: "Summer launch", stage: "Scouted", tone: "neutral", fresh: 3 },
  { handle: "@ola.makes", platform: "TT", eng: "5.9%", score: 6.8, campaign: "Autumn drop", stage: "Scouted", tone: "neutral" },
];

const score = (n: number) => n.toFixed(1);

const script = async (a: Act<S>) => {
  await a.wait(900);
  a.mark("import");
  await a.move({ at: "import", x: 0.5, y: 0.5 });
  await a.wait(250);
  await a.click();
  a.put({ imported: true });
  await a.wait(700);
  a.mark("rows");
  for (let r = 1; r <= 3; r++) {
    a.put({ rows: r });
    await a.wait(650);
  }
  await a.wait(500);
  a.mark("match");
  a.put({ match: true });
  await a.wait(1000);
  a.mark("outreach");
  a.put({ outreach: true });
  await a.wait(900);
  a.mark("reminder");
  a.put({ chip: true });
  await a.wait(3200);
};

function Pipeline({ s }: { s: S }) {
  return (
    <div className="in-table">
      <div className="in-tr in-tr--head">
        <span>Creator</span>
        <span className="in-num in-opt">Eng. rate</span>
        <span className="in-num">Score</span>
        <span className="in-opt">Campaign</span>
        <span>Stage</span>
      </div>
      {CREATORS.map((c) => {
        const open = !c.fresh || s.rows >= c.fresh;
        const lead = c.fresh === 1;
        const matched = !c.fresh || (lead ? s.match : s.rows >= c.fresh);
        const outreach = lead && s.outreach;
        const stage = outreach ? "In outreach" : c.stage;
        const tone: Tone = outreach ? "warning" : c.tone;
        const row = (
          <div className="in-tr" data-lead={(lead && s.match) || undefined}>
            <span className="in-who">
              <Avatar name={c.handle.slice(1)} size={22} />
              <span className="in-handle">{c.handle}</span>
              <span className="in-plat">{c.platform}</span>
            </span>
            <span className="in-num in-opt">{c.eng}</span>
            <span className="in-num">
              <Count value={open ? c.score : 0} duration={900} format={score} />
            </span>
            <span className="in-opt in-camp">
              <Roll>{matched ? c.campaign : "Matching"}</Roll>
            </span>
            <span>
              <Badge tone={tone} dot>
                <Roll variant="fade">{stage}</Roll>
              </Badge>
            </span>
          </div>
        );
        return c.fresh ? (
          <Collapse key={c.handle} open={open} reveal="drop">
            {row}
          </Collapse>
        ) : (
          <div key={c.handle}>{row}</div>
        );
      })}
    </div>
  );
}

export default function Influence() {
  return (
    <Stage<S>
      width={760}
      height={456}
      compact={{ below: 600, width: 358, height: 568 }}
      initial={START}
      poster={POSTER}
      script={script}
      play="once"
      cursor={{ at: { x: 470, y: 420 } }}
      className="look-ra in"
    >
      {(s) => {
        return (
          <>
            <Window
              className="in-win"
              title="Creator Pipeline"
              toolbar={
                <Button
                  size="small"
                  variant="secondary"
                  icon={<FileText size={13} strokeWidth={2} />}
                  data-target="import"
                >
                  {s.imported ? "3 imported" : "Import PDF"}
                </Button>
              }
            >
              <div className="in-main">
                <Pipeline s={s} />
              </div>
            </Window>

            <div className="in-card">
              <span className="in-card__label">Summer launch</span>
              <div className="in-card__read">
                <Count className="in-card__num" value={s.rows >= 1 ? 12 : 9} duration={800} />
                <span className="in-card__of">creators matched</span>
              </div>
              <Collapse open={s.chip} reveal="drop" from="below">
                <span className="in-remind">
                  <span className="in-remind__icon">
                    <Icon name="bell" size={14} filled />
                  </span>
                  <span className="in-remind__text">
                    <span className="in-remind__title">Telegram reminder</span>
                    <span className="in-remind__sub">@mara.cooks, Thu</span>
                  </span>
                </span>
              </Collapse>
            </div>
          </>
        );
      }}
    </Stage>
  );
}
