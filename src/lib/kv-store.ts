import "server-only";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function getJSON<T>(key: string): Promise<T | null> {
  const { data, error } = await supabaseAdmin().from("kv_store").select("value").eq("key", key).maybeSingle<{ value: T }>();
  if (error) throw new Error(`kv_store read failed for ${key}: ${error.message}`);
  return data?.value ?? null;
}

export async function setJSON<T>(key: string, value: T): Promise<void> {
  const row: { key: string; value: T; updated_at: string } = { key, value, updated_at: new Date().toISOString() };
  const { error } = await supabaseAdmin()
    .from("kv_store")
    .upsert(row as never, { onConflict: "key" });
  if (error) throw new Error(`kv_store write failed for ${key}: ${error.message}`);
}

export async function appendHistory(entry: Record<string, unknown>): Promise<void> {
  const row = { timestamp: new Date().toISOString(), ...entry };
  const { error } = await supabaseAdmin().from("review_history").insert(row as never);
  if (error) throw new Error(`review_history append failed: ${error.message}`);
}
