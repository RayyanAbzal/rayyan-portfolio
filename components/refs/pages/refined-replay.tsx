"use client";

import { useState, type ReactNode } from "react";

/** Remounts the demo so a play-once demo runs again from its start. */
export function ReplayFrame({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <div className="rf-replay">
      <div key={run}>{children}</div>
      <button type="button" className="rf-replay-btn" onClick={() => setRun((n) => n + 1)}>
        Replay
      </button>
    </div>
  );
}
