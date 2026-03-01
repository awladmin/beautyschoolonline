import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  slug: string;
  description: string | null;
  level: string | null;
}

export function CourseCard({ title, slug, description, level }: CourseCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {level && <Badge variant="secondary">{level}</Badge>}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className="mt-auto">
        <Button className="w-full" asChild>
          <Link href={`/courses/${slug}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Continue
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
