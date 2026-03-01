import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getUserById } from "@/actions/admin/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RoleSelector } from "@/components/admin/role-selector";

export const metadata: Metadata = {
  title: "User Detail — Admin",
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getUserById(id);

  if (!result) notFound();

  const { profile, enrolments } = result;

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/admin/users">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{profile.full_name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date(profile.created_at).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Role</p>
              <RoleSelector userId={profile.id} currentRole={profile.role} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolments</CardTitle>
          </CardHeader>
          <CardContent>
            {enrolments.length > 0 ? (
              <div className="space-y-3">
                {enrolments.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {e.courses?.title ?? "Unknown Course"}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {e.status}
                      </p>
                    </div>
                    <Badge variant="secondary">{e.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No enrolments yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
