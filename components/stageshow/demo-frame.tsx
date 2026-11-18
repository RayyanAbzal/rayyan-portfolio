"use client";

import { useState, type ReactNode } from "react";

interface DemoFrameProps {
  children: ReactNode;
}

// Replay remounts the stage, so a play-once demo runs again from its start.
export function DemoFrame({ children }: DemoFrameProps) {
  const [run, setRun] = useState(0);
  return (
    <div className="ssg-frame">
      <div key={run}>{children}</div>
      <button type="button" className="ssg-replay" onClick={() => setRun((n) => n + 1)}>
        Replay
      </button>
      <p className="ssg-still">
        Your system has Reduce motion on, so this shows the last frame. Turn it off to watch it play.
      </p>
    </div>
  );
}
