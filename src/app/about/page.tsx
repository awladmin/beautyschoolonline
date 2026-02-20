import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Beauty School Online — our mission, approach, and commitment to safe, accessible beauty education for DofE participants.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About Beauty School Online
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Making beauty skills accessible, structured, and safe for young
              learners working towards their DofE award.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We believe every young person should have access to quality beauty
              education, regardless of where they live or their background.
              Beauty School Online was created to give DofE participants a
              structured, supportive way to develop beauty skills as part of
              their Skills section.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Many young people are passionate about beauty but lack access to
              formal courses or local tutors. Our online platform removes those
              barriers, providing professional-quality video lessons and expert
              assessor feedback that participants can access from home.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Our Approach</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our courses are built around a simple but effective structure:
              learn, practise, evidence, feedback. Each week introduces a new
              skill or technique through a professional video tutorial. Learners
              then practise and submit evidence of their work, receiving
              personalised feedback from a qualified assessor.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Structured Learning</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Progressive weekly lessons that build skills systematically
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Professional Feedback</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Qualified assessors who guide and support your development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* DofE Alignment */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              DofE Alignment
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our courses are carefully designed to align with the requirements
              of the Duke of Edinburgh Skills section. Each course provides the
              regular practice, progressive skill development, and assessor
              involvement that the DofE programme values.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Important:
                </span>{" "}
                We are not currently an Approved Activity Provider (AAP). Our
                courses are designed to align with DofE Skills section
                requirements. Always verify suitability with your DofE Leader
                before starting a course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Safety &amp; Wellbeing
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              The safety of our learners is our top priority. All our course
              content is age-appropriate and uses safe materials and techniques.
              We never recommend products or methods that could be harmful to
              young learners.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our commitment to safeguarding means we carefully consider every
              aspect of our courses — from the products we recommend to the
              techniques we teach — to ensure they are suitable for our learners.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our courses or get in touch with any questions.
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
