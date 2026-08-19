"use client";

import { useEffect, useState } from "react";

type Preview = { title: string | null; image: string | null; description: string | null };

export function LinkPreviewCard({
  url,
  fallbackImage,
  fallbackTitle,
  fallbackDescription,
}: {
  url: string;
  fallbackImage?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setPreview(null);
    fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Preview) => {
        if (cancelled) return;
        if (!data.title && !data.image) {
          setStatus("error");
          return;
        }
        setPreview(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (status === "loading") {
    return <div className="mt-3 h-20 w-full animate-pulse border border-[var(--border)] bg-[var(--surface)]" />;
  }

  if (status === "error" || !preview) {
    if (!fallbackImage) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex gap-3 border border-[var(--border)] bg-[var(--surface)] p-3 text-left transition hover:border-[var(--accent)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fallbackImage} alt="" className="h-20 w-20 flex-shrink-0 object-cover" />
        <div className="min-w-0">
          {fallbackTitle ? <p className="line-clamp-2 text-sm font-semibold">{fallbackTitle}</p> : null}
          {fallbackDescription ? (
            <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{fallbackDescription}</p>
          ) : null}
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex gap-3 border border-[var(--border)] bg-[var(--surface)] p-3 text-left transition hover:border-[var(--accent)]"
    >
      {preview.image || fallbackImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview.image ?? fallbackImage} alt="" className="h-20 w-20 flex-shrink-0 object-cover" />
      ) : null}
      <div className="min-w-0">
        {preview.title ? <p className="line-clamp-2 text-sm font-semibold">{preview.title}</p> : null}
        {preview.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{preview.description}</p>
        ) : null}
      </div>
    </a>
  );
}
