import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { SectionForm } from "@/components/admin/section-form";

export const metadata: Metadata = {
  title: "New Section — Admin",
};

export default async function NewSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={`/admin/courses/${id}/edit`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Section</CardTitle>
        </CardHeader>
        <CardContent>
          <SectionForm courseId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
