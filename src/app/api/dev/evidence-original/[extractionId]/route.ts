import { readFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { isLocalDevelopmentRequest, originalPathForExtraction } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ extractionId: string }> }) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const { extractionId } = await params;
  const original = originalPathForExtraction(extractionId);
  if (!original) return new NextResponse("Not found", { status: 404 });
  try {
    const data = await readFile(original.path);
    return new NextResponse(data, {
      headers: {
        "Content-Type": original.mimeType,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
