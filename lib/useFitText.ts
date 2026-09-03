"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scales a heading's font-size so it spans exactly the width of
 * `containerRef`, down to a minimum of `minSize` (matching the site's
 * standard clamp() floor of 36px) — below that it stops shrinking and
 * wraps instead, so short/narrow containers (mobile) never produce an
 * illegibly small heading. Re-measures once the real webfont has
 * swapped in (font-display: swap means the first paint is often a
 * fallback font), on resize, and whenever the container's own size
 * changes.
 */
export function useFitText<T extends HTMLElement>(
  containerRef: RefObject<HTMLElement>,
  minSize = 36
) {
  const textRef = useRef<T>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      const targetWidth = container.getBoundingClientRect().width;
      const currentSize = parseFloat(getComputedStyle(text).fontSize);
      const naturalWidth = text.scrollWidth;
      if (!naturalWidth || !currentSize) return;
      const fitted = currentSize * (targetWidth / naturalWidth);
      setFontSize(Math.max(fitted, minSize));
    };

    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("load", fit);
    const timeouts = [100, 300, 600, 1000, 2000].map((ms) => setTimeout(fit, ms));

    const ro = new ResizeObserver(fit);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", fit);
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("load", fit);
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  return { textRef, fontSize };
}
