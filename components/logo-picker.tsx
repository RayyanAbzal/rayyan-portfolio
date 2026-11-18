"use client";

// TEMPORARY: logo picker. Sets html[data-logo] from ?__logo= (keys 1 to 3). Delete after Ray picks.
import { useEffect, useState } from "react";

const OPTIONS = [
  { id: "plates", label: "Plate stack" },
  { id: "rising", label: "Rising tile" },
  { id: "mono", label: "Monogram R" },
] as const;

type LogoId = (typeof OPTIONS)[number]["id"];

function isLogo(value: string | null): value is LogoId {
  return OPTIONS.some((o) => o.id === value);
}

function apply(id: LogoId): void {
  const url = new URL(window.location.href);
  url.searchParams.set("__logo", id);
  window.history.replaceState(window.history.state, "", url);
  document.documentElement.dataset.logo = id;
}

export function LogoPicker() {
  const [current, setCurrent] = useState<LogoId>("plates");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("__logo");
    const id = isLogo(raw) ? raw : "plates";
    document.documentElement.dataset.logo = id;
    // Temporary harness: sync once from the URL after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(id);
    function onKey(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      const option = OPTIONS[Number(event.key) - 1];
      if (!option) return;
      apply(option.id);
      setCurrent(option.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav aria-label="Logo picker" className="vp">
      <p>Logo</p>
      <ul>
        {OPTIONS.map((o, i) => (
          <li key={o.id}>
            <button
              type="button"
              aria-pressed={current === o.id}
              onClick={() => {
                apply(o.id);
                setCurrent(o.id);
              }}
            >
              <kbd>{i + 1}</kbd> {o.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
