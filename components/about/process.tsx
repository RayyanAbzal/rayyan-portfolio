import { ABOUT, PROCESS_STEPS } from "@/content/about";

/** Process: one line with four stops (vertical on small screens). */
export function AboutProcess() {
  return (
    <section id="process" className="wrap">
      <div className="section-head">
        <h2 className="display">{ABOUT.processHeading}</h2>
        <p className="lede">{ABOUT.processLede}</p>
      </div>
      <ol className="process-line">
        {PROCESS_STEPS.map((step) => (
          <li key={step.title} className="process-stop">
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <span className="process-when">{step.when}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
