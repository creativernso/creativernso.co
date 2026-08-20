"use client";

import { motion, useInView, type Variants } from"framer-motion";
import { useRef, type ReactNode } from"react";

type Direction ="up"|"down"|"blur"|"fade";

interface RevealProps {
 children: ReactNode;
 delay?: number;
 duration?: number;
 direction?: Direction;
 className?: string;
 once?: boolean;
 amount?: number;
 as?: keyof JSX.IntrinsicElements;
}

const variants = (direction: Direction, duration: number, delay: number): Variants => {
 const ease = [0.16, 1, 0.3, 1] as const;
 switch (direction) {
 case"blur":
 return {
 hidden: { opacity: 0, filter:"blur(14px)", y: 8 },
 show: {
 opacity: 1,
 filter:"blur(0px)",
 y: 0,
 transition: { duration, delay, ease },
 },
 };
 case"fade":
 return {
 hidden: { opacity: 0 },
 show: { opacity: 1, transition: { duration, delay, ease } },
 };
 case"down":
 return {
 hidden: { opacity: 0, y: -24 },
 show: { opacity: 1, y: 0, transition: { duration, delay, ease } },
 };
 case"up":
 default:
 return {
 hidden: { opacity: 0, y: 32 },
 show: { opacity: 1, y: 0, transition: { duration, delay, ease } },
 };
 }
};

export default function Reveal({
 children,
 delay = 0,
 duration = 1.1,
 direction ="up",
 className,
 once = true,
 amount = 0.3,
 as ="div",
}: RevealProps) {
 const ref = useRef(null);
 const inView = useInView(ref, { once, amount });
 const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

 return (
 <MotionTag
 ref={ref}
 variants={variants(direction, duration, delay)}
 initial="hidden"
 animate={inView ?"show":"hidden"}
 className={className}
 >
 {children}
 </MotionTag>
 );
}
