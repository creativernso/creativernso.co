"use client";

import { motion } from"framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroOrb() {
 return (
 <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-ink-2 via-ink to-ink-3 md:aspect-square">
 {/* Subtle radial gradient base */}
 <div
 aria-hidden
 className="absolute inset-0"
 style={{
 background:
"radial-gradient(ellipse at 30% 30%, rgba(196,154,85,0.18) 0%, rgba(20,18,14,0) 55%)",
 }}
 />

 {/* Layered orb */}
 <motion.div
 initial={{ scale: 0.85, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 1.6, ease: EASE }}
 className="absolute inset-0 flex items-center justify-center"
 >
 <div
 className="relative aspect-square w-[72%]"
 style={{
 background:
"radial-gradient(circle at 35% 30%, #4a4439 0%, #1f1c18 45%, #0e0d0b 100%)",
  boxShadow:
"inset 40px 60px 80px rgba(0,0,0,0.55), inset -20px -30px 80px rgba(196,154,85,0.06)",
 }}
 >
 {/* Highlight */}
 <div
 aria-hidden
 className="absolute"
 style={{
 top:"12%",
 left:"22%",
 width:"30%",
 height:"20%",
 background:
"radial-gradient(ellipse, rgba(255,240,200,0.22), rgba(255,240,200,0) 70%)",
 filter:"blur(8px)",
 }}
 />
 </div>
 </motion.div>

 {/* Gold luminous ring */}
 <motion.div
 initial={{ scaleX: 0, opacity: 0 }}
 animate={{ scaleX: 1, opacity: 1 }}
 transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
 className="absolute left-1/2 top-1/2 h-[5px] w-[88%] -translate-x-1/2 -translate-y-1/2"
 style={{
 background:
"linear-gradient(90deg, rgba(230,169,91,0) 0%, rgba(230,169,91,0.95) 20%, #ffd58a 50%, rgba(230,169,91,0.95) 80%, rgba(230,169,91,0) 100%)",
 borderRadius: 999,
 boxShadow:
"0 0 30px rgba(230,169,91,0.7), 0 0 80px rgba(230,169,91,0.45), 0 0 140px rgba(230,169,91,0.25)",
 animation:"glow-ring 3.6s ease-in-out infinite",
 }}
 />

 {/* Top-right meta badge */}
 <div className="absolute right-5 top-5 flex items-center gap-2 border border-bone/15 bg-ink/40 px-3 py-1.5 text-bone backdrop-blur-md">
 <span className="meta text-muted-2">case study · 01</span>
 </div>

 {/* Bottom-left caption */}
 <div className="absolute bottom-5 left-5 text-bone/80">
 <div className="meta text-muted-2">visual world</div>
 <div className="mt-1 text-[15px] font-medium">Three worlds, one philosophy</div>
 </div>
 </div>
 );
}
