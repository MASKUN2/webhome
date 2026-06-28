import Link from "next/link";
import { site } from "@/config/site";
import { AuthStatus } from "./auth-status";

export function SiteHeader() {
  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-lg font-semibold tracking-tight">
          {site.name}
        </Link>
        <AuthStatus />
      </div>
    </header>
  );
}
