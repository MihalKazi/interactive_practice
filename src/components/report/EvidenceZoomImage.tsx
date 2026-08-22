"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import Image from "next/image";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function EvidenceZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const zoomBy = (delta: number) => {
    setScale((current) => {
      const next = clampScale(current + delta);
      if (next === MIN_SCALE) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    resetZoom();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "+" || event.key === "=") zoomBy(0.5);
      if (event.key === "-") zoomBy(-0.5);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    zoomBy(-event.deltaY * 0.0025);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (scale <= MIN_SCALE) return;
    dragState.current = { startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current) return;
    setPan({
      x: dragState.current.panX + (event.clientX - dragState.current.startX),
      y: dragState.current.panY + (event.clientY - dragState.current.startY),
    });
  };

  const endDrag = () => {
    dragState.current = null;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full cursor-zoom-in overflow-hidden border border-[var(--border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        aria-label="View image enlarged"
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 65ch"
          className="h-auto w-full object-contain"
        />
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged view"
              className="fixed inset-0 z-[200] flex touch-none items-center justify-center overflow-hidden bg-black/90 p-6"
              onWheel={onWheel}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close enlarged view"
                className="fixed right-4 top-4 z-10 flex size-10 items-center justify-center border border-white/30 bg-black/60 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 border border-white/30 bg-black/60 p-1">
                <button
                  type="button"
                  onClick={() => zoomBy(-0.5)}
                  disabled={scale <= MIN_SCALE}
                  aria-label="Zoom out"
                  className="flex size-9 items-center justify-center text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <span className="w-12 text-center font-mono text-xs text-white/80">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  onClick={() => zoomBy(0.5)}
                  disabled={scale >= MAX_SCALE}
                  aria-label="Zoom in"
                  className="flex size-9 items-center justify-center text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  disabled={scale === MIN_SCALE}
                  aria-label="Reset zoom"
                  className="flex size-9 items-center justify-center text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div
                className="flex size-full items-center justify-center"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onDoubleClick={() => (scale > MIN_SCALE ? resetZoom() : zoomBy(1))}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  className="max-h-[80vh] max-w-[90vw] select-none object-contain"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
                    transition: dragState.current ? "none" : "transform 0.15s ease-out",
                  }}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
