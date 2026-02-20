import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  PlayCircle,
  ClipboardCheck,
  Upload,
  CheckCircle,
  FileText,
  Clock,
  Camera,
  PenLine,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Beauty School Online works — from choosing your course to completing your assessor report for DofE.",
};

const steps = [
  {
    number: 1,
    title: "Choose your course",
    description:
      "Pick the level that matches your DofE award — Bronze, Silver, or Gold. Each course has a core option and an extended option for more practice time.",
    icon: BookOpen,
  },
  {
    number: 2,
    title: "Watch your weekly video lesson",
    description:
      "Each week, a new professional video tutorial is released covering a specific beauty technique. Watch it in your own time, as many times as you need.",
    icon: PlayCircle,
  },
  {
    number: 3,
    title: "Complete your task and capture evidence",
    description:
      "Practice the technique you've learned. Take photos, record short videos, or write reflections to document your progress.",
    icon: ClipboardCheck,
  },
  {
    number: 4,
    title: "Submit for assessor feedback",
    description:
      "Upload your evidence to receive personalised feedback from a qualified assessor. They'll guide your development and note your progress.",
    icon: Upload,
  },
  {
    number: 5,
    title: "Progress unlocked — move to the next week",
    description:
      "Once your evidence is reviewed, you'll move on to the next lesson. This ensures you're building skills progressively, week by week.",
    icon: CheckCircle,
  },
  {
    number: 6,
    title: "Complete your course and receive your assessor report",
    description:
      "At the end of your course, your assessor produces a completion report summarising your progress and achievements — ready to share with your DofE Leader.",
    icon: FileText,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How It Works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Our courses follow a simple weekly structure. Learn a new skill,
              practise it, submit your evidence, and get feedback — all at your
              own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-6 pb-12">
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-14 h-[calc(100%-3rem)] w-px bg-border" />
                )}
                {/* Number circle */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Structure Breakdown */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What a Typical Week Looks Like
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each week takes around 1 hour of your time. Here&apos;s how it
              breaks down.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Watch</h3>
                <p className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  ~15 minutes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Watch the video tutorial and take notes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Practise</h3>
                <p className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  ~30 minutes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try the technique and complete the guided task
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Submit</h3>
                <p className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  ~15 minutes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload evidence and write a short reflection
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence & Portfolio */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Building Your Portfolio
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Each week, your evidence builds into a comprehensive portfolio
              demonstrating your skill development.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Photos &amp; Videos</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Visual evidence of your beauty techniques and finished results
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Reflections</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Written reflections on what you learned and how you improved
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Assessor Feedback</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Professional comments and guidance recorded alongside your work
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DofE Note */}
      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Our courses are designed to align with the DofE Skills section.
            Always check with your DofE Leader to confirm suitability for your
            specific programme requirements before starting.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Browse our courses and find the right level for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
