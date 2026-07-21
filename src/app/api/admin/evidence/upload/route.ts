import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function isDevLocal() {
  return process.env.NODE_ENV === "development";
}

export async function POST(request: Request) {
  if (!isDevLocal()) return NextResponse.json({ error: "Not available" }, { status: 404 });

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "");
  const file = formData.get("file");

  if (!/^EV-\d{3}$/.test(id)) return NextResponse.json({ error: "Invalid evidence id" }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });

  const dir = join(process.cwd(), "public", "evidence", "approved");
  mkdirSync(dir, { recursive: true });
  const filename = `${id.toLowerCase()}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  writeFileSync(join(dir, filename), bytes);

  return NextResponse.json({ path: `/evidence/approved/${filename}` });
}
