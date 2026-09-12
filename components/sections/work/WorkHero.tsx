"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useFitText } from "@/lib/useFitText";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WorkHero({ title }: { title: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const { textRef, fontSize } = useFitText<HTMLHeadingElement>(containerRef);

  return (
    <motion.header
      ref={containerRef}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <h1
        ref={textRef}
        className="font-display text-bone font-bold leading-[1.05] tracking-[-0.04em] md:whitespace-nowrap max-md:!whitespace-nowrap max-md:!visible"
        style={{
          fontSize: fontSize ? `${fontSize}px` : "clamp(36px, 5vw, 96px)",
          visibility: fontSize ? "visible" : "hidden",
        }}
      >
        {title}
      </h1>
    </motion.header>
  );
}
