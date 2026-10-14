import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ABOUT, FAQ_ITEMS } from "@/content/about";

/** Hairline FAQ: question left, answer right on desktop. First item open. */
export function AboutFaq() {
  return (
    <section id="faq" className="wrap has-rule">
      <h2 className="display about-section-title">{ABOUT.faqHeading}</h2>
      <Accordion type="single" collapsible defaultValue="faq-0" className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="a">
              <div className="faq-answer">{item.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
