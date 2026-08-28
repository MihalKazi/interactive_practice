"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function GunIcon() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 112 34"
      className="pointer-events-none absolute"
      style={{
        top: "50%",
        left: "-3.6rem",
        width: "3rem",
        height: "0.95rem",
        marginTop: "-0.475rem",
      }}
      fill="none"
      initial={{ opacity: 1, x: 0 }}
      animate={{ x: [0, -3, 1.5, 0], opacity: [1, 1, 1, 0] }}
      transition={{ duration: 0.5, delay: 0.28, times: [0, 0.1, 0.2, 1], ease: "easeOut" }}
    >
      {/* stock */}
      <path d="M0 15 L14 13 L16 21 L2 22 Z" fill="var(--foreground)" />
      {/* pistol grip */}
      <path d="M17 22 L23 33 L28 33 L25 21 Z" fill="var(--foreground)" />
      {/* receiver / body */}
      <rect x="14" y="9" width="30" height="10" rx="1.2" fill="var(--foreground)" />
      {/* rear sight */}
      <rect x="18" y="6" width="4" height="4" rx="0.6" fill="var(--foreground)" />
      {/* curved banana magazine */}
      <path
        d="M30 19 C 27 24, 24 29, 22 34 L 28 34 C 31 28, 34 23, 37 19 Z"
        fill="var(--foreground)"
      />
      {/* handguard / gas tube */}
      <rect x="44" y="12" width="30" height="4.5" rx="1" fill="var(--muted)" />
      {/* barrel */}
      <rect x="74" y="13.2" width="34" height="2.2" rx="1" fill="var(--muted)" />
      {/* front sight post */}
      <rect x="104" y="8" width="2.4" height="8" fill="var(--foreground)" />
    </motion.svg>
  );
}

function ImpactSequence({ letter }: { letter: string }) {
  return (
    <>
      <motion.span
        className="inline-block"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -2, 1.5, 0], y: [0, 1.5, -1, 0] }}
        transition={{ duration: 0.28, delay: 0.42, ease: "easeOut" }}
      >
        {letter}
      </motion.span>

      <GunIcon />

      {/* muzzle flash */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "50%",
          left: "-0.75em",
          width: "0.4em",
          height: "0.4em",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle, #fff 0%, var(--warning) 45%, transparent 75%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.18, delay: 0.28, ease: "easeOut" }}
      />

      {/* bullet streak */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: "-0.6em",
          width: "1.2em",
          height: "2px",
          transform: "translateY(-50%) rotate(-24deg)",
          background: "linear-gradient(90deg, transparent, var(--warning))",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.14, delay: 0.3, ease: "easeIn" }}
      />

      {/* impact flash */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "-0.05em",
          right: "-0.1em",
          width: "0.5em",
          height: "0.5em",
          background: "radial-gradient(circle, #fff 0%, var(--warning) 45%, transparent 75%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.6, 0.9], opacity: [0, 1, 0] }}
        transition={{ duration: 0.35, delay: 0.42, ease: "easeOut" }}
      />

      {/* shockwave ring */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full border"
        style={{
          top: "-0.05em",
          right: "-0.1em",
          width: "0.5em",
          height: "0.5em",
          borderColor: "color-mix(in srgb, var(--warning) 80%, transparent)",
        }}
        initial={{ scale: 0.3, opacity: 0.9 }}
        animate={{ scale: 3.2, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.46, ease: "easeOut" }}
      />

      {/* impact point */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "0em",
          right: "-0.06em",
          width: "0.16em",
          height: "0.16em",
          background: "color-mix(in srgb, var(--warning) 85%, black)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15, delay: 0.44 }}
      />

      {/* fracture lines */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "-0.12em",
          right: "-0.24em",
          width: "0.6em",
          height: "0.6em",
          background:
            "repeating-conic-gradient(color-mix(in srgb, var(--warning) 70%, transparent) 0deg 2deg, transparent 2deg 26deg)",
          WebkitMaskImage: "radial-gradient(circle, black 15%, transparent 68%)",
          maskImage: "radial-gradient(circle, black 15%, transparent 68%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.48, ease: "easeOut" }}
      />
    </>
  );
}

export function ImpactDropCap({ letter }: { letter: string }) {
  const reduceMotion = useReducedMotion();
  const [fired, setFired] = useState(false);
  const [fireKey, setFireKey] = useState(0);
  const hasFiredOnView = useRef(false);

  if (reduceMotion) {
    return (
      <span className="float-left mr-2 font-serif text-6xl font-semibold leading-[0.85] text-[var(--accent)]">
        {letter}
      </span>
    );
  }

  return (
    <span
      className="relative float-left mr-2 inline-block cursor-pointer font-serif text-6xl font-semibold leading-[0.85] text-[var(--accent)]"
      onMouseEnter={() => {
        setFired(true);
        setFireKey((k) => k + 1);
      }}
    >
      <motion.span
        className="absolute inset-0"
        aria-hidden="true"
        style={{ visibility: "hidden" }}
        viewport={{ once: true, amount: 0.8 }}
        onViewportEnter={() => {
          if (!hasFiredOnView.current) {
            hasFiredOnView.current = true;
            setFired(true);
          }
        }}
      />
      {fired ? <ImpactSequence key={fireKey} letter={letter} /> : letter}
    </span>
  );
}
