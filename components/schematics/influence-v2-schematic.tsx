import { Badge } from "@/components/ui/badge";
import { barWidth } from "./util";

interface PartnerRow {
  name: string;
  percent: number;
  progress: string;
  calc: { label: string; value: string } | { done: string };
  hit?: boolean;
}

const ROWS: readonly PartnerRow[] = [
  { name: "partner_a", percent: 78, progress: "31 / 40 ftd", calc: { label: "cpa", value: "$62" } },
  { name: "partner_b", percent: 100, progress: "25 / 25 ftd", calc: { done: "target hit" }, hit: true },
  { name: "partner_c", percent: 35, progress: "7 / 20 ftd", calc: { label: "cpa", value: "$118" } },
  { name: "partner_d", percent: 55, progress: "11 / 20 ftd", calc: { label: "flat", value: "$1.2k" } },
];

export function InfluenceV2Schematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>current roster · march</span>
          <Badge variant="outline">↑ kpi.csv</Badge>
        </div>
        <div className="vis-roster-list">
          {ROWS.map((row) => (
            <div key={row.name} className={row.hit ? "vis-row is-hit" : "vis-row"}>
              <span className="vis-name">{row.name}</span>
              <span className="vis-prog"><b style={barWidth(row.percent)} /><em>{row.progress}</em></span>
              {"done" in row.calc ? (
                <span className="vis-calc vis-ok">{row.calc.done}</span>
              ) : (
                <span className="vis-calc">{row.calc.label} <b>{row.calc.value}</b></span>
              )}
            </div>
          ))}
        </div>
        <div className="vis-toast">3 partners behind pace → reminder queued</div>
      </div>
    </div>
  );
}
