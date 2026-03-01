import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PlayCircle,
  Upload,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  BookOpen,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore our Bronze, Silver, and Gold beauty skills courses with pricing and eligibility. Designed to align with the DofE Skills section.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose from Bronze, Silver, and Gold levels. All courses include
              weekly video lessons, guided tasks, and professional assessor
              feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Bronze */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bronze
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              13 weeks &middot; &pound;145 &middot; Ages 14+
            </p>
            <Separator className="mt-6" />
          </div>

          <div className="mx-auto max-w-lg">
            <Card className="relative overflow-hidden border-2 border-primary/20">
              <CardHeader className="bg-secondary/50 pb-4">
                <CardTitle className="text-xl">Bronze</CardTitle>
                <CardDescription>13 weeks / 3 months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">&pound;145</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  The essential Bronze programme covering foundational beauty
                  skills. Perfect for beginners starting their DofE journey.
                </p>
                <ul className="space-y-3">
                  {[
                    "Introduction to skincare basics",
                    "Nail care and simple nail art",
                    "Hair care fundamentals",
                    "Basic makeup techniques",
                    "Hand and foot care",
                    "Colour theory for beauty",
                    "Hygiene and safety practices",
                    "Building a skincare routine",
                    "Simple braiding and styling",
                    "Natural makeup looks",
                    "Accessorising and presentation",
                    "Review and reflection",
                    "Final portfolio and assessment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/courses/bronze">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Eligibility:</span>{" "}
              Bronze is for those aged 14+ years.{" "}
              <span className="text-xs">
                * If you aren&apos;t 14 yet but are in the school year in which
                your peer group turn fourteen, you can start a Bronze DofE
                programme.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Silver */}
      <section className="bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Silver
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              13&ndash;26 weeks &middot; From &pound;145 &middot; Ages 15+
            </p>
            <Separator className="mt-6" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Silver Core */}
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">
                  Silver Core (Module A)
                </CardTitle>
                <CardDescription>13 weeks / 3 months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">&pound;145</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  Intermediate beauty skills building on foundational knowledge.
                  Ideal for DofE Silver participants choosing a 13-week Skills
                  activity.
                </p>
                <ul className="space-y-3">
                  {[
                    "Intermediate skincare analysis",
                    "Gel-effect nail techniques",
                    "Blow-dry and heat styling basics",
                    "Contouring and highlighting",
                    "Facial massage techniques",
                    "Understanding ingredients",
                    "Intermediate nail art",
                    "Curling and straightening methods",
                    "Smokey and defined eye looks",
                    "Brow shaping and grooming",
                    "Creating a complete look",
                    "Trend awareness and adaptation",
                    "Module A assessment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full" size="lg" variant="outline" asChild>
                    <Link href="/courses/silver">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Silver Plus */}
            <Card className="relative flex flex-col overflow-hidden border-2 border-primary/20">
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most popular
              </div>
              <CardHeader className="bg-secondary/50 pb-4">
                <CardTitle className="text-xl">
                  Silver Plus (Modules A + B)
                </CardTitle>
                <CardDescription>26 weeks / 6 months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">&pound;290</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  The full Silver experience across two modules, providing deeper
                  skill development and more practice time.
                </p>
                <ul className="space-y-3">
                  {[
                    "Everything in Silver Core (Module A)",
                    "Advanced facial treatments",
                    "Nail extensions introduction",
                    "Vintage and retro styling",
                    "Bridal makeup fundamentals",
                    "Aromatherapy basics",
                    "Creative colour techniques",
                    "Updos for occasions",
                    "Photography-ready makeup",
                    "Skin health and wellness",
                    "Personal style development",
                    "Industry awareness",
                    "Full Silver portfolio and assessment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/courses/silver">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-white p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Eligibility:</span>{" "}
              Silver is for those aged 15+ years.{" "}
              <span className="text-xs">
                * If you aren&apos;t 15 yet but are in the school year in which
                your peer group turn fifteen, you can start a Silver DofE
                programme.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Gold */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Gold
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              26&ndash;52 weeks &middot; From &pound;360 &middot; Ages 16+
            </p>
            <Separator className="mt-6" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Gold 6 months */}
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">
                  Gold (Modules A + B)
                </CardTitle>
                <CardDescription>26 weeks / 6 months</CardDescription>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">from</span>{" "}
                  <span className="text-4xl font-bold">&pound;360</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  Advanced beauty skills for dedicated learners. The core Gold
                  programme covering two comprehensive modules.
                </p>
                <ul className="space-y-3">
                  {[
                    "Advanced skincare science",
                    "Professional nail techniques",
                    "Advanced heat styling",
                    "Editorial makeup concepts",
                    "Holistic beauty approaches",
                    "Advanced colour theory",
                    "Professional finishing techniques",
                    "Special occasion hair",
                    "Character and creative makeup",
                    "Business of beauty introduction",
                    "Portfolio development",
                    "Client consultation skills",
                    "Modules A + B assessment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full" size="lg" variant="outline" asChild>
                    <Link href="/courses/gold">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gold Extended 12 months */}
            <Card className="relative flex flex-col overflow-hidden border-2 border-primary/20">
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most comprehensive
              </div>
              <CardHeader className="bg-secondary/50 pb-4">
                <CardTitle className="text-xl">
                  Gold Extended (Modules A + B + C + D)
                </CardTitle>
                <CardDescription>52 weeks / 12 months</CardDescription>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">from</span>{" "}
                  <span className="text-4xl font-bold">&pound;720</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <p className="mb-4 text-sm text-muted-foreground">
                  The most comprehensive programme, spanning a full year of
                  advanced beauty education across four modules.
                </p>
                <ul className="space-y-3">
                  {[
                    "Everything in Gold (Modules A + B)",
                    "Specialist skin treatments",
                    "Advanced nail art and design",
                    "Period and historical styling",
                    "Fashion and editorial looks",
                    "Wellness and holistic beauty",
                    "Advanced braiding and weaving",
                    "Theatrical and SFX introduction",
                    "Brand and portfolio building",
                    "Competition techniques",
                    "Industry pathways and careers",
                    "Masterclass and refinement",
                    "Full Gold portfolio and assessment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/courses/gold">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Duration:</span>{" "}
                You can choose a 6-month or 12-month course to meet your DofE
                Gold Skills section requirement.
              </p>
              <p>
                <span className="font-medium text-foreground">Age:</span> Gold
                is for those aged 16+ years.
              </p>
              <p>
                You can start your Gold DofE Award any time after your 16th
                birthday and must complete it before you turn 25.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s Included in Every Course
          </h2>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {[
              {
                icon: PlayCircle,
                label: "Weekly video lesson",
              },
              {
                icon: BookOpen,
                label: "Guided tasks and activities",
              },
              {
                icon: Upload,
                label: "Evidence upload system",
              },
              {
                icon: MessageSquare,
                label: "Personalised assessor feedback",
              },
              {
                icon: FileText,
                label: "Completion report for your DofE Leader",
              },
              {
                icon: CheckCircle,
                label: "Progressive skill development",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Have Questions?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get in touch and we&apos;ll help you find the right course.
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
