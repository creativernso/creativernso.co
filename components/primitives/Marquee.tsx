"use client";

import { motion } from"framer-motion";

export default function Marquee({
 text,
 className,
 duration = 40,
}: {
 text: string;
 className?: string;
 duration?: number;
}) {
 const content = `${text} ${text} ${text} `;
 return (
 <div className="relative w-full overflow-hidden">
 <motion.div
 className={`flex whitespace-nowrap ${className ??""}`}
 animate={{ x: ["0%","-50%"] }}
 transition={{ duration, ease:"linear", repeat: Infinity }}
 >
 <span className="pr-12">{content}</span>
 <span className="pr-12">{content}</span>
 </motion.div>
 </div>
 );
}
