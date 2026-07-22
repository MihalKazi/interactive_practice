import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";

const PRIVATE_BUCKET = "evidence-private";
const PUBLIC_BUCKET = "evidence-public";

export async function putPrivateOriginal(key: string, bytes: Buffer, contentType: string) {
  const { error } = await supabaseAdmin().storage.from(PRIVATE_BUCKET).upload(key, bytes, { contentType, upsert: true });
  if (error) throw new Error(`private upload failed for ${key}: ${error.message}`);
}

export async function getPrivateOriginal(key: string): Promise<{ bytes: Buffer; contentType: string } | null> {
  const { data, error } = await supabaseAdmin().storage.from(PRIVATE_BUCKET).download(key);
  if (error || !data) return null;
  return { bytes: Buffer.from(await data.arrayBuffer()), contentType: data.type || "application/octet-stream" };
}

export async function movePrivateOriginal(fromKey: string, toKey: string) {
  const { error } = await supabaseAdmin().storage.from(PRIVATE_BUCKET).move(fromKey, toKey);
  if (error) throw new Error(`private move failed ${fromKey} -> ${toKey}: ${error.message}`);
}

export async function putPublicApproved(key: string, bytes: Buffer, contentType: string): Promise<string> {
  const { error } = await supabaseAdmin().storage.from(PUBLIC_BUCKET).upload(key, bytes, { contentType, upsert: true });
  if (error) throw new Error(`public upload failed for ${key}: ${error.message}`);
  const { data } = supabaseAdmin().storage.from(PUBLIC_BUCKET).getPublicUrl(key);
  return data.publicUrl;
}
