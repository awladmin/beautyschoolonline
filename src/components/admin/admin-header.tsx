import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "@/components/auth/user-menu";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  email: string;
}

export function AdminHeader({ email }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Beauty School Online"
              width={180}
              height={57}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <Badge variant="secondary" className="text-xs">
            Admin
          </Badge>
        </div>
        <UserMenu email={email} role="admin" />
      </div>
    </header>
  );
}
