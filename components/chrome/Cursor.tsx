"use client";

import { useEffect, useRef, useState } from"react";

export default function Cursor() {
 const dot = useRef<HTMLDivElement | null>(null);
 const ring = useRef<HTMLDivElement | null>(null);
 const [hover, setHover] = useState(false);
 const [enabled, setEnabled] = useState(false);

 useEffect(() => {
 const fine = window.matchMedia("(pointer: fine)").matches;
 setEnabled(fine);
 if (!fine) return;

 let x = window.innerWidth / 2;
 let y = window.innerHeight / 2;
 let rx = x;
 let ry = y;

 const move = (e: PointerEvent) => {
 x = e.clientX;
 y = e.clientY;
 if (dot.current) {
 dot.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
 }
 const t = e.target as HTMLElement | null;
 const isInteractive =
 !!t &&
 !!t.closest(
"a, button, [data-cursor='hover'], input, textarea, select, label"
 );
 setHover(isInteractive);
 };

 let frame = 0;
 const loop = () => {
 rx += (x - rx) * 0.15;
 ry += (y - ry) * 0.15;
 if (ring.current) {
 ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
 }
 frame = requestAnimationFrame(loop);
 };
 frame = requestAnimationFrame(loop);

 window.addEventListener("pointermove", move, { passive: true });
 return () => {
 cancelAnimationFrame(frame);
 window.removeEventListener("pointermove", move);
 };
 }, []);

 if (!enabled) return null;

 return (
 <>
 <div
 ref={dot}
 className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 bg-gold transition-opacity duration-300"
 style={{ willChange:"transform"}}
 />
 <div
 ref={ring}
 className="pointer-events-none fixed left-0 top-0 z-[99] h-8 w-8 border border-gold/60 transition-[width,height,opacity,border-color,transform] duration-500 ease-cinematic"
 style={{
 willChange:"transform",
 transform: hover ?"scale(1.6)":"scale(1)",
 borderColor: hover ?"var(--gold-2)":"rgba(184,150,90,0.6)",
 }}
 />
 </>
 );
}
