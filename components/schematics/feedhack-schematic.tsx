import { Badge } from "@/components/ui/badge";

const NODES = [
  { n: "01", label: "submitted", state: "is-done" },
  { n: "02", label: "validated", state: "is-done" },
  { n: "03", label: "ranked", state: "is-now" },
  { n: "04", label: "paid", state: "" },
] as const;

export function FeedhackSchematic() {
  return (
    <div className="card-visual" aria-hidden="true">
      <div className="vis-frame">
        <div className="vis-bar">
          <span>#clip-submissions</span>
          <span className="vis-live"><i />listening</span>
        </div>
        <div className="vis-flow">
          {NODES.map((node) => (
            <div key={node.n} className={`vis-node ${node.state}`.trim()}>
              <em>{node.n}</em>
              {node.label}
            </div>
          ))}
          <span className="vis-runner" />
        </div>
        <div className="vis-ledger">
          <div className="vis-tr"><span>clip_7f21</span><span>#1</span><span>$140.00</span><span className="vis-ok">paid</span></div>
          <div className="vis-tr"><span>clip_7f1e</span><span>#2</span><span>$90.00</span><span className="vis-ok">paid</span></div>
          <div className="vis-tr is-hit"><span>clip_7f0c</span><span>#3</span><span>$60.00</span><Badge variant="tag">queued</Badge></div>
          <div className="vis-tr"><span>clip_7eff</span><span>#4</span><span>$40.00</span><span className="vis-ok">paid</span></div>
        </div>
      </div>
    </div>
  );
}
