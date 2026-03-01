import type { Metadata } from "next";
import { getSubmissions } from "@/actions/admin/submissions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Submissions — Admin",
};

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold">Quiz Submissions</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>
                {(sub.profiles as { email?: string; full_name?: string | null })?.full_name ||
                  (sub.profiles as { email?: string })?.email ||
                  "Unknown"}
              </TableCell>
              <TableCell>
                {(sub.course_sections as { courses?: { title?: string }; title?: string })?.courses?.title || "—"}
              </TableCell>
              <TableCell>
                {(sub.course_sections as { title?: string })?.title || "—"}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {sub.score !== null ? sub.score : "—"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(sub.created_at).toLocaleDateString("en-GB")}
              </TableCell>
            </TableRow>
          ))}
          {submissions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No submissions yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
