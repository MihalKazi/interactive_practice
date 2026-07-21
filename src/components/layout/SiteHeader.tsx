"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { SectionNavigation } from "@/components/layout/SectionNavigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ReadingProgress />
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur transition-colors",
          scrolled && "bg-[var(--background)]",
        )}
      >
        <div className="relative mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-20 focus:z-50 focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]">
            Skip to content
          </a>
          <a href="#" className="max-w-44 font-serif text-base font-semibold leading-tight sm:max-w-none">
            Inside the Network
          </a>
          <div className="ml-auto">
            <SectionNavigation />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button className="min-h-11 border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold" type="button" aria-label="Language switch placeholder">
              EN / বাংলা
            </button>
            <ThemeToggle />
            <a className="inline-flex min-h-11 items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-3 text-sm font-semibold text-[var(--background)]" href="#methodology">
              <BookOpen className="size-4" aria-hidden="true" />
              Methodology
            </a>
          </div>
          <MobileNavigation />
        </div>
      </header>
    </>
  );
}
