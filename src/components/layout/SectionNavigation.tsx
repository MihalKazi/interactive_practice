"use client";

import { useEffect, useState } from "react";
import { sectionLinks } from "@/data/report";
import { cn } from "@/lib/utils";

export function SectionNavigation({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sectionLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Report sections" className={cn(compact ? "grid gap-1" : "hidden xl:flex xl:items-center xl:gap-1")}>
      {sectionLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={onNavigate}
          aria-current={active === link.id ? "true" : undefined}
          className="px-2.5 py-2 text-xs font-semibold text-[var(--muted)] underline-offset-4 transition hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] aria-[current=true]:text-[var(--accent)]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
