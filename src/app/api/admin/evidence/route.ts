import { NextResponse } from "next/server";
import { saveEvidenceRecord } from "@/lib/evidence-store";
import type { EvidenceRecord } from "@/types/evidence";

function isDevLocal() {
  return process.env.NODE_ENV === "development";
}

export async function POST(request: Request) {
  if (!isDevLocal()) return NextResponse.json({ error: "Not available" }, { status: 404 });
  const body = (await request.json()) as Partial<EvidenceRecord> & { id: string };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  saveEvidenceRecord(body);
  return NextResponse.json({ ok: true });
}
