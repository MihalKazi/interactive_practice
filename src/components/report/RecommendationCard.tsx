import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function RecommendationCard({ audience, children }: { audience: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <ArrowRight className="size-4 text-[var(--data-primary)]" aria-hidden="true" />
        <h3 className="font-semibold">{audience}</h3>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{children}</p>
    </Card>
  );
}
