import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center border px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
        variant === "primary" &&
          "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)]",
        variant === "secondary" &&
          "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]",
        variant === "ghost" &&
          "border-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
