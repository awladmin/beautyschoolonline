import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Beauty School Online learner portal.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-secondary/30 px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to access your courses and dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
