import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {items.map((item, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`} 
          className="border border-border rounded-lg px-6 data-[state=open]:bg-muted/30"
        >
          <AccordionTrigger 
            className="text-left hover:no-underline hover:text-primary transition-colors py-6 font-semibold"
            data-testid={`faq-question-${index}`}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent 
            className="text-muted-foreground leading-relaxed pb-6"
            data-testid={`faq-answer-${index}`}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
