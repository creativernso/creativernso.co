"use client";

import { useState } from "react";

export default function ReadMoreText({
  paragraphs,
  className,
  collapsedCount = 1,
  readMoreLabel,
  readLessLabel,
}: {
  paragraphs: string[];
  className?: string;
  collapsedCount?: number;
  readMoreLabel: string;
  readLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = paragraphs.slice(0, collapsedCount);
  const rest = paragraphs.slice(collapsedCount);

  return (
    <div className={className}>
      {visible.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {rest.length > 0 && (
        <div
          className={
            expanded
              ? "space-y-5 md:block"
              : "hidden space-y-5 md:block"
          }
        >
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          data-cursor="hover"
          className="self-start text-left text-[12px] font-medium uppercase tracking-[0.18em] text-bone underline underline-offset-4 decoration-bone/30 transition-colors hover:decoration-bone md:hidden"
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      )}
    </div>
  );
}
