import { Badge } from "@/components/ui/badge";
import { barWidth } from "./util";

interface CreatorRow {
  handle: string;
  reach: string;
  value: number;
  campaign: string | null;
  hit?: boolean;
}

const ROWS: readonly CreatorRow[] = [
  { handle: "@ridge.motion", reach: "412k", value: 82, campaign: "spring drop" },
  { handle: "@saltline", reach: "198k", value: 64, campaign: null, hit: true },
  { handle: "@kea.studio", reach: "96k", value: 41, campaign: "launch" },
  { handle: "@northloop", reach: "73k", value: 30, campaign: "–" },
  { handle: "@drift.co", reach: "51k", value: 22, campaign: "–" },
];

export function InfluenceSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>creators · 1,284</span>
          <span className="vis-live"><i />synced</span>
        </div>
        <div className="vis-table">
          <div className="vis-tr vis-th">
            <span>creator</span>
            <span>reach</span>
            <span>est. value</span>
            <span>campaign</span>
          </div>
          {ROWS.map((row) => (
            <div key={row.handle} className={row.hit ? "vis-tr is-hit" : "vis-tr"}>
              <span>{row.handle}</span>
              <span>{row.reach}</span>
              <span><b style={barWidth(row.value)} /></span>
              {row.campaign === null ? (
                <Badge variant="tag">matched</Badge>
              ) : (
                <span>{row.campaign}</span>
              )}
            </div>
          ))}
        </div>
        <div className="vis-toast">reminder sent → telegram</div>
      </div>
    </div>
  );
}
