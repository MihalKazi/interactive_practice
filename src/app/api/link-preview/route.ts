import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = ["archive.ph", "archive.today", "archive.is", "megalodon.jp", "web.archive.org", "archive.org"];

function isAllowedHost(hostname: string) {
  return ALLOWED_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
}

function extractMeta(html: string, prop: string): string | null {
  const tagMatch = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*>`, "i"));
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']([^"']*)["']/i);
  return contentMatch ? contentMatch[1] : null;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "missing url" }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (!isAllowedHost(parsed.hostname)) {
    return NextResponse.json({ error: "host not allowed" }, { status: 403 });
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TechAndHateReport/1.0)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream fetch failed" }, { status: 502 });

    const html = await res.text();
    const title = extractMeta(html, "og:title") ?? html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
    const image = extractMeta(html, "og:image");
    const description = extractMeta(html, "og:description");

    return NextResponse.json({ title, image, description });
  } catch {
    return NextResponse.json({ error: "fetch error" }, { status: 502 });
  }
}
