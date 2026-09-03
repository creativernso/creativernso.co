"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LegalTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="font-display text-bone text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.04em]"
    >
      {children}
    </motion.h1>
  );
}

export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mt-10 space-y-9 text-[15px] leading-[1.7] text-muted-2 md:text-[16px]"
    >
      {children}
    </motion.div>
  );
}
