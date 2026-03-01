import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdminCourseById } from "@/actions/admin/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus } from "lucide-react";
import { CourseForm } from "@/components/admin/course-form";

export const metadata: Metadata = {
  title: "Edit Course — Admin",
};

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getAdminCourseById(id);

  if (!result) notFound();

  const { course, sections } = result;

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/admin/courses">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseForm
              courseId={course.id}
              defaultValues={{
                title: course.title,
                slug: course.slug,
                description: course.description || "",
                level: course.level || "",
                priceGbp: course.price_gbp,
                stripePriceId: course.stripe_price_id || "",
                isPublished: course.is_published,
                isAvailableForPurchase: course.is_available_for_purchase,
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sections</CardTitle>
            <Button size="sm" asChild>
              <Link href={`/admin/courses/${id}/sections/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {sections.length > 0 ? (
              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        {section.section_number}
                      </span>
                      <span className="font-medium">{section.title}</span>
                      {section.is_published ? (
                        <Badge variant="secondary" className="text-xs">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/admin/courses/${id}/sections/${section.id}/edit`}
                      >
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No sections yet. Add your first section.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
