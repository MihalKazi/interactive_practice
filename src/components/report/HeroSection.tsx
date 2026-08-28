"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[80vh] overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:min-h-[85vh] lg:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/evidence/source/hero-jamaat-condolence-post-v2.png"
          alt="Comment replies calling the Bangladesh Jamaat page's condolence post 'murtad' and 'taghut'"
          fill
          priority
          sizes="100vw"
          className="object-contain object-right opacity-90 min-[1441px]:object-center"
        />
        <div className="hero-scrim-diagonal absolute inset-0" />
      </div>

      <Container className="relative grid min-h-[calc(80vh-8rem)] items-center gap-12">
        <div className="max-w-3xl">
          <motion.h1
            className="headline-hero font-serif tracking-[-0.01em] text-[var(--foreground)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.08 }}
          >
            How &quot;Murtad&quot; became a recurring narrative against Bangladesh&apos;s armed forces
          </motion.h1>

          <motion.span
            className="mt-4 block h-[3px] w-24 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.24 }}
          >
            By Activate Rights · August 12, 2026
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
