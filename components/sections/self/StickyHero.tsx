"use client";

import {
 motion,
 useReducedMotion,
 useScroll,
 useSpring,
 useTransform,
} from"framer-motion";
import Hero from"./Hero";

/**
 * Cinematic sticky hero — pins the Hero to the viewport while the next
 * sections (wrapped in z-10 + opaque bg-site in page.tsx) scroll over it.
 *
 * Smoothness recipe:
 * - `useSpring` wraps the raw scroll value, adding gentle damping/inertia.
 * This converts the"raw, abrupt"scroll-tied parallax into a soft,
 * organic motion that lags slightly behind the scroll — film-camera feel.
 * - Scroll range stretched (0 → 900px) for a gentler curve.
 * - Smaller transforms (scale 1 → 0.97, opacity 1 → 0.7) → subtler fade,
 * less visual jolt.
 * - `transform` + `opacity` only → GPU-accelerated, 60fps.
 * - Honors `prefers-reduced-motion`.
 */
export default function StickyHero() {
 const reduce = useReducedMotion();
 const { scrollY } = useScroll();

 // Spring-smoothed scroll: adds inertia so transforms ease into place
 // instead of tracking scroll 1:1 (which feels mechanical).
 const smoothScrollY = useSpring(scrollY, {
 stiffness: 80,
 damping: 28,
 mass: 0.5,
 restDelta: 0.5,
 });

 // Subtle, slow parallax over a longer scroll range → soft cinematic feel
 const scale = useTransform(
 smoothScrollY,
 [0, 900],
 [1, reduce ? 1 : 0.97]
 );
 const opacity = useTransform(
 smoothScrollY,
 [200, 850],
 [1, reduce ? 1 : 0.7]
 );

 return (
 <div className="sticky top-0 z-0 -mt-[100px] will-change-transform md:-mt-[120px]">
 <motion.div
 style={{ scale, opacity, transformOrigin:"center 40%"}}
 className="will-change-transform"
 >
 <Hero />
 </motion.div>
 </div>
 );
}
