"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { EvidenceRecord } from "@/types/evidence";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function distance(touches: React.TouchList) {
  const a = touches[0];
  const b = touches[1];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export function EvidenceLightbox({ record, onClose }: { record: EvidenceRecord; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const pinchState = useRef<{ startDistance: number; startScale: number } | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const onWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setScale((current) => {
      const next = clampScale(current - event.deltaY * 0.0025);
      if (next === MIN_SCALE) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (scale <= MIN_SCALE) return;
    dragState.current = { startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
  };

  const endDrag = () => {
    dragState.current = null;
  };

  const onTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length === 2) {
      pinchState.current = { startDistance: distance(event.touches), startScale: scale };
    }
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length === 2 && pinchState.current) {
      event.preventDefault();
      const ratio = distance(event.touches) / pinchState.current.startDistance;
      const next = clampScale(pinchState.current.startScale * ratio);
      setScale(next);
      if (next === MIN_SCALE) setPan({ x: 0, y: 0 });
    }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (event.touches.length < 2) pinchState.current = null;
  };

  const toggleZoom = () => {
    if (scale > MIN_SCALE) {
      setScale(1);
      setPan({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${record.title}`}
      className="fixed inset-0 z-50 overflow-hidden bg-black/90 touch-none"
      onWheel={onWheel}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close enlarged view"
        className="fixed right-4 top-4 z-10 flex size-10 items-center justify-center border border-white/30 bg-black/60 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      <p className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-black/60 px-3 py-1.5 text-xs text-white/80">
        Scroll or pinch to zoom, drag to pan &middot; double-click to reset
      </p>
      <div
        className="flex size-full items-center justify-center"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={toggleZoom}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={record.publicImagePath}
          alt={record.publicCaption}
          draggable={false}
          className="max-h-[85vh] max-w-[90vw] select-none object-contain"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
            transition: dragState.current ? "none" : "transform 0.15s ease-out",
          }}
        />
      </div>
    </div>
  );
}
