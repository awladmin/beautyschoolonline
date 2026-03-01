"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { submitQuiz } from "@/actions/quiz";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import type { Json } from "@/lib/types/database";

interface Question {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false" | "short_answer";
  options: Json | null;
  sort_order: number;
}

interface QuizFormProps {
  sectionId: string;
  courseId: string;
  courseSlug: string;
  questions: Question[];
}

export function QuizForm({
  sectionId,
  courseId,
  courseSlug,
  questions,
}: QuizFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
  } | null>(null);

  function setAnswer(questionId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check all questions answered
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      const answersList = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      const res = await submitQuiz(sectionId, courseId, courseSlug, answersList);
      if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        setResult({ score: res.score!, total: res.total! });
        toast.success(`Quiz completed! Score: ${res.score}/${res.total}`);
      }
    } catch {
      toast.error("Failed to submit quiz.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <CheckCircle className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-semibold">Quiz Complete!</h3>
          <p className="text-muted-foreground">
            You scored {result.score} out of {result.total}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q, idx) => (
        <Card key={q.id}>
          <CardHeader>
            <CardTitle className="text-base">
              {idx + 1}. {q.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {q.question_type === "multiple_choice" && q.options && (
              <RadioGroup
                value={answers[q.id] || ""}
                onValueChange={(val) => setAnswer(q.id, val)}
              >
                {(q.options as string[]).map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                    <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {q.question_type === "true_false" && (
              <RadioGroup
                value={answers[q.id] || ""}
                onValueChange={(val) => setAnswer(q.id, val)}
              >
                {["True", "False"].map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                    <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {q.question_type === "short_answer" && (
              <Input
                value={answers[q.id] || ""}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                placeholder="Type your answer..."
              />
            )}
          </CardContent>
        </Card>
      ))}

      {questions.length > 0 && (
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Quiz"}
        </Button>
      )}

      {questions.length === 0 && (
        <Alert>
          <AlertDescription>
            No quiz questions available for this section yet.
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
