import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Cancelled",
};

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;

  return (
    <section className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment was not completed. You haven&apos;t been charged.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {course && (
            <Button asChild>
              <Link href={`/courses/${course}`}>Try Again</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
