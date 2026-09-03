"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFitText } from "@/lib/useFitText";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MarkGrid({
  title,
  desc,
  marks,
}: {
  title: string;
  desc: string;
  marks: string[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridTitle = useFitText<HTMLHeadingElement>(gridRef);

  return (
    <div className="mt-24 md:mt-32">
      <motion.h2
        ref={gridTitle.textRef}
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="font-display text-bone font-bold leading-[1.1] tracking-[-0.04em]"
        style={{
          fontSize: gridTitle.fontSize
            ? `${gridTitle.fontSize}px`
            : "clamp(36px, 5vw, 96px)",
          visibility: gridTitle.fontSize ? "visible" : "hidden",
        }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
        className="mt-3 text-[15px] text-muted-2 md:text-[18px]"
      >
        {desc}
      </motion.p>

      <motion.div
        ref={gridRef}
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-10"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      >
        <div className="grid grid-cols-2 border-l border-t border-bone/10 sm:grid-cols-3 md:grid-cols-4">
          {marks.map((n) => (
            <div
              key={n}
              className="relative flex aspect-square items-center justify-center border-b border-r border-bone/10 p-4 md:p-10"
            >
              <div className="relative h-full w-full">
                <Image
                  src={`/marks/MARKS-${n}.png`}
                  alt={`Mark ${n}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
