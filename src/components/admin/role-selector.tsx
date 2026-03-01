"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/actions/admin/users";
import { toast } from "sonner";

interface RoleSelectorProps {
  userId: string;
  currentRole: "student" | "assessor" | "admin";
}

export function RoleSelector({ userId, currentRole }: RoleSelectorProps) {
  const [role, setRole] = useState(currentRole);

  async function handleChange(newRole: string) {
    const r = newRole as "student" | "assessor" | "admin";
    setRole(r);
    const result = await updateUserRole(userId, r);
    if (result.error) {
      toast.error(result.error);
      setRole(currentRole);
    } else {
      toast.success("Role updated");
    }
  }

  return (
    <Select value={role} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="student">Student</SelectItem>
        <SelectItem value="assessor">Assessor</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
