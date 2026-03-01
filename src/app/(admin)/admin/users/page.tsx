import type { Metadata } from "next";
import { getUsers } from "@/actions/admin/users";
import { UserTable } from "@/components/admin/user-table";

export const metadata: Metadata = {
  title: "Users — Admin",
};

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold">Users</h1>
      <UserTable users={users} />
    </div>
  );
}
