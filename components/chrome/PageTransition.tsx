"use client";

import { useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

// Use useLayoutEffect on the client, fall back to useEffect during SSR
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subtle route-change transition. Fades + lifts the new page in,
 * fades the previous out. Honours prefers-reduced-motion.
 *
 * Also forces scroll to top on every route change because Next.js
 * App Router's automatic scroll restoration is bypassed by
 * AnimatePresence mode="wait" — without this, navigating from a
 * scrolled position on one page lands the user mid-page (or below)
 * the next page's content, making it look like the page is empty.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Disable browser's automatic scroll restoration so it doesn't race with us
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Force scroll to top on every route change.
  // Next.js App Router auto-scrolls to the start of new page content
  // (which is mainPaddingTop = 100px on pages other than home), and
  // AnimatePresence mode="wait" keeps the old layout alive during the
  // 320ms exit animation. We fire scrollTo across the whole transition
  // lifecycle to defeat both.
  useIsomorphicLayoutEffect(() => {
    const scrollUp = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollUp(); // synchronously before paint
    const raf = requestAnimationFrame(scrollUp); // next frame
    const t1 = setTimeout(scrollUp, 50);
    const t2 = setTimeout(scrollUp, 200);
    const t3 = setTimeout(scrollUp, 400); // after exit
    const t4 = setTimeout(scrollUp, 800); // after enter
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}