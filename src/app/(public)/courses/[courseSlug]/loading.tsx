import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailLoading() {
  return (
    <section className="bg-secondary/30 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Skeleton className="mb-4 h-6 w-20" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="mt-4 h-6 w-full" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
