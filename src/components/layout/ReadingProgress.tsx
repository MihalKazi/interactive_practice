"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-0.5 origin-left bg-[var(--accent)]"
      style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
      aria-hidden="true"
    />
  );
}
