"use client";

import Link from "next/link";
import { ReadingProgress } from "@/components/layout/ReadingProgress";

export function SiteHeader() {
  return (
    <>
      <ReadingProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
            Activate Rights //
          </Link>
          <a
            href="#methodology"
            className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[var(--accent)]"
          >
            About
          </a>
        </div>
      </header>
    </>
  );
}
