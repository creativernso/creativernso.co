"use client";

import { useEffect, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Subtle route-change transition — fades + lifts the new page in on mount.
 * No exit animation / AnimatePresence: that previously left the incoming
 * page's wrapper stuck at its exit-state opacity (0) after a client-side
 * navigation, rendering a blank page until a hard refresh.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
