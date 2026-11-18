"use client";

import { ArrowUp, CalendarDays, Camera, CloudRain, Plus } from "lucide-react";
import { Bar, Bubble, Collapse, Icon, Phone, Stage, Stream, Thread, type Act } from "../kit";
import "../look.css";
import "./aria-chat.css";

// ARIA, a stylist on a phone (after the phone-touch, messages and ai-chat
// golds). An outfit photo is attached and sent with a question, Thinking, the
// answer streams in with specific advice from the occasion and the weather,
// then the context it used lands as chips and two suggested swaps land as a
// small card on the phone's edge. The photo is CSS-drawn, never an image.

const Q = "Does this work for dinner tonight?";
const A =
  "Close. The navy blazer and grey trousers suit a work dinner. It is 9°C and raining by seven, so wear the leather boots, not the suede loafers. A plain white shirt under the blazer will look sharper than the graphic tee.";
const WORDS = A.split(" ").length;

interface S {
  attached: boolean;
  draft: string;
  sent: boolean;
  phase: "idle" | "thinking" | "answer";
  words: number;
  chips: boolean;
  swaps: boolean;
}

const START: S = { attached: false, draft: "", sent: false, phase: "idle", words: 0, chips: false, swaps: false };
const POSTER: S = { attached: false, draft: "", sent: true, phase: "answer", words: WORDS, chips: true, swaps: true };

const script = async (a: Act<S>) => {
  await a.wait(900);
  a.mark("attach");
  await a.move({ at: "attach", x: 0.5, y: 0.5 });
  await a.click();
  a.put({ attached: true });
  await a.wait(600);
  a.mark("ask");
  await a.type("draft", Q, { interval: 44 });
  await a.wait(350);
  a.mark("send");
  await a.click({ at: "send", x: 0.5, y: 0.5 });
  a.put({ sent: true, draft: "", attached: false });
  await a.wait(500);
  a.put({ phase: "thinking" });
  await a.wait(1200);
  a.mark("answer");
  a.put({ phase: "answer" });
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(48);
  }
  await a.wait(400);
  a.mark("context");
  a.put({ chips: true });
  await a.wait(900);
  a.put({ swaps: true });
  await a.wait(3200);
};

// An outfit drawn from boxes: tee, blazer, trousers, loafers
function Photo({ small }: { small?: boolean }) {
  return (
    <span className="ar-photo" data-small={small || undefined} aria-hidden="true">
      <span className="ar-photo__head" />
      <span className="ar-photo__sleeve ar-photo__sleeve--l" />
      <span className="ar-photo__sleeve ar-photo__sleeve--r" />
      <span className="ar-photo__tee">
        <span className="ar-photo__print" />
      </span>
      <span className="ar-photo__blazer ar-photo__blazer--l" />
      <span className="ar-photo__blazer ar-photo__blazer--r" />
      <span className="ar-photo__leg ar-photo__leg--l" />
      <span className="ar-photo__leg ar-photo__leg--r" />
      <span className="ar-photo__shoe ar-photo__shoe--l" />
      <span className="ar-photo__shoe ar-photo__shoe--r" />
    </span>
  );
}

export default function AriaChat() {
  return (
    <Stage<S>
      width={760}
      height={560}
      compact={{ below: 600, width: 358, height: 560 }}
      initial={START}
      poster={POSTER}
      script={script}
      play="once"
      cursor={{ at: "compose", style: "touch" }}
      className="look-ra ar"
    >
      {(s, _rect, layout) => {
        const compact = layout === "compact";
        return (
          <>
            <Phone width={326} className="ar-phone">
              <div className="ar-head">
                <span className="ar-head__title">ARIA</span>
                <span className="ar-head__sub">Your stylist</span>
              </div>
              <Thread app="chat" className="ar-thread">
                <div className="ar-past" aria-hidden="true">
                  <Bar w={150} h={34} r={17} tone={1} className="ar-past__q" />
                  <Bar w="90%" h={8} r={4} tone={2} />
                  <Bar w="64%" h={8} r={4} tone={2} />
                </div>
                {s.sent && (
                  <Bubble from="me">
                    <span className="ar-ask">
                      <Photo />
                      <span>{Q}</span>
                    </span>
                  </Bubble>
                )}
                {s.phase !== "idle" && (
                  <Bubble from="them">
                    <Collapse open={s.phase === "thinking"}>
                      <span className="ar-thinking">Thinking</span>
                    </Collapse>
                    <Collapse open={s.phase === "answer"}>
                      <Stream className="ar-answer" text={A} count={s.words} />
                      <Collapse open={s.chips} reveal="drop">
                        <span className="ar-chips">
                          <span className="ar-chip">
                            <Camera size={13} strokeWidth={1.75} />
                            Photo
                          </span>
                          <span className="ar-chip">
                            <CloudRain size={13} strokeWidth={1.75} />
                            9°C, rain
                          </span>
                          <span className="ar-chip">
                            <CalendarDays size={13} strokeWidth={1.75} />
                            Work dinner
                          </span>
                        </span>
                      </Collapse>
                    </Collapse>
                  </Bubble>
                )}
              </Thread>
              <div className="ar-compose">
                <span className="ar-plus" data-target="attach" aria-hidden="true">
                  <Plus size={16} strokeWidth={2} />
                </span>
                <span className="ar-field" data-target="compose">
                  <Collapse open={s.attached} reveal="drop">
                    <span className="ar-attached">
                      <Photo small />
                    </span>
                  </Collapse>
                  <span className="ar-field__text">{s.draft}</span>
                  {!s.draft && <span className="ar-field__ph">Ask ARIA</span>}
                  <span className="ar-send" data-target="send" data-show={s.draft ? "" : undefined}>
                    <ArrowUp size={16} strokeWidth={2.5} />
                  </span>
                </span>
              </div>
            </Phone>

            {!compact && (
              <div className="ar-swaps">
                <Collapse open={s.swaps} reveal="drop" from="below">
                  <div className="ar-swaps__card">
                    <span className="ar-swaps__title">Two swaps</span>
                    <div className="ar-swap">
                      <span className="ar-swap__art ar-swap__art--boot" aria-hidden="true" />
                      <span className="ar-swap__text">
                        <span className="ar-swap__name">Leather boots</span>
                        <span className="ar-swap__sub">Instead of suede loafers</span>
                      </span>
                    </div>
                    <div className="ar-swap">
                      <span className="ar-swap__art ar-swap__art--shirt" aria-hidden="true">
                        <Icon name="check" size={13} filled />
                      </span>
                      <span className="ar-swap__text">
                        <span className="ar-swap__name">White shirt</span>
                        <span className="ar-swap__sub">Instead of graphic tee</span>
                      </span>
                    </div>
                  </div>
                </Collapse>
              </div>
            )}
          </>
        );
      }}
    </Stage>
  );
}
