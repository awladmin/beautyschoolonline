"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, type QuestionFormValues } from "@/lib/schemas/course";
import { createQuestion, deleteQuestion } from "@/actions/admin/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import type { Json } from "@/lib/types/database";

interface ExistingQuestion {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false" | "short_answer";
  options: Json | null;
  correct_answer: Json;
  sort_order: number;
}

interface QuizBuilderProps {
  sectionId: string;
  courseId: string;
  questions: ExistingQuestion[];
}

export function QuizBuilder({
  sectionId,
  courseId,
  questions,
}: QuizBuilderProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionInputs, setOptionInputs] = useState<string[]>(["", "", "", ""]);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: "",
      questionType: "multiple_choice",
      options: [],
      correctAnswer: "",
      sortOrder: questions.length,
    },
  });

  const questionType = form.watch("questionType");

  async function onSubmit(values: QuestionFormValues) {
    setLoading(true);
    try {
      const submitValues = {
        ...values,
        options:
          values.questionType === "short_answer"
            ? undefined
            : values.questionType === "true_false"
              ? ["True", "False"]
              : optionInputs.filter(Boolean),
      };

      const result = await createQuestion(sectionId, courseId, submitValues);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Question added");
        form.reset();
        setOptionInputs(["", "", "", ""]);
        setShowForm(false);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(questionId: string) {
    const result = await deleteQuestion(questionId, sectionId, courseId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Question deleted");
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quiz Questions</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Existing questions */}
      {questions.map((q, idx) => (
        <Card key={q.id}>
          <CardContent className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-medium">
                {idx + 1}. {q.question_text}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {q.question_type.replace("_", " ")}
              </p>
              {q.options && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Options: {JSON.stringify(q.options)}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(q.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </CardContent>
        </Card>
      ))}

      {questions.length === 0 && !showForm && (
        <p className="text-sm text-muted-foreground">
          No questions yet. Add your first question.
        </p>
      )}

      {/* Add question form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">New Question</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="questionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter question..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="multiple_choice">
                            Multiple Choice
                          </SelectItem>
                          <SelectItem value="true_false">
                            True / False
                          </SelectItem>
                          <SelectItem value="short_answer">
                            Short Answer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {questionType === "multiple_choice" && (
                  <div className="space-y-2">
                    <FormLabel>Options</FormLabel>
                    {optionInputs.map((opt, i) => (
                      <Input
                        key={i}
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...optionInputs];
                          newOpts[i] = e.target.value;
                          setOptionInputs(newOpts);
                        }}
                      />
                    ))}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Correct answer..." {...field} />
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
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Question"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
