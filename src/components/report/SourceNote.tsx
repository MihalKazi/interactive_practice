export function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-[var(--data-primary)] pl-4 text-sm leading-7 text-[var(--muted)]">
      {children}
    </p>
  );
}
