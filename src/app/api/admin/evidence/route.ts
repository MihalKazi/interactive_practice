import { NextResponse } from "next/server";
import { saveEvidenceRecord } from "@/lib/evidence-store";
import type { EvidenceRecord } from "@/types/evidence";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<EvidenceRecord> & { id: string };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await saveEvidenceRecord(body);
  return NextResponse.json({ ok: true });
}
