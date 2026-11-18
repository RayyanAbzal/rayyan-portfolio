"use client";

import { ArrowUp, Hash, Search } from "lucide-react";
import {
  Avatar,
  Badge,
  Bar,
  Card,
  Check,
  Collapse,
  Count,
  Divider,
  Field,
  Icon,
  Row,
  Stage,
  Tabs,
  Window,
  type Act,
} from "../kit";
import "../look.css";
import "./feedhack-payout.css";

// FeedHack, as a chat-app thread with its dashboard behind it (after the slack
// gold for the thread, the overlap gold for the satellite). A creator runs
// /submit with a clip in #submissions, the bot checks it in three steps and
// approves it, and the dashboard's monthly total and clip count move. The
// earlier rejected clip is already in the thread, so validation reads as real.
// Generic chat chrome, no real chat-app marks. Synthetic data only.

interface S {
  focus: boolean;
  typed: string;
  attached: boolean;
  sent: boolean;
  bot: boolean;
  checks: number;
  result: boolean;
  dash: boolean;
}

const START: S = { focus: false, typed: "", attached: false, sent: false, bot: false, checks: 0, result: false, dash: false };
const POSTER: S = { focus: false, typed: "", attached: false, sent: true, bot: true, checks: 3, result: true, dash: true };

const COMMAND = "/submit clip_id: 1204";
const CHECKS = ["Format MP4", "Duration 0:52", "Brand check"];
const REST = { x: 540, y: 420 };

const script = async (a: Act<S>) => {
  await a.wait(900);
  a.mark("compose");
  await a.move({ at: "composer", x: 0.4, y: 0.5 });
  await a.click();
  a.put({ focus: true });
  await a.wait(350);
  await a.type("typed", COMMAND, { interval: 42 });
  await a.wait(250);
  a.put({ attached: true });
  await a.wait(750);
  a.mark("send");
  await a.click({ at: "send", x: 0.5, y: 0.5 });
  a.put({ sent: true, typed: "", attached: false, focus: false });
  await a.move(REST, { duration: 700 });
  await a.wait(500);
  a.mark("bot");
  a.put({ bot: true });
  await a.wait(700);
  for (let i = 1; i <= 3; i++) {
    a.put({ checks: i });
    await a.wait(700);
  }
  a.mark("approved");
  a.put({ result: true });
  await a.wait(1100);
  a.mark("dashboard");
  a.put({ dash: true });
  await a.wait(3000);
};

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (n: number) => n.toLocaleString("en-US");

function Older({ name, lines }: { name: number; lines: number[] }) {
  return (
    <div className="fh-msg fh-msg--older">
      <Avatar plain size={30} />
      <div className="fh-msg__body">
        <Bar w={name} h={7} tone={3} />
        {lines.map((w, i) => (
          <Bar key={i} w={w} h={6} tone={2} />
        ))}
      </div>
    </div>
  );
}

function BotFace() {
  return (
    <span className="fh-bot">
      <Icon name="bolt" size={14} filled />
    </span>
  );
}

function Clip({ file, length }: { file: string; length: string }) {
  return (
    <div className="fh-clip">
      <span className="fh-clip__thumb" aria-hidden="true">
        <Icon name="play" size={12} filled />
      </span>
      <span className="fh-clip__text">
        <span className="fh-clip__name">{file}</span>
        <span className="fh-clip__len">{length}</span>
      </span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fh-side">
      <Bar w={64} h={8} tone={4} />
      <div className="fh-side__list">
        {[44, 58].map((w, i) => (
          <div key={i} className="fh-side__row">
            <Hash size={13} strokeWidth={1.75} />
            <Bar w={w} h={6} tone={2} />
          </div>
        ))}
        <div className="fh-side__row" data-active="">
          <Hash size={13} strokeWidth={1.75} />
          <span>submissions</span>
        </div>
        {[50, 40].map((w, i) => (
          <div key={i} className="fh-side__row">
            <Hash size={13} strokeWidth={1.75} />
            <Bar w={w} h={6} tone={2} />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function FeedhackPayout() {
  return (
    <Stage<S>
      width={760}
      height={512}
      compact={{ below: 600, width: 358, height: 560 }}
      initial={START}
      play="once"
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="look-ra fh"
    >
      {(s, _rect, layout) => {
        const compact = layout === "compact";
        const done = s.checks >= 3;
        return (
          <>
            <Window
              className="fh-win"
              title="# submissions"
              sidebar={compact ? undefined : <Sidebar />}
              sidebarWidth={124}
              toolbar={
                compact ? undefined : (
                  <span className="fh-tools">
                    <Search size={14} strokeWidth={1.75} />
                  </span>
                )
              }
            >
              <div className="fh-chan">
                <div className="fh-feed">
                  {!compact && (
                    <>
                      <Older name={64} lines={[190]} />
                      <div className="fh-msg">
                        <Avatar name="Tess" size={30} />
                        <div className="fh-msg__body">
                          <div className="fh-msg__meta">
                            <span className="fh-msg__name">Tess</span>
                            <span className="fh-msg__time">9:12 AM</span>
                          </div>
                          <div className="fh-line">
                            <span className="fh-cmd">/submit</span> clip_id: 1203
                          </div>
                        </div>
                      </div>
                      <div className="fh-msg">
                        <BotFace />
                        <div className="fh-msg__body">
                          <div className="fh-msg__meta">
                            <span className="fh-msg__name">FeedHack Bot</span>
                            <span className="fh-app">App</span>
                            <span className="fh-msg__time">9:12 AM</span>
                          </div>
                          <div className="fh-line fh-line--fail">
                            <Badge tone="danger">Rejected</Badge>
                            <span>Brand check failed: overlay missing</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Collapse open={s.sent} reveal="drop" from="below">
                    <div className="fh-msg">
                      <Avatar name="Mira" size={30} />
                      <div className="fh-msg__body">
                        <div className="fh-msg__meta">
                          <span className="fh-msg__name">Mira</span>
                          <span className="fh-msg__time">9:41 AM</span>
                        </div>
                        <div className="fh-line">
                          <span className="fh-cmd">/submit</span> clip_id: 1204
                        </div>
                        <Clip file="clip_1204.mp4" length="0:52" />
                      </div>
                    </div>
                  </Collapse>

                  <Collapse open={s.bot} reveal="drop" from="below">
                    <div className="fh-msg">
                      <BotFace />
                      <div className="fh-msg__body">
                        <div className="fh-msg__meta">
                          <span className="fh-msg__name">FeedHack Bot</span>
                          <span className="fh-app">App</span>
                          <span className="fh-msg__time">9:41 AM</span>
                        </div>
                        <div className="fh-checks">
                          {CHECKS.map((label, i) => (
                            <span key={label} className="fh-check" data-done={s.checks > i || undefined}>
                              <Check on={s.checks > i} pending={s.checks === i} size={14} />
                              {label}
                            </span>
                          ))}
                        </div>
                        <Collapse open={s.result} reveal="drop">
                          <div className="fh-result" data-ok={done || undefined}>
                            <span className="fh-result__title">
                              <Icon name="check" size={14} filled />
                              Approved
                            </span>
                            <span>Tier 2, $24.00 added to this month&rsquo;s payout</span>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className="fh-composer">
                  <Field
                    value={s.typed}
                    placeholder="Message #submissions"
                    focused={s.focus}
                    box={{ "data-target": "composer" }}
                    trailing={
                      <>
                        <Collapse open={s.attached} reveal="drop">
                          <span className="fh-attach">
                            <Icon name="file" size={13} />
                            clip_1204.mp4
                          </span>
                        </Collapse>
                        <span data-target="send" className="fh-send" data-ready={s.typed.length > 0 || undefined}>
                          <ArrowUp size={14} strokeWidth={2.5} />
                        </span>
                      </>
                    }
                  />
                </div>
              </div>
            </Window>

            <Card pad="large" gap={14} lift className="fh-dash">
              <Tabs items={["Campaigns", "Creators", "Payouts"]} value={2} />
              <div className="fh-dash__total">
                <span className="fh-dash__label">This month&rsquo;s payouts</span>
                <Count className="fh-dash__figure" value={s.dash ? 2442 : 2418} duration={1100} format={money} />
              </div>
              <div className="fh-dash__stats">
                <div>
                  <span className="fh-dash__label">Clips processed</span>
                  <Count className="fh-dash__stat" value={s.dash ? 1204 : 1203} duration={800} format={whole} />
                </div>
                <div>
                  <span className="fh-dash__label">Payout batch</span>
                  <span className="fh-dash__stat">Nov 30</span>
                </div>
              </div>
              <Divider />
              <div className="fh-dash__list">
                <Collapse open={s.dash} reveal="drop">
                  <Row pad={0} className="fh-dash__row" lead={<Avatar name="Mira" size={22} />} title={<span>Mira</span>} subtitle={<span className="fh-dash__sub">Tier 2</span>}>
                    <span className="fh-dash__amount">$24.00</span>
                  </Row>
                </Collapse>
                <Row pad={0} className="fh-dash__row" lead={<Avatar name="Jonah" size={22} />} title={<span>Jonah</span>} subtitle={<span className="fh-dash__sub">Tier 3</span>}>
                  <span className="fh-dash__amount">$38.00</span>
                </Row>
              </div>
            </Card>
          </>
        );
      }}
    </Stage>
  );
}
