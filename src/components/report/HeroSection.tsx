"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const DECODE_WORDS = ["MURTAD", "TAGHUT", "APOSTATE"];

function HeroPhoto() {
  return (
    <div className="hero-redaction" aria-hidden="true">
      <div className="hero-redaction-photo">
        <Image
          src="/evidence/source/hero-jamaat-condolence-post-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-right min-[1441px]:object-center"
        />
      </div>
    </div>
  );
}

function DecodingHeadline() {
  const reduceMotion = useReducedMotion();
  const totalTicks = DECODE_WORDS.length * 2;
  const [index, setIndex] = useState(0);
  const settled = Boolean(reduceMotion) || index >= totalTicks;

  useEffect(() => {
    if (settled) return;
    const t = setTimeout(() => setIndex((i) => i + 1), 110);
    return () => clearTimeout(t);
  }, [index, settled]);

  return (
    <div className="mt-7">
      <motion.h1
        className="headline-xl max-w-5xl font-serif tracking-[-0.02em] text-[var(--foreground)]"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.08 }}
      >
        {settled ? "Murtad" : DECODE_WORDS[index % DECODE_WORDS.length]}
      </motion.h1>
      {settled ? (
        <motion.p
          className="mt-3 max-w-2xl font-serif text-[clamp(1.4rem,3.2vw,2.25rem)] leading-snug text-[var(--muted)]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.12 }}
        >
          became a recurring narrative against Bangladesh&apos;s armed forces
        </motion.p>
      ) : null}
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:py-24">
      <HeroPhoto />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="hero-scrim-diagonal absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, var(--background) 0%, transparent 30%, transparent 80%, color-mix(in srgb, var(--background) 60%, transparent) 100%)" }}
        />
      </div>

      <Container className="relative grid min-h-[calc(90vh-8rem)] items-center gap-12">
        <div className="max-w-5xl">
          <DecodingHeadline />
          <motion.span
            className="mt-4 block h-[3px] w-24 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            By Activate Rights · August 12, 2026
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
