// Logo candidates. TEMPORARY: all three render and html[data-logo] picks one (LogoPicker).
// Once Ray picks, keep that one and delete the others with the picker.

/** Plate stack: an R made of three thin stacked plates, drawn like the harness drawing. */
function PlatesMark() {
  return (
    <svg className="logo-plates" viewBox="0 0 28 28" aria-hidden="true">
      <g className="lp lp-3"><path d="M4 21 14 26 24 21 14 16Z" /></g>
      <g className="lp lp-2"><path d="M4 14.5 14 19.5 24 14.5 14 9.5Z" /></g>
      <g className="lp lp-1"><path d="M4 8 14 13 24 8 14 3Z" /></g>
    </svg>
  );
}

/** Rising dot: the live dot as a small rounded tile that lifts off its shadow plate on hover. */
function RisingMark() {
  return (
    <span className="logo-rising" aria-hidden="true">
      <span className="lr-plate" />
      <span className="lr-tile" />
    </span>
  );
}

/** Monogram tile: R plus the green live dot, an evolution of the existing mark. */
function MonogramMark() {
  return (
    <span className="logo-mono" aria-hidden="true">
      R<span className="lm-dot" />
    </span>
  );
}

export function LogoMark() {
  return (
    <span className="logo">
      <span className="logo-opt" data-logo-opt="plates"><PlatesMark /></span>
      <span className="logo-opt" data-logo-opt="rising"><RisingMark /></span>
      <span className="logo-opt" data-logo-opt="mono"><MonogramMark /></span>
    </span>
  );
}
