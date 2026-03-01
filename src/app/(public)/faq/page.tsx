import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Beauty School Online, our courses, DofE alignment, and how everything works.",
};

const faqs = [
  {
    question: "What is the DofE Skills section?",
    answer:
      "The Duke of Edinburgh (DofE) Skills section requires participants to develop a practical skill over a set period of time. For Bronze, this is a minimum of 13 weeks; Silver requires 13 or 26 weeks; and Gold requires 26 or 52 weeks. Participants need to show regular commitment, progressive improvement, and have their activity assessed.",
  },
  {
    question: "How does Beauty School Online align with DofE?",
    answer:
      "Our courses are structured to match DofE Skills section requirements. Each course runs for the required number of weeks, involves regular weekly practice, demonstrates progressive skill development, and includes assessor feedback and a completion report. This structure is designed to provide everything you need for your DofE Skills section evidence.",
  },
  {
    question: "Are you an Approved Activity Provider (AAP)?",
    answer:
      "No, we are not currently an Approved Activity Provider. Our courses are independently designed to align with the DofE Skills section requirements. We always recommend checking with your DofE Leader to confirm that our courses are suitable for your specific programme before enrolling.",
  },
  {
    question: "How much time do I need per week?",
    answer:
      "Each week takes approximately 1 hour in total. This breaks down to around 15 minutes watching the video lesson, 30 minutes practising the technique, and 15 minutes uploading your evidence and writing a short reflection.",
  },
  {
    question: "What equipment or materials do I need?",
    answer:
      "Each week's lesson will list any materials needed. We keep requirements minimal and affordable, using products that are widely available. For most weeks, you'll need basic items like nail polish, simple makeup, or skincare products. We never require expensive professional-grade products.",
  },
  {
    question: "How does evidence submission work?",
    answer:
      "After completing each week's task, you upload your evidence through our learner portal. Evidence can include photos of your work, short videos showing technique, and written reflections on what you learned. Your assessor reviews your submission and provides personalised feedback.",
  },
  {
    question:
      "What's the difference between Bronze, Silver, and Gold courses?",
    answer:
      "Bronze courses cover foundational beauty skills over 13 weeks (or 26 with the extension). Silver courses build on these foundations with intermediate techniques over 13–26 weeks. Gold courses offer advanced skills over 26–52 weeks. Each level matches the corresponding DofE award's time requirements and increases in complexity.",
  },
  {
    question: "Who provides the assessor report?",
    answer:
      "Your assessor is a qualified beauty professional who reviews your weekly evidence submissions and provides feedback throughout your course. At the end, they produce a completion report summarising your progress, achievements, and skill development — which you can share with your DofE Leader.",
  },
  {
    question: "Can I start at any time?",
    answer:
      "Yes! Our courses are designed so you can begin whenever you're ready. Once enrolled, your weekly lessons unlock progressively as you complete each one, so you work at your own pace within the weekly structure.",
  },
  {
    question: "What if I need extra time on a week?",
    answer:
      "That's completely fine. While the course is structured around weekly lessons, we understand that life gets busy. If you need a bit more time to practise a technique or complete your evidence, you can take it. The important thing is that you're practising regularly and making progress.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about Beauty School Online and how our
              courses work.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;re happy to help. Get in touch and we&apos;ll get back to
            you.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
