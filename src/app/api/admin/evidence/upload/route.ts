import { NextResponse } from "next/server";
import { putPublicApproved } from "@/lib/blob-store";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = String(formData.get("id") ?? "");
  const file = formData.get("file");

  if (!/^EV-\d{3}$/.test(id)) return NextResponse.json({ error: "Invalid evidence id" }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });

  const filename = `${id.toLowerCase()}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const path = await putPublicApproved(filename, bytes, file.type);

  return NextResponse.json({ path });
}
