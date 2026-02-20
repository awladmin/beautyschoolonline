import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Beauty School Online learner portal.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-secondary/30 px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">Portal Coming Soon</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re building your learner portal. Check back soon!
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="#">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled
              />
            </div>
            <Button className="w-full" disabled>
              Login
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              &larr; Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
