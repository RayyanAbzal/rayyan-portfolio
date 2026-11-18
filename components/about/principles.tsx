import { LitText, RisePanel } from "@/components/rise-panel";
import { ABOUT, PRINCIPLES } from "@/content/about";

/** The page's one dark surface: four principles as hairline rows. */
export function AboutPrinciples() {
  return (
    <section className="wrap" aria-labelledby="principles-heading">
      <RisePanel className="principles-panel">
        <h2 id="principles-heading" className="display">{ABOUT.principlesHeading}</h2>
        <p className="principles-intro"><LitText text={ABOUT.principlesIntro} /></p>
        <div className="principles-rows">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="principle-row">
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </div>
          ))}
        </div>
      </RisePanel>
    </section>
  );
}
