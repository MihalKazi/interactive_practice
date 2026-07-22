import { NextRequest, NextResponse } from "next/server";
import { readReviewBundle, writeReviewBundle } from "@/lib/dev-evidence";
import type { MatchConfidence, MatchDecision } from "@/types/evidence-review";

export const dynamic = "force-dynamic";

const decisions = new Set(["pending", "confirmed", "rejected", "uncertain", "duplicate", "unrelated-image"]);
const confidence = new Set(["low", "medium", "high"]);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const allowed = ["extractionId", "matchDecision", "matchConfidence", "confirmedFigureId", "matchNotes", "reviewerInitials"];
  if (Object.keys(body).some((key) => !allowed.includes(key))) return NextResponse.json({ ok: false, error: "Unknown field" }, { status: 400 });
  if (!/^IMG-\d{3}$/.test(body.extractionId)) return NextResponse.json({ ok: false, error: "Invalid extraction ID" }, { status: 400 });
  if (!decisions.has(body.matchDecision)) return NextResponse.json({ ok: false, error: "Invalid decision" }, { status: 400 });
  if (!confidence.has(body.matchConfidence)) return NextResponse.json({ ok: false, error: "Invalid confidence" }, { status: 400 });
  if (body.matchDecision === "confirmed" && (!body.reviewerInitials || !body.matchNotes || !/^FIG-\d{3}$/.test(body.confirmedFigureId))) {
    return NextResponse.json({ ok: false, error: "Confirmation requires initials, note, and figure ID" }, { status: 400 });
  }
  const bundle = await readReviewBundle();
  const item = bundle.items.find((entry) => entry.extractionId === body.extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Unknown extraction ID" }, { status: 404 });
  if (body.matchDecision === "confirmed") {
    const duplicate = bundle.items.find((entry) => entry.extractionId !== item.extractionId && entry.confirmedFigureId === body.confirmedFigureId && entry.matchDecision === "confirmed");
    if (duplicate) return NextResponse.json({ ok: false, error: "Figure already confirmed by another item" }, { status: 400 });
  }
  item.matchDecision = body.matchDecision as MatchDecision;
  item.matchConfidence = body.matchConfidence as MatchConfidence;
  item.confirmedFigureId = String(body.confirmedFigureId || "");
  item.matchNotes = String(body.matchNotes || "");
  item.reviewerInitials = String(body.reviewerInitials || "");
  item.reviewedAt = new Date().toISOString();
  item.revision += 1;
  item.updatedAt = new Date().toISOString();
  await writeReviewBundle(bundle, item.reviewerInitials, "match", ["matchDecision", "matchConfidence", "confirmedFigureId", "matchNotes"]);
  return NextResponse.json({ ok: true, revision: item.revision });
}
