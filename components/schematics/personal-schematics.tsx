import { Badge } from "@/components/ui/badge";
import { barWidth } from "./util";

export function FiosSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>fios · enrich</span>
          <span className="vis-live"><i />200 ok</span>
        </div>
        <div className="vis-kv">
          <div className="vis-kv-row"><span>name</span><span>Bleu de Chanel</span></div>
          <div className="vis-kv-row"><span>notes</span><span>grapefruit, cedar, incense</span></div>
          <div className="vis-kv-row">
            <span>accords</span>
            <span className="vis-chips"><i>woody</i><i>citrus</i><i>aromatic</i></span>
          </div>
          <div className="vis-kv-row">
            <span>longevity</span>
            <span><b style={barWidth(72)} /> 7 to 9 h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AriaSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>aria · stylist</span>
          <span className="vis-live"><i />vision</span>
        </div>
        <div className="vis-chat">
          <div className="vis-msg me">Dinner tonight, 14°C, smart casual. This outfit?</div>
          <div className="vis-msg">
            <Badge variant="tag">photo read</Badge> Navy overshirt works. Swap the sneakers for loafers and it reads dinner, not errands.
          </div>
        </div>
      </div>
    </div>
  );
}

interface JobRow {
  role: string;
  match: number;
  status: string | null;
  hit?: boolean;
}

const JOB_ROWS: readonly JobRow[] = [
  { role: "Graduate Engineer", match: 91, status: null, hit: true },
  { role: "Junior Developer", match: 78, status: "queued" },
  { role: "Data Analyst", match: 44, status: "–" },
  { role: "Senior Engineer", match: 12, status: "filtered" },
];

export function JobFinderSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>jobs · graduate, auckland</span>
          <span className="vis-live"><i />3 boards</span>
        </div>
        <div className="vis-table vis-table-3">
          <div className="vis-tr vis-th"><span>role</span><span>match</span><span>status</span></div>
          {JOB_ROWS.map((row) => (
            <div key={row.role} className={row.hit ? "vis-tr is-hit" : "vis-tr"}>
              <span>{row.role}</span>
              <span><b style={barWidth(row.match)} /></span>
              {row.status === null ? <Badge variant="tag">drafted</Badge> : <span>{row.status}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
