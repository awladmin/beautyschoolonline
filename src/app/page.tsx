import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Upload, Award, BookOpen, Star, Clock } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-white to-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Learn Beauty Skills.{" "}
                <span className="text-primary">Earn Your DofE Award.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Structured weekly video courses in beauty skills, designed to
                align with the DofE Skills section. Learn at your own pace with
                professional assessor feedback.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/courses">View Courses</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/heros/hero1.png"
                  alt="Student learning beauty skills online with tutor Lindsay"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  Meet your tutor:{" "}
                  <span className="text-primary">Lindsay</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Professional beauty educator guiding you every step of the way
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to develop your beauty skills and build your
              DofE portfolio.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Weekly Video Lessons</CardTitle>
                <CardDescription>
                  Professional video tutorials released each week, teaching you
                  new beauty techniques step by step.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Evidence &amp; Feedback</CardTitle>
                <CardDescription>
                  Upload photos and reflections from your practice sessions and
                  receive personalised feedback from a qualified assessor.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>DofE Skills Aligned</CardTitle>
                <CardDescription>
                  Our courses are designed to align with the DofE Skills section
                  requirements for Bronze, Silver, and Gold awards.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* DofE Alignment Callout */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              DofE Skills Section
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Designed for DofE Participants
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our courses are structured to align with the Duke of Edinburgh
              Skills section. Each course provides the progressive skill
              development, regular practice, and assessor feedback that the DofE
              programme values.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Always check with your DofE Leader to confirm suitability for your
              specific programme requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Course Tiers Preview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Level
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Courses available at Bronze, Silver, and Gold levels to match your
              DofE award.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="relative">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <Star className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle>Bronze</CardTitle>
                <CardDescription>
                  13 weeks of foundational beauty skills. Perfect for beginners
                  starting their DofE journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>13 weeks minimum</span>
                </div>
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Star className="h-6 w-6 text-gray-500" />
                </div>
                <CardTitle>Silver</CardTitle>
                <CardDescription>
                  Build on your skills with intermediate techniques over 13–26
                  weeks of structured learning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>13–26 weeks</span>
                </div>
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Gold</CardTitle>
                <CardDescription>
                  Advanced beauty skills over 26–52 weeks. The most comprehensive
                  programme for dedicated learners.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>26–52 weeks</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Explore our courses and find the right level for your DofE Skills
            section.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
