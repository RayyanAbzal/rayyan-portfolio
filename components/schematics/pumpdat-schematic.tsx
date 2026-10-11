const CURVE = "M0 112 C 80 110, 160 100, 220 70 S 290 22, 320 8";

export function PumpdatSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>$PDAT · bonding curve</span>
          <span className="vis-live"><i />live feed</span>
        </div>
        <div className="vis-chart">
          <svg viewBox="0 0 320 120" preserveAspectRatio="none">
            <path className="vis-area" d={`${CURVE} L320 120 L0 120 Z`} />
            <path className="vis-line" d={CURVE} />
            <line className="vis-grid" x1="0" y1="90" x2="320" y2="90" />
            <line className="vis-grid" x1="0" y1="60" x2="320" y2="60" />
            <line className="vis-grid" x1="0" y1="30" x2="320" y2="30" />
          </svg>
          <span className="vis-marker"><i />graduates at 85 SOL</span>
        </div>
        <div className="vis-ledger">
          <div className="vis-tr"><span className="vis-ok">buy</span><span>3xKq…9f</span><span>2.40 SOL</span><span>just now</span></div>
          <div className="vis-tr"><span className="vis-ok">buy</span><span>7Rtm…c2</span><span>0.85 SOL</span><span>4s</span></div>
          <div className="vis-tr"><span className="vis-warn">sell</span><span>Bn2a…71</span><span>1.10 SOL</span><span>11s</span></div>
        </div>
      </div>
    </div>
  );
}
