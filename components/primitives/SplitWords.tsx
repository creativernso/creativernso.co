"use client";

import { motion, useInView } from"framer-motion";
import { Fragment, useRef, type CSSProperties } from"react";

interface SplitWordsProps {
 text: string;
 className?: string;
 italicWords?: string[];
 goldWords?: string[];
 as?:"h1"|"h2"|"h3"|"p"|"div";
 delay?: number;
 stagger?: number;
 duration?: number;
 amount?: number;
 once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SplitWords({
 text,
 className,
 italicWords = [],
 goldWords = [],
 as ="h1",
 delay = 0,
 stagger = 0.06,
 duration = 1.1,
 amount = 0.35,
 once = true,
}: SplitWordsProps) {
 const ref = useRef<HTMLElement | null>(null);
 const inView = useInView(ref, { once, amount });
 const lines = text.split("\n");

 const ariaLabel = text.replace(/\n/g,"");
 const Tag = motion[as];
 let runningIndex = 0;

 return (
 <Tag
 ref={ref as never}
 className={className}
 aria-label={ariaLabel}
 initial="hidden"
 animate={inView ?"show":"hidden"}
 >
 {lines.map((line, li) => (
 <span key={li} className="block overflow-hidden pb-[0.08em]">
 <span className="inline-block">
 {line.split("").filter(Boolean).map((word) => {
 const i = runningIndex++;
 const clean = word.replace(/[^A-Za-zÀ-ſ]/g,"");
 const isItalic = italicWords.some(
 (w) => w.toLowerCase() === clean.toLowerCase()
 );
 const isGold = goldWords.some(
 (w) => w.toLowerCase() === clean.toLowerCase()
 );
 const style: CSSProperties = {
 color: isGold ?"var(--gold)": undefined,
 fontStyle: isItalic ?"italic": undefined,
 };
 return (
 <Fragment key={`${li}-${i}`}>
 <motion.span
 className="inline-block will-change-transform"
 style={style}
 variants={{
 hidden: { y:"120%", opacity: 0 },
 show: {
 y:"0%",
 opacity: 1,
 transition: {
 duration,
 delay: delay + i * stagger,
 ease: EASE,
 },
 },
 }}
 >
 {word}
 </motion.span>
 <span> </span>
 </Fragment>
 );
 })}
 </span>
 </span>
 ))}
 </Tag>
 );
}
