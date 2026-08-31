"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative z-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        aria-label="Change language"
        className="inline-flex h-7 items-center justify-center border border-bone/25 px-2 font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:border-bone/60"
      >
        {locale}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[140px] border border-bone/15 bg-black/95 py-1 backdrop-blur-md"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
        >
          {routing.locales
            .filter((l) => l !== locale)
            .map((l) => (
              <button
                key={l}
                type="button"
                data-cursor="hover"
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: l });
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-bone/85 transition-colors hover:bg-bone/[0.06] hover:text-bone"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2">
                  {l}
                </span>
                <span>{t(l)}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
