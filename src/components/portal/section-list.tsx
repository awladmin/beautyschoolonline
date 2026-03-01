import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, CheckCircle } from "lucide-react";

interface SectionInfo {
  id: string;
  title: string;
  slug: string;
  section_number: number;
  status?: string | null;
}

interface SectionListProps {
  sections: SectionInfo[];
  courseSlug: string;
}

export function SectionList({ sections, courseSlug }: SectionListProps) {
  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isLocked = section.status === "locked";
        const isCompleted =
          section.status === "completed" ||
          section.status === "quiz_completed" ||
          section.status === "submitted";

        return (
          <Card key={section.id} className={isLocked ? "opacity-60" : ""}>
            <CardContent className="flex items-center gap-4 p-4">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
              ) : isLocked ? (
                <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
              ) : (
                <PlayCircle className="h-5 w-5 shrink-0 text-primary" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {section.section_number}. {section.title}
                </p>
              </div>
              {!isLocked && (
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`/courses/${courseSlug}/sections/${section.slug}`}
                  >
                    {isCompleted ? "Review" : "Start"}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
