import type { ReviewState } from "@/types/report";
import { Badge } from "@/components/ui/Badge";

const labels: Record<ReviewState, string> = {
  pending: "Editorial review pending",
  "in-review": "Legal review in progress",
  approved: "Approved for publication",
};

export function ReviewStatus({ state = "pending" }: { state?: ReviewState }) {
  return <Badge className="border-[var(--warning)] text-[var(--warning)]">{labels[state]}</Badge>;
}
