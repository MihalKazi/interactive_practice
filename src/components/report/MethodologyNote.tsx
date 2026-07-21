import { Card } from "@/components/ui/Card";

export function MethodologyNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{children}</p>
    </Card>
  );
}
