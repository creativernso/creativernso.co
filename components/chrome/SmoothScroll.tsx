"use client";

import { useEffect } from"react";
import Lenis from"lenis";

/**
 * Initialises Lenis smooth-scroll on the window (normal document scroll).
 * - Respects prefers-reduced-motion (no-op when reduced)
 */
export default function SmoothScroll() {
 useEffect(() => {
 if (typeof window ==="undefined") return;
 if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

 const lenis = new Lenis({
 duration: 1.15,
 easing: (t) => 1 - Math.pow(1 - t, 4),
 smoothWheel: true,
 touchMultiplier: 1.4,
 });

 let frame = 0;
 const raf = (time: number) => {
 lenis.raf(time);
 frame = requestAnimationFrame(raf);
 };
 frame = requestAnimationFrame(raf);

 return () => {
 cancelAnimationFrame(frame);
 lenis.destroy();
 };
 }, []);

 return null;
}
