import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "@/components/auth/user-menu";

interface PortalHeaderProps {
  email: string;
  role: string | null;
}

export function PortalHeader({ email, role }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Beauty School Online"
              width={240}
              height={75}
              className="h-15 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/courses"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Browse Courses
            </Link>
          </nav>
        </div>
        <UserMenu email={email} role={role} />
      </div>
    </header>
  );
}
