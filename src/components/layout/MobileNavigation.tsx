"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionNavigation } from "@/components/layout/SectionNavigation";

type SectionLink = { id: string; label: string };

export function MobileNavigation({
  links,
}: {
  links: readonly SectionLink[];
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        ref={buttonRef}
        className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-auto border-y border-[var(--border)] bg-[var(--background)] p-5 shadow-sm">
          <div>
            <SectionNavigation links={links} compact onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
