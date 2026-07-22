import { NextRequest, NextResponse } from "next/server";
import { originalKeyForExtraction } from "@/lib/dev-evidence";
import { getPrivateOriginal } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ extractionId: string }> }) {
  const { extractionId } = await params;
  const original = await originalKeyForExtraction(extractionId);
  if (!original) return new NextResponse("Not found", { status: 404 });
  const file = await getPrivateOriginal(original.key);
  if (!file) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": original.mimeType || file.contentType,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
