import { SensitiveEvidenceGate } from "@/components/evidence/SensitiveEvidenceGate";

export function EvidenceContentWarning({
  warning,
  children,
}: {
  warning: string;
  children: React.ReactNode;
}) {
  return <SensitiveEvidenceGate warning={warning}>{children}</SensitiveEvidenceGate>;
}
