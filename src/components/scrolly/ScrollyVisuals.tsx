"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, UserRoundX, X } from "lucide-react";
import { CountValue } from "@/components/report/StatGrid";
import { LinkPreviewCard } from "@/components/ui/LinkPreviewCard";
import { useReportContent } from "@/components/providers/ReportContentProvider";

type Comment = {
  author: string;
  imageSrc: string;
  imageAlt: string;
  translatedText: string;
};

export type ConversationPost = {
  id: string;
  org: string;
  name: string;
  dateLabel: string;
  translatedSummary: string;
  imageSrc: string;
  imageAlt: string;
  sourceUrl?: string;
  comments?: Comment[];
  pending?: boolean;
};

const posts: ConversationPost[] = [
  {
    id: "tarique-rahman",
    org: "BNP Chairman & Prime Minister",
    name: "Tarique Rahman",
    dateLabel: "Dec 13, 2025",
    translatedSummary:
      "\"I am deeply saddened and heartbroken by the news that six brave Bangladeshi peacekeepers were killed, and eight others injured, in a brutal terrorist attack on a United Nations peacekeeping base in the Abyei area of Sudan.\" 120.1K reactions, 15.3K comments, 9.3K shares.",
    imageSrc: "/evidence/source/tarique-rahman-condolence-post-v3.png",
    imageAlt: "Facebook post from Tarique Rahman's verified page, dated December 13, 2025, expressing condolences for the six peacekeepers killed in Abyei, Sudan",
    sourceUrl: "https://www.facebook.com/photo/?fbid=1430598028430530&set=a.430295218460821",
    comments: [
      {
        author: "Abdollah Al Arman",
        imageSrc: "/evidence/source/tarique-comment-2-abdollah-al-arman-v2.png",
        imageAlt: "Comment from Abdollah Al Arman on Tarique Rahman's condolence post",
        translatedText:
          "\"Alhamdulillah. Those who are believers fight in the path of Allah, and those who are disbelievers fight in the path of Taghut. — The Quran.\"",
      },
      {
        author: "Mamunur Rashid Mahmudi",
        imageSrc: "/evidence/source/tarique-comment-3-mamunur-rashid-v2.png",
        imageAlt: "Comment from Mamunur Rashid Mahmudi on Tarique Rahman's condolence post",
        translatedText:
          "\"The UN peacekeeping force, in the name of suppressing terrorism, works against 95% Muslim Mujahideen and against Muslim countries. Now the question is, will they be considered martyrs?\"",
      },
      {
        author: "Mashud Bk",
        imageSrc: "/evidence/source/tarique-comment-1-mashud-bk-v2.png",
        imageAlt: "Comment from Mashud Bk on Tarique Rahman's condolence post",
        translatedText:
          "\"In the name of peace, the UN is creating unrest in Sudan. Bangladesh's government should withdraw all soldiers and stop the genocide in Sudan.\"",
      },
    ],
  },
  {
    id: "opposition-party",
    org: "Bangladesh Jamaat-e-Islami — opposition party page",
    name: "Bangladesh Jamaat-e-Islami",
    dateLabel: "Dec 14, 2025",
    translatedSummary:
      "\"Deep grief and condolences on the martyrdom of six Bangladeshi peacekeepers in Sudan\" — statement from Ameer Dr. Shafiqur Rahman, condemning the attack as a crime against humanity. 2.6K reactions, 96 comments, 80 shares.",
    imageSrc: "/evidence/source/jamaat-condolence-post-v3.png",
    imageAlt: "Facebook post from the Bangladesh Jamaat-e-Islami official page, dated December 14, 2025, mourning the six peacekeepers killed in Sudan",
    sourceUrl: "https://www.facebook.com/photo/?fbid=1268858378604390",
    comments: [
      {
        author: "Mahfujur Rahman Shanto",
        imageSrc: "/evidence/source/jamaat-comment-3-mahfujur-rahman-shanto.png",
        imageAlt: "Comment from Mahfujur Rahman Shanto on the Bangladesh Jamaat-e-Islami condolence post",
        translatedText:
          "\"The apostate force, martyrs? 'Islamic,' alhamdulillah.\"",
      },
      {
        author: "Tanvir Haydar",
        imageSrc: "/evidence/source/jamaat-comment-4-tanvir-haydar.png",
        imageAlt: "Comment from Tanvir Haydar on the Bangladesh Jamaat-e-Islami condolence post",
        translatedText:
          "\"How can apostates be martyrs???\"",
      },
      {
        author: "Abu Dawud",
        imageSrc: "/evidence/source/jamaat-comment-2-abu-dawud.png",
        imageAlt: "Comment from Abu Dawud on the Bangladesh Jamaat-e-Islami condolence post",
        translatedText:
          "\"Is pleasing the taghut called martyrdom, Mr. Jamaat?\"",
      },
      {
        author: "Afjol Husain",
        imageSrc: "/evidence/source/jamaat-comment-5-afjol-husain.png",
        imageAlt: "Comment from Afjol Husain on the Bangladesh Jamaat-e-Islami condolence post",
        translatedText:
          "\"Does Jamaat-e-Islami not even know what a martyr is and what a terrorist is? And they still claim to be an Islamic party.\"",
      },
      {
        author: "Muhammad SHaon",
        imageSrc: "/evidence/source/jamaat-comment-1-muhammad-shaon.png",
        imageAlt: "Comment from Muhammad SHaon on the Bangladesh Jamaat-e-Islami condolence post",
        translatedText:
          "\"He died while going to massacre Muslims, and they've labeled him a martyr!\"",
      },
    ],
  },
  {
    id: "bangladesh-navy",
    org: "Official page",
    name: "Bangladesh Navy",
    dateLabel: "Dec 14, 2025",
    translatedSummary:
      "\"Deep respect and condolences for the peacekeepers of the Bangladesh Army killed in the terrorist attack in Sudan.\" 42.2K reactions, 722 comments.",
    imageSrc: "/evidence/source/navy-condolence-post-v3.png",
    imageAlt: "Facebook post from the official Bangladesh Navy page, dated December 14, 2025, mourning the peacekeepers killed in Sudan",
    sourceUrl:
      "https://www.facebook.com/bangladeshnavy.mil.bd/posts/%E0%A6%B8%E0%A7%81%E0%A6%A6%E0%A6%BE%E0%A6%A8%E0%A7%87-%E0%A6%B8%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A7%80-%E0%A6%B9%E0%A6%BE%E0%A6%AE%E0%A6%B2%E0%A6%BE%E0%A6%AF%E0%A6%BC-%E0%A6%B9%E0%A6%A4%E0%A6%BE%E0%A6%B9%E0%A6%A4-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D%E0%A6%A4%E0%A6%BF%E0%A6%B0%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A6%BF-%E0%A6%97%E0%A6%AD%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D/898020886127879/",
    comments: [
      {
        author: "Abdollah Al Arman",
        imageSrc: "/evidence/source/navy-comment-1-abdollah-al-arman.png",
        imageAlt: "Comment from Abdollah Al Arman on the Bangladesh Navy's condolence post",
        translatedText:
          "\"Alhamdulillah. Those who are believers fight in the path of Allah, and those who are disbelievers fight in the path of Taghut. — The Quran.\"",
      },
      {
        author: "Shahadat Hossen",
        imageSrc: "/evidence/source/navy-comment-2-shahadat-hossen.png",
        imageAlt: "Comment from Shahadat Hossen on the Bangladesh Navy's condolence post",
        translatedText:
          "\"Alhamdulillah, good news. This taghut army has fought against mujahideen in many Muslim countries by serving as members of the UN peacekeeping mission.\"",
      },
      {
        author: "Habibul Basar",
        imageSrc: "/evidence/source/navy-comment-3-habibul-basar.png",
        imageAlt: "Comment from Habibul Basar on the Bangladesh Navy's condolence post",
        translatedText:
          "\"Someone who fought as a 'hero' for the UN in Sudan never deserves praise — they are traitors.\"",
      },
      {
        author: "Nahid Hasan Rifat",
        imageSrc: "/evidence/source/navy-comment-4-nahid-hasan-rifat.png",
        imageAlt: "Comment from Nahid Hasan Rifat on the Bangladesh Navy's condolence post",
        translatedText:
          "\"Good, they died, alhamdulillah. Very happy — may not a single one return. May Allah accept it, ameen.\"",
      },
      {
        author: "Md. Khalilur Rhaman",
        imageSrc: "/evidence/source/navy-comment-5-khalilur-rhaman.png",
        imageAlt: "Comment from Md. Khalilur Rhaman on the Bangladesh Navy's condolence post",
        translatedText:
          "\"Can a believer not be happy when a murtad dies!? Pack of dogs — that's how you should die. You're the ones who took up arms against Muslims, entangled in the blasphemy called UN peacekeeping. Go to hell that way!\"",
      },
      {
        author: "MD Sahidul Islam Sobuj",
        imageSrc: "/evidence/source/navy-comment-6-sahidul-islam-sobuj.png",
        imageAlt: "Comment from MD Sahidul Islam Sobuj on the Bangladesh Navy's condolence post",
        translatedText:
          "\"We have so much affection for these murtad army members, who lost their lives serving the UN to carry out the Western agenda — how justified is showing that much love for them? Fighting Muslim brothers in Sudan isn't called extremism.\"",
      },
    ],
  },
  {
    id: "mainstream-media",
    org: "Face The People — Bengali digital media outlet",
    name: "Face The People",
    dateLabel: "Dec 2025",
    translatedSummary:
      "\"6 Bangladeshi peacekeepers killed in a drone attack at a UN base in Sudan\" — video report. Hostile replies underneath call withdrawing from the mission a religious duty and mock the state for calling the deaths a loss.",
    imageSrc: "/evidence/source/face-the-people-mainstream-media-post.png",
    imageAlt: "A video report from the Bengali digital outlet Face The People on the Sudan drone strike, with hostile Bengali-language comments visible beneath it",
    sourceUrl: "https://www.facebook.com/reel/1803518986962025",
    comments: [
      {
        author: "Abdullah Adnan",
        imageSrc: "/evidence/source/media-comment-1-abdullah-adnan.png",
        imageAlt: "Comment from Abdullah Adnan under the Face The People video report",
        translatedText:
          "\"Killed the mujahideen. The 'peacekeeping' force killed the apostate Bengalis.\"",
      },
      {
        author: "Hm Ishaque",
        imageSrc: "/evidence/source/media-comment-2-hm-ishaque.png",
        imageAlt: "Comment from Hm Ishaque under the Face The People video report",
        translatedText: "\"Killed at the hands of Sudan's mujahideen heroes.\"",
      },
      {
        author: "Mis Ba H",
        imageSrc: "/evidence/source/media-comment-3-mis-ba-h.png",
        imageAlt: "Comment from Mis Ba H under the Face The People video report",
        translatedText: "\"Alhamdulillah, may Allah burn them in the fire of hell. Ameen, O Lord of the worlds.\"",
      },
      {
        author: "Rahatul Islam",
        imageSrc: "/evidence/source/media-comment-4-rahatul-islam.png",
        imageAlt: "Comment from Rahatul Islam under the Face The People video report",
        translatedText: "\"All 6 died from the mujahideen's bullets — they've reached hell.\"",
      },
    ],
  },
];

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function ScreenshotPost({
  post,
  badge = "Verified screenshot",
  imageSrc,
  imageAlt,
  caption,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  open: openProp,
  onOpenChange,
}: {
  post: ConversationPost;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const src = imageSrc ?? post.imageSrc;
  const alt = imageAlt ?? post.imageAlt;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
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
      if (event.key === "ArrowRight" && hasNext) onNext?.();
      if (event.key === "ArrowLeft" && hasPrev) onPrev?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasNext, hasPrev]);

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

  if (post.pending) {
    return (
      <div className="space-y-2">
        <div className="flex min-h-[160px] items-center justify-center border border-dashed border-[var(--border)] bg-[var(--surface)]">
          <p className="p-6 text-center text-sm text-[var(--muted)]">Screenshot pending publication.</p>
        </div>
        {post.translatedSummary ? (
          <p className="line-clamp-2 text-sm italic leading-snug text-[var(--muted)]">{post.translatedSummary}</p>
        ) : null}
        {post.sourceUrl ? (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
          >
            View archived source ↗
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block max-h-[300px] min-h-[160px] w-full cursor-zoom-in overflow-hidden border border-[var(--border)] bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        aria-label={`View ${post.name}'s ${badge.toLowerCase()} enlarged`}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="h-auto max-h-[300px] w-full object-contain"
        />
      </button>
      {caption ?? post.translatedSummary ? (
        <p className="line-clamp-2 text-sm italic leading-snug text-[var(--muted)]">{caption ?? post.translatedSummary}</p>
      ) : null}

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Enlarged view: ${post.name}'s ${badge.toLowerCase()}`}
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

          {onPrev ? (
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous"
              className="fixed left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
          ) : null}
          {onNext ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next"
              className="fixed right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          ) : null}

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
    </div>
  );
}

function CommentChip({ comment, onOpen }: { comment: Comment; onOpen: () => void }) {
  return (
    <div className="thread-comment thread-reply">
      <span className="thread-badge">Reply</span>
      <span className="thread-avatar reply" aria-hidden="true">
        <UserRoundX className="thread-avatar-icon" />
      </span>
      <div className="thread-body">
        <p className="thread-name">
          {comment.author} <span className="thread-time">· reply</span>
        </p>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${comment.author}'s comment enlarged`}
          className="relative mt-1 block max-h-[130px] w-full cursor-zoom-in overflow-hidden border border-[var(--border)] bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <Image
            src={comment.imageSrc}
            alt={comment.imageAlt}
            width={1200}
            height={600}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-auto max-h-[130px] w-full object-contain"
          />
        </button>
        <div className="thread-footer">
          <span>Like</span>
          <span>Reply</span>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}

function CommentSlider({ comments }: { comments: Comment[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const active = comments[index];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(comments.length - 1, i + 1));

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
    if (paused || lightboxOpen || comments.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % comments.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, lightboxOpen, comments.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    closeButtonRef.current?.focus();
    resetZoom();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "+" || event.key === "=") zoomBy(0.5);
      if (event.key === "-") zoomBy(-0.5);
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, comments.length]);

  useEffect(() => {
    resetZoom();
  }, [index]);

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
    <div className="space-y-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Comment {index + 1} of {comments.length} — {active.author}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-stretch justify-start border border-[var(--border)] bg-[var(--surface)] p-1"
      >
        <motion.span
          className="absolute inset-y-1 left-1 w-8 bg-[var(--accent)]"
          animate={{ x: index * 32 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
        {comments.map((comment, i) => (
          <button
            key={comment.author}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show comment from ${comment.author}`}
            aria-current={i === index}
            className="relative z-10 w-8 py-1 text-center"
          >
            <span
              className={`relative font-mono text-xs font-semibold transition ${
                i === index ? "text-[var(--background)]" : "text-[var(--muted)]"
              }`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.author}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
        >
          <CommentChip comment={active} onOpen={() => setLightboxOpen(true)} />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)] transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={index === comments.length - 1}
          className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)] transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
        >
          Next →
        </button>
      </div>

      {lightboxOpen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Enlarged view: ${active.author}'s comment`}
              className="fixed inset-0 z-[200] flex touch-none items-center justify-center overflow-hidden bg-black/90 p-6"
              onWheel={onWheel}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close enlarged view"
                className="fixed right-4 top-4 z-10 flex size-10 items-center justify-center border border-white/30 bg-black/60 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                aria-label="Previous comment"
                className="fixed left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={index === comments.length - 1}
                aria-label="Next comment"
                className="fixed right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white transition disabled:opacity-30 hover:not-disabled:text-[var(--accent)]"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              <span className="fixed bottom-16 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-white/70">
                Comment {index + 1} of {comments.length} — {active.author}
              </span>

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
                  src={active.imageSrc}
                  alt={active.imageAlt}
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
    </div>
  );
}

export function IncidentPostSlider({ posts: incidentPosts }: { posts: ConversationPost[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = incidentPosts[index];

  const goPrev = () => setIndex((i) => (i - 1 + incidentPosts.length) % incidentPosts.length);
  const goNext = () => setIndex((i) => (i + 1) % incidentPosts.length);

  useEffect(() => {
    if (paused || lightboxOpen || incidentPosts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % incidentPosts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, lightboxOpen, incidentPosts.length]);

  return (
    <div className="space-y-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          Post {index + 1} of {incidentPosts.length} — {active.name}
        </span>
      </div>

      <div className="relative inline-flex items-stretch justify-start border border-[var(--border)] bg-[var(--surface)] p-1">
        <motion.span
          className="absolute inset-y-1 left-1 w-8 bg-[var(--accent)]"
          animate={{ x: index * 32 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
        {incidentPosts.map((post, i) => (
          <button
            key={post.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show post from ${post.name}`}
            aria-current={i === index}
            className="relative z-10 w-8 py-1 text-center"
          >
            <span
              className={`relative font-mono text-xs font-semibold transition ${
                i === index ? "text-[var(--background)]" : "text-[var(--muted)]"
              }`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
        >
          <ScreenshotPost
            post={active}
            badge="Verified post"
            onPrev={goPrev}
            onNext={goNext}
            hasPrev
            hasNext
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)] transition hover:text-[var(--accent)]"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)] transition hover:text-[var(--accent)]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function ExhibitPair({ post, showComments = true }: { post: ConversationPost; showComments?: boolean }) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScreenshotPost post={post} badge="Verified post" />
      </motion.div>
      {!showComments ? null : (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {post.comments?.length ? (
            <CommentSlider comments={post.comments} />
          ) : (
            <div className="reframe-thread">
              <div className="thread-comment items-center border-dashed">
                <span className="thread-badge">Comments pending</span>
                <p className="thread-text">Comment-section screenshots for this post are not yet published.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const nationalEventPost: ConversationPost = {
  id: "un-source",
  org: "UN News",
  name: "Six peacekeepers killed in Abyei, Sudan",
  dateLabel: "Dec 15, 2025",
  translatedSummary:
    "\"Six peacekeepers laid to rest following deadly drone attack in Sudan\" — UN News, UNISFA. State leaders and major political figures issued public condolences in the aftermath.",
  imageSrc: "/evidence/source/un-sudan-peacekeepers.png",
  imageAlt: "UN News article: 'Six peacekeepers laid to rest following deadly drone attack in Sudan,' with a UNISFA photo of a memorial ceremony in Abyei",
};

function NewspaperReveal({ post, revealed }: { post: ConversationPost; revealed: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: "blur(18px)" }}
      animate={
        revealed
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 48, filter: "blur(18px)" }
      }
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <ScreenshotPost post={post} badge="Verified post" />
    </motion.div>
  );
}

function ScrollRevealComments({ comments, index }: { comments: Comment[]; index: number }) {
  const active = comments[index];
  return (
    <div className="mt-4 space-y-2">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
        Comment {index + 1} of {comments.length} — {active.author}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.author}
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(14px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="thread-comment thread-reply">
            <span className="thread-badge">Reply</span>
            <span className="thread-avatar reply" aria-hidden="true">
              <UserRoundX className="thread-avatar-icon" />
            </span>
            <div className="thread-body">
              <p className="thread-name">
                {active.author} <span className="thread-time">· reply</span>
              </p>
              <div className="relative mt-1 block max-h-[130px] w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  width={1200}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="h-auto max-h-[130px] w-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const FLAGGED_TERMS = /murtad|taghut|apostate/i;

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function PatternReveal({ onClose }: { onClose: () => void }) {
  const [clustered, setClustered] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allTriggeringComments = [
    ...posts.flatMap((post) =>
      (post.comments ?? []).map((comment) => ({
        author: comment.author,
        postName: post.name,
        text: comment.translatedText,
        flagged: FLAGGED_TERMS.test(comment.translatedText),
      })),
    ),
    ...marchForGazaPosts.map((post) => ({
      author: post.name,
      postName: "March for Gaza",
      text: post.translatedSummary,
      flagged: FLAGGED_TERMS.test(post.translatedSummary),
    })),
    ...dhanmondi32Posts.map((post) => ({
      author: post.name,
      postName: "Dhanmondi 32",
      text: post.translatedSummary,
      flagged: FLAGGED_TERMS.test(post.translatedSummary),
    })),
  ];

  useEffect(() => {
    const t = setTimeout(() => setClustered(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, []);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Pattern across all posts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] overflow-hidden bg-black"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 text-white/70 transition hover:text-white"
      >
        <X className="size-6" aria-hidden="true" />
      </button>
      <div className="relative mx-auto h-full max-w-5xl">
        {allTriggeringComments.map((c, i) => {
          const sx = 10 + pseudoRandom(i) * 80;
          const sy = 15 + pseudoRandom(i + 0.5) * 70;
          const cx = 50 + (pseudoRandom(i + 1000) - 0.5) * 22;
          const cy = 46 + (pseudoRandom(i + 2000) - 0.5) * 22;
          const clusteredPos = c.flagged
            ? { left: `${cx}%`, top: `${cy}%`, opacity: 1, scale: 1.4 }
            : { left: `${sx}%`, top: `${sy}%`, opacity: 0.12, scale: 0.8 };
          const scatteredPos = { left: `${sx}%`, top: `${sy}%`, opacity: 0.85, scale: 1 };
          const target = clustered ? clusteredPos : scatteredPos;
          return (
            <motion.button
              key={`${c.postName}-${c.author}-${i}`}
              type="button"
              aria-label={`${c.author}, ${c.postName}: ${c.text}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              onClick={() => setActiveIndex((cur) => (cur === i ? null : i))}
              className="absolute max-w-[42vw] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation truncate border-0 bg-transparent p-1 font-mono text-[10px] uppercase tracking-[0.04em] sm:max-w-none sm:whitespace-nowrap"
              style={{
                color: c.flagged ? "var(--warning)" : "var(--muted)",
                outline: activeIndex === i ? "2px solid white" : "none",
                outlineOffset: 3,
              }}
              initial={{ ...clusteredPos, opacity: 0, scale: clusteredPos.scale * 0.7 }}
              animate={target}
              transition={{
                type: "spring",
                stiffness: 45,
                damping: 16,
                delay: clustered ? pseudoRandom(i + 3000) * 0.6 : i * 0.045,
              }}
            >
              {c.author}
            </motion.button>
          );
        })}
        <AnimatePresence>
          {clustered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 bg-black/90 px-10 py-8 text-center shadow-[0_0_80px_20px_rgba(0,0,0,0.9)]"
            >
              <p className="font-serif text-5xl italic sm:text-6xl" style={{ color: "var(--warning)" }}>
                &ldquo;murtad&rdquo; · &ldquo;taghut&rdquo;
              </p>
              <p className="mx-auto mt-6 max-w-md font-mono text-base uppercase leading-relaxed tracking-[0.08em] text-white sm:text-lg">
                The same accusation, repeated by different accounts:
              </p>
              <p className="mt-3 font-mono text-sm uppercase leading-relaxed tracking-[0.06em] text-white/70">
                Tarique Rahman · Bangladesh Navy · Jamaat-e-Islami · March for Gaza · Dhanmondi 32
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeIndex !== null && allTriggeringComments[activeIndex] ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-30 mx-auto w-full max-w-md px-4"
          >
            <div className="border border-white/20 bg-black/90 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/60">
                {allTriggeringComments[activeIndex].author} · {allTriggeringComments[activeIndex].postName}
              </p>
              <p className="mt-1 text-sm leading-6 text-white">{allTriggeringComments[activeIndex].text}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}

const triggeringEventCards: { title: string; intro: React.ReactNode }[] = [
  {
    title: "The Prime Minister's condolence post",
    intro: (
      <p>
        Posted hours after the strike. The comment section is entered by accounts calling the dead &quot;murtad&quot;
        and &quot;taghut,&quot; disputing their martyrdom status.
      </p>
    ),
  },
  {
    title: "The opposition party's condolence post",
    intro: (
      <p>
        At least 28 of 97 comments on this post used the term &quot;murtad&quot; directly, mocking the
        &quot;martyr&quot; framing.
      </p>
    ),
  },
  {
    title: "The official Navy page's condolence post",
    intro: (
      <p>
        The same reframing pattern repeats on the Navy&apos;s own page — an official institutional account, not a
        fringe one.
      </p>
    ),
  },
  {
    title: "A pattern, not an isolated reaction",
    intro: (
      <p>
        Across all three condolence posts, accounts disputed and mocked the framing of the dead as martyrs —
        comparable hostile rhetoric also surfaced across mainstream media commentary in the same period.
      </p>
    ),
  },
];

export function TriggeringEventDeck({ onShowPattern }: { onShowPattern?: () => void }) {
  return (
    <section
      id="triggering-event"
      aria-labelledby="triggering-event-title"
      className="dark-chapter scroll-mt-24 border-t border-[var(--border)] px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-[var(--accent)]">Triggering event</p>
        <h2 id="triggering-event-title" className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight">
          How public mourning was reframed
        </h2>

        <div className="mt-10 space-y-16">
          {posts.map((post, index) => (
            <div
              key={post.id}
              id={`trigger-post-${post.id}`}
              className={`scroll-mt-24 ${index > 0 ? "border-t border-[var(--border)] pt-16" : ""}`}
            >
              <h3 className="text-xl font-semibold leading-snug">{triggeringEventCards[index].title}</h3>
              <div className="mt-2 text-sm leading-6 text-[var(--muted)]">{triggeringEventCards[index].intro}</div>
              {post.sourceUrl ? (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block w-fit font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
                >
                  Original post, {post.dateLabel} ↗
                </a>
              ) : null}

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <ScreenshotPost post={post} badge="Verified post" />
                {post.comments?.length ? <CommentSlider comments={post.comments} /> : null}
              </div>
            </div>
          ))}
        </div>

        {onShowPattern ? (
          <div className="mt-10">
            <button
              type="button"
              onClick={onShowPattern}
              className="inline-flex items-center gap-2 border border-[var(--accent)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--dark-section)]"
            >
              See the full pattern →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function TriggeringVisual({ step, stepProgress }: { step: number; stepProgress?: number }) {
  const progress = stepProgress ?? 1;
  const activePost = posts[Math.min(step, posts.length - 1)];
  const [introDone, setIntroDone] = useState<Record<string, boolean>>({});

  const postId = activePost?.id ?? "national-event";
  const hasComments = Boolean(activePost?.comments?.length);
  const introActive = hasComments && !introDone[postId];

  const revealProgress = Math.min(1, progress / 0.3);
  const commentPhase = Math.max(0, Math.min(1, (progress - 0.3) / 0.7));
  const commentCount = activePost?.comments?.length ?? 0;
  const commentIndex = commentCount > 0 ? Math.min(commentCount - 1, Math.floor(commentPhase * commentCount)) : 0;

  useEffect(() => {
    if (introActive && progress >= 0.98) {
      setIntroDone((prev) => ({ ...prev, [postId]: true }));
    }
  }, [introActive, progress, postId]);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={postId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {introActive && activePost ? (
            <>
              <NewspaperReveal post={activePost} revealed={revealProgress >= 0.4} />
              {activePost.comments?.length ? (
                <ScrollRevealComments comments={activePost.comments} index={commentIndex} />
              ) : null}
            </>
          ) : (
            <ExhibitPair post={activePost ?? nationalEventPost} showComments={activePost !== null} />
          )}
          {activePost?.id === "opposition-party" ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 font-mono text-lg"
            >
              <CountValue value="28" /> of <CountValue value="97" /> comments on this post used the term “murtad.”
            </motion.p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function TimelineVisual({ step }: { step: number }) {
  const report = useReportContent();
  const points = report.timeline;
  const incidents = points.slice(1);
  const [expanded, setExpanded] = useState<number | null>(null);
  const expandedPoint = expanded !== null ? points[expanded] : null;

  const viewW = 900;
  const viewH = 660;
  const hub = { x: 250, y: 330 };

  const round = (n: number) => Math.round(n * 100) / 100;
  const toXY = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: round(hub.x + r * Math.cos(rad)), y: round(hub.y + r * Math.sin(rad)) };
  };
  const toPct = (p: { x: number; y: number }) => ({ left: `${(p.x / viewW) * 100}%`, top: `${(p.y / viewH) * 100}%` });

  const incidentSpread = incidents.length > 1 ? 140 : 0;
  const incidentStart = -incidentSpread / 2;
  const incidentAngle = (i: number) =>
    incidents.length > 1 ? incidentStart + i * (incidentSpread / (incidents.length - 1)) : 0;

  const hubPos = toPct(hub);

  return (
    <div className="root-timeline-visual">
      <div className="relative w-full min-h-[440px] sm:min-h-0" style={{ aspectRatio: `${viewW} / ${viewH}` }}>
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {incidents.map((point, i) => {
            const pi = i + 1;
            const passed = pi <= step;
            const angle = incidentAngle(i);
            const end = toXY(angle, 250);
            const mid = toXY(angle, 140);
            const d = `M ${hub.x} ${hub.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
            return (
              <g key={point.year}>
                <path d={d} fill="none" stroke="var(--border)" strokeWidth={3} strokeOpacity={0.35} />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  initial={false}
                  animate={{ pathLength: passed ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <circle cx={end.x} cy={end.y} r={4} fill="var(--accent)" opacity={passed ? 1 : 0.35} />
              </g>
            );
          })}

          <circle cx={hub.x} cy={hub.y} r={14} fill="var(--accent)" />
        </svg>

        {incidents.map((point, i) => {
          const pi = i + 1;
          const active = pi === step;
          const passed = pi <= step;
          const clickable = passed && Boolean(point.sourceLinks?.length || point.breakdown?.length);
          const angle = incidentAngle(i);
          const pos = toPct(toXY(angle, 250));
          return (
            <button
              key={point.year}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && setExpanded(pi)}
              className="absolute w-28 -translate-y-1/2 translate-x-2 border text-center transition disabled:cursor-default sm:w-40"
              style={{
                left: pos.left,
                top: pos.top,
                opacity: passed ? 1 : 0.45,
                borderColor: clickable ? "var(--accent)" : "transparent",
                background: clickable ? "color-mix(in srgb, var(--accent) 10%, var(--surface-elevated))" : "transparent",
                padding: clickable ? "0.5rem 0.6rem" : "0",
                cursor: clickable ? "pointer" : "default",
                boxShadow: active ? "0 0 0 1px var(--accent)" : "none",
              }}
            >
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: passed ? "var(--accent)" : "var(--muted)" }}
              >
                {point.year}
              </p>
              <p className="mt-1 text-[11px] font-medium leading-snug text-[var(--foreground)]">{point.title}</p>
              {clickable ? (
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--accent)" }}>
                  {point.sourceLinks?.length ?? 0} sources — click to view →
                </p>
              ) : null}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setExpanded(0)}
          className="absolute w-28 -translate-x-1/2 translate-y-[-135%] border text-center transition sm:w-40 lg:-ml-4 lg:-translate-x-full lg:translate-y-[-50%]"
          style={{
            left: hubPos.left,
            top: hubPos.top,
            borderColor: "var(--accent)",
            background: "color-mix(in srgb, var(--accent) 16%, var(--surface-elevated))",
            padding: "0.5rem 0.6rem",
            cursor: "pointer",
            boxShadow: step === 0 ? "0 0 0 1px var(--accent)" : "none",
          }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--accent)" }}>
            {points[0]?.year} · Origin
          </p>
          <p className="mt-1 text-[12px] font-semibold leading-snug text-[var(--foreground)]">{points[0]?.title}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--accent)" }}>
            Click to view →
          </p>
        </button>
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {expandedPoint ? (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div
                    className="absolute inset-0 bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpanded(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-left shadow-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(null)}
                      aria-label="Close"
                      className="absolute right-3 top-3 text-[var(--muted)] transition hover:text-[var(--foreground)]"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                      {expandedPoint.year}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{expandedPoint.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{expandedPoint.description}</p>

                    {(expandedPoint.roots ?? expandedPoint.breakdown)?.length ? (
                      <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-4">
                        {(expandedPoint.roots ?? expandedPoint.breakdown)!.map((item) => (
                          <div key={item.label} className="border-l-2 pl-3" style={{ borderColor: "var(--warning)" }}>
                            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--warning)" }}>
                              {item.label}
                            </p>
                            <p className="mt-1 text-sm text-[var(--muted)]">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {expandedPoint.sourceLinks?.length ? (
                      <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-4">
                        {expandedPoint.sourceLinks.map((link) => (
                          <div key={link}>
                            <LinkPreviewCard
                              url={link}
                              fallbackImage={
                                link.includes("dawahilallah.com")
                                  ? "/evidence/source/dawah-ilallah-forum-post.png"
                                  : undefined
                              }
                              fallbackTitle={
                                link.includes("dawahilallah.com")
                                  ? "বাংলাদেশ সেনাবাহিনী হচ্ছে দলগতভাবে একটি মুরতাদ বাহিনী - দাওয়াহ ইলাল্লাহ"
                                  : undefined
                              }
                              fallbackDescription={
                                link.includes("dawahilallah.com")
                                  ? "web.archive.org — Dawah Ilallah forum, sticky post"
                                  : undefined
                              }
                            />
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
                            >
                              Go to permanent archive ↗
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

export function NarrativeVisual({ index }: { index: number }) {
  const labels = ["Route motif", "Comment space", "Incident strip", "Redacted document"];
  return (
    <div className={`narrative-visual motif-${index}`}>
      <p className="eyebrow text-[var(--muted)]">{labels[index]}</p>
      <div className="mt-8 h-56 border border-[var(--border)] bg-[var(--background)]">
        <svg viewBox="0 0 420 220" className="h-full w-full" role="img" aria-label={`${labels[index]} visual placeholder`}>
          <path d="M30 150 C 120 40, 260 210, 390 70" fill="none" stroke="var(--data-secondary)" strokeWidth="2" strokeDasharray={index === 0 ? "4 8" : "0"} />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={42 + i * 58} y={index === 3 ? 48 + i * 18 : 90 + (i % 2) * 28} width="40" height="12" fill={i % 2 ? "var(--border)" : "var(--accent-muted)"} />
          ))}
          {index === 2 ? <line x1="40" y1="175" x2="380" y2="175" stroke="var(--foreground)" strokeWidth="1" /> : null}
        </svg>
      </div>
    </div>
  );
}

export const marchForGazaPosts: ConversationPost[] = [
  {
    id: "march-for-gaza-1",
    org: "Unverified account",
    name: "Azmayen Haque Abir",
    dateLabel: "Apr 12, 2025",
    translatedSummary:
      "\"Army ❌ Taghut force ✅\" — sharing a Jamuna TV clip captioned 'As soon as they see a black flag, the army confiscates it — searches underway.'",
    imageSrc: "/evidence/source/gaza-post-1-azmayen-haque-abir.png",
    imageAlt: "Facebook post from Azmayen Haque Abir, dated April 12, 2025, relabeling the army as a 'taghut force' over Kalima flag confiscation",
    sourceUrl:
      "https://megalodon.jp/2026-0812-0650-15/https://www.facebook.com:443/azmayen.haque.abir/posts/pfbid02RCwxbTv8TG4Qt3PMqXoQXAFEThAgaqLmYmzz2TPX2L2dK1YPYCjCqeC9BJMf1XkPl",
  },
  {
    id: "march-for-gaza-2",
    org: "Unverified account",
    name: "Rayhan Juba",
    dateLabel: "Apr 12, 2025",
    translatedSummary:
      "\"How dare you question Muslims' identity — the Kalima flag alone, and you obstruct its flying. These are murtad forces, they went to South Sudan and are now firing bullets on Muslims.\"",
    imageSrc: "/evidence/source/gaza-post-2-rayhan-juba.png",
    imageAlt: "Facebook post from Rayhan Juba, dated April 12, 2025, calling the army 'murtad forces' over Kalima flag confiscation",
    sourceUrl:
      "https://megalodon.jp/2026-0814-0317-35/https://www.facebook.com:443/Rayhan.Sharif.74/posts/pfbid0YFiuLWRpcFwZ4KNn93GoP8Y5dbrRs4dhLowRQac522DwGNiTEn4c18v629xfW875l",
  },
  {
    id: "march-for-gaza-3",
    org: "Unverified account",
    name: "Mahmud Al-Hasan Nayem",
    dateLabel: "Apr 12, 2025",
    translatedSummary:
      "\"Murtad army — Allah will soon disgrace this oppressor.\" Long post arguing other flags are tolerated but the Kalima flag alone is confiscated, citing hadith on battle banners.",
    imageSrc: "/evidence/source/gaza-post-3-mahmud-al-hasan-nayem.png",
    imageAlt: "Facebook post from Mahmud Al-Hasan Nayem, dated April 12, 2025, calling the army 'murtad' over Kalima flag confiscation",
    sourceUrl: "https://megalodon.jp/2026-0814-0324-54/https://www.facebook.com:443/nayem.mahmud.3954/videos/569551019496193/",
  },
];

export const dhanmondi32Posts: ConversationPost[] = [
  {
    id: "dhanmondi-32-1",
    org: "Unverified account",
    name: "Abu Bakker Siddique",
    dateLabel: "Nov 21, 2025",
    translatedSummary:
      "\"The army is the pet dog of Taghut rulers\" — #We_are_Saiful_islam graphic, posted in support of the individual rallied around after the Dhanmondi 32 intervention.",
    imageSrc: "/evidence/source/dhanmondi-post-1-abu-bakker-siddique.png",
    imageAlt: "Facebook post from Abu Bakker Siddique, dated November 21, 2025, calling the army 'the pet dog of Taghut rulers' with the hashtag #We_are_Saiful_islam",
    sourceUrl:
      "https://megalodon.jp/2026-0812-0630-54/https://www.facebook.com:443/taimura.lana/posts/pfbid02ZMidKaXPXNtLPWXBjPfJT2aVCBLUUyrh8t7zW7jx1cwhMiEDY6VeqWyieUrfS6bil",
  },
  {
    id: "dhanmondi-32-2",
    org: "Unverified account",
    name: "Mahfujur Rahman Shanto",
    dateLabel: "Nov 21, 2025",
    translatedSummary:
      "\"Is every member of the army a murtad? Answer: yes, every one.\" A long theological post arguing all army members are apostates, either directly or through complicity.",
    imageSrc: "/evidence/source/dhanmondi-post-2-mahfujur-rahman-shanto.png",
    imageAlt: "Facebook post from Mahfujur Rahman Shanto, dated November 21, 2025, arguing all army members are 'murtad' on theological grounds",
    sourceUrl:
      "https://megalodon.jp/2026-0814-0400-22/https://www.facebook.com:443/mahfujurshanto/posts/pfbid02x7rLy8gPB1kpFZWE7Q9Ca91gYeDGkUqTwfy69VwYKpRv7HN7onmTWDU61GJreshAl",
  },
];
