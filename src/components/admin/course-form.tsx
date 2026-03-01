"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, type CourseFormValues } from "@/lib/schemas/course";
import { createCourse, updateCourse } from "@/actions/admin/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseFormProps {
  courseId?: string;
  defaultValues?: Partial<CourseFormValues>;
}

export function CourseForm({ courseId, defaultValues }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!courseId;

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      level: "",
      priceGbp: 0,
      stripePriceId: "",
      isPublished: false,
      isAvailableForPurchase: false,
      ...defaultValues,
    },
  });

  async function onSubmit(values: CourseFormValues) {
    setLoading(true);
    try {
      const result = isEditing
        ? await updateCourse(courseId, values)
        : await createCourse(values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Course updated" : "Course created");
        router.push("/admin/courses");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Bronze Nail Art" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="bronze-nail-art" {...field} />
              </FormControl>
              <FormDescription>URL-friendly identifier</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input placeholder="Bronze / Silver / Gold" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceGbp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (pence)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2500"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormDescription>e.g. 2500 = £25.00</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="stripePriceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stripe Price ID (optional)</FormLabel>
              <FormControl>
                <Input placeholder="price_..." {...field} />
              </FormControl>
              <FormDescription>
                Leave blank to use inline pricing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Published</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvailableForPurchase"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Available for purchase</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Course"
              : "Create Course"}
        </Button>
      </form>
    </Form>
  );
}
