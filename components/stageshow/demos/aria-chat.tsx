"use client";

import {
  Bar,
  Collapse,
  Field,
  Stage,
  Stream,
  Text,
  Window,
  type Act,
} from "../kit";
import "../look.css";
import "./aria-chat.css";

// ARIA, after the ai-chat gold. An outfit photo goes up with a question, a
// short Thinking state, then specific feedback streams in, using the
// occasion and the weather; its context chips arrive last. The photo is a
// CSS-drawn stand-in, not a real image.

const Q = "Does this work for a work dinner tonight?";
const A =
  "Mostly, yes. The navy blazer and grey trousers suit a work dinner. It will be 9°C and raining by seven, so swap the suede loafers for the leather boots and bring the wool coat. A plain white shirt under the blazer will look sharper than the graphic tee.";
const WORDS = A.split(" ").length;

interface S {
  draft: string;
  sent: boolean;
  phase: "idle" | "thinking" | "answer";
  words: number;
  sources: boolean;
}

const initial: S = {
  draft: "",
  sent: false,
  phase: "idle",
  words: 0,
  sources: false,
};
const poster: S = {
  draft: "",
  sent: true,
  phase: "answer",
  words: WORDS,
  sources: true,
};

async function script(a: Act<S>) {
  await a.wait(700);
  a.mark("type");
  await a.type("draft", Q, { interval: 38 });
  await a.wait(400);
  a.mark("send");
  a.put({ sent: true, draft: "" });
  await a.wait(450);
  a.put({ phase: "thinking" });
  await a.wait(1100);
  a.mark("stream");
  a.put({ phase: "answer" });
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(40);
  }
  await a.wait(300);
  a.mark("sources");
  a.put({ sources: true });
  await a.wait(2600);
}

export default function AiChat() {
  return (
    <Stage<S>
      width={640}
      height={420}
      compact={{ below: 600, width: 358, height: 520 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      className="look-ra ac"
    >
      {(s) => (
        <Window title="ARIA" className="ac-win">
          <div className="ac-body">
            <div className="ac-thread">
              <div className="ac-turn ac-turn--past">
                <Bar w={180} h={30} r={15} tone={1} className="ac-past-q" />
                <Bar w="86%" h={8} r={4} tone={2} />
                <Bar w="62%" h={8} r={4} tone={2} />
              </div>
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="ac-q">
                  <span className="ac-photo" aria-hidden="true">
                    <span className="ac-photo__coat" />
                    <span className="ac-photo__legs" />
                    <span className="ac-photo__shoes" />
                  </span>
                  <Text>{Q}</Text>
                </div>
              </Collapse>
              {/* Thinking is one line; the answer opens to its own height as
                  Thinking closes, so the thread grows once, smoothly, and the
                  earlier turns move up with it. Before the send neither takes
                  any room */}
              <Collapse open={s.phase === "thinking"}>
                <Text className="ac-thinking">Thinking</Text>
              </Collapse>
              <Collapse open={s.phase === "answer"}>
                <div className="ac-a" data-on>
                  <Stream className="ac-stream" text={A} count={s.words} />
                  <div className="ac-sources" data-on={s.sources || undefined}>
                    <span className="ac-source">Your photo</span>
                    <span className="ac-source">Auckland, 9°C, rain</span>
                    <span className="ac-source">Dinner, smart casual</span>
                  </div>
                </div>
              </Collapse>
            </div>
            <Field
              className="ac-composer"
              value={s.draft}
              placeholder="Ask about an outfit"
              focused={!s.sent}
            />
          </div>
        </Window>
      )}
    </Stage>
  );
}
