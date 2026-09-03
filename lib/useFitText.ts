"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scales a heading's font-size so it spans exactly the width of
 * `containerRef`, clamped between `minSize` (matching the site's
 * standard clamp() floor of 36px — below that it stops shrinking and
 * wraps instead, so narrow containers never produce an illegibly
 * small heading) and `maxSize` (a very short heading, e.g. a single
 * short word, would otherwise need an absurd font-size to span a
 * wide container).
 *
 * Natural (single-line) width is measured via an off-screen clone
 * forced to `white-space: nowrap`, not the live element — the live
 * element must stay free to wrap once it's at the floor, and a
 * wrapped element's own scrollWidth would just reflect its already-
 * wrapped box width, not its true unwrapped content width.
 *
 * Re-measures once the real webfont has swapped in (font-display:
 * swap means the first paint is often a fallback font), on resize,
 * and whenever the container's own size changes.
 */
export function useFitText<T extends HTMLElement>(
  containerRef: RefObject<HTMLElement>,
  minSize = 36,
  maxSize = 140
) {
  const textRef = useRef<T>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      // getBoundingClientRect() is border-box; if the container carries
      // its own horizontal padding (e.g. the page's px-6 md:px-12
      // wrapper), that padding isn't available for the text to fill.
      const containerStyle = getComputedStyle(container);
      const paddingX =
        parseFloat(containerStyle.paddingLeft) +
        parseFloat(containerStyle.paddingRight);
      const targetWidth = container.getBoundingClientRect().width - paddingX;
      const currentSize = parseFloat(getComputedStyle(text).fontSize);
      if (!currentSize) return;

      const clone = text.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.pointerEvents = "none";
      clone.style.whiteSpace = "nowrap";
      clone.style.width = "auto";
      clone.style.maxWidth = "none";
      clone.style.fontSize = `${currentSize}px`;
      document.body.appendChild(clone);
      const naturalWidth = clone.scrollWidth;
      document.body.removeChild(clone);

      if (!naturalWidth) return;
      const fitted = currentSize * (targetWidth / naturalWidth);
      setFontSize(Math.min(Math.max(fitted, minSize), maxSize));
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
