import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.legalEntityName}. All
          rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Terms
          </Link>
          <Link
            href="/safeguarding"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Safeguarding
          </Link>
        </nav>
      </div>
    </footer>
  );
}
