import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdminSection } from "@/actions/admin/sections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { SectionForm } from "@/components/admin/section-form";
import { QuizBuilder } from "@/components/admin/quiz-builder";

export const metadata: Metadata = {
  title: "Edit Section — Admin",
};

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string; sectionId: string }>;
}) {
  const { id: courseId, sectionId } = await params;
  const result = await getAdminSection(sectionId);

  if (!result) notFound();

  const { section, questions } = result;

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={`/admin/courses/${courseId}/edit`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Section</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionForm
              courseId={courseId}
              sectionId={sectionId}
              defaultValues={{
                title: section.title,
                slug: section.slug,
                sectionNumber: section.section_number,
                learningVideoUrl: section.learning_video_url || "",
                demoVideoUrl: section.demo_video_url || "",
                isPublished: section.is_published,
                sortOrder: section.sort_order,
              }}
            />
          </CardContent>
        </Card>

        <Separator />

        <QuizBuilder
          sectionId={sectionId}
          courseId={courseId}
          questions={questions}
        />
      </div>
    </div>
  );
}
