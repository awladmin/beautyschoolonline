import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Beauty School Online account to get started.",
};

export default function SignupPage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-secondary/30 px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to enrol in courses and track your progress.
          </p>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </section>
  );
}
