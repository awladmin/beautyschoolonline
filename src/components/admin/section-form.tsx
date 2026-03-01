"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectionSchema, type SectionFormValues } from "@/lib/schemas/course";
import { createSection, updateSection } from "@/actions/admin/sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface SectionFormProps {
  courseId: string;
  sectionId?: string;
  defaultValues?: Partial<SectionFormValues>;
}

export function SectionForm({
  courseId,
  sectionId,
  defaultValues,
}: SectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!sectionId;

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      slug: "",
      sectionNumber: 1,
      learningVideoUrl: "",
      demoVideoUrl: "",
      isPublished: false,
      sortOrder: 0,
      ...defaultValues,
    },
  });

  async function onSubmit(values: SectionFormValues) {
    setLoading(true);
    try {
      const result = isEditing
        ? await updateSection(sectionId!, courseId, values)
        : await createSection(courseId, values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(isEditing ? "Section updated" : "Section created");
        router.push(`/admin/courses/${courseId}/edit`);
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
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Introduction to Nail Care" {...field} />
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
                  <Input placeholder="intro-nail-care" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="sectionNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="learningVideoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Video URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/embed/..."
                  {...field}
                />
              </FormControl>
              <FormDescription>YouTube/Vimeo embed URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="demoVideoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demo Video URL (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/embed/..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Section"
              : "Create Section"}
        </Button>
      </form>
    </Form>
  );
}
