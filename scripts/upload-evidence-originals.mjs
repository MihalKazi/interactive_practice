import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

const manifestPath = "private/evidence/extraction-manifest.json";
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

for (const image of manifest.images) {
  const filePath = `private/evidence/originals/${image.extractedFilename}`;
  if (!existsSync(filePath)) {
    console.warn(`Missing file, skipping: ${filePath}`);
    continue;
  }
  const bytes = readFileSync(filePath);
  const key = `originals/${image.extractedFilename}`;
  const { error } = await supabase.storage.from("evidence-private").upload(key, bytes, {
    contentType: image.mimeType,
    upsert: true,
  });
  if (error) {
    console.error(`Failed to upload ${key}: ${error.message}`);
    continue;
  }
  console.log(`Uploaded ${key} (${bytes.length} bytes)`);
}
