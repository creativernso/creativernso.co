"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const t = useTranslations("nav");
  const items = [
    { label: t("self"), href: "/" },
    { label: t("story"), href: "/about" },
    { label: t("belief"), href: "/services" },
    { label: t("creations"), href: "/work" },
  ] as const;
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const chromeVisible = open || atTop;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-[90px] items-end pb-5 transition-opacity duration-300 md:h-[140px] md:pb-8 ${
          chromeVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            scroll={false}
            data-cursor="hover"
            className={`relative z-10 font-display text-[18px] font-bold tracking-tight text-bone transition-opacity duration-200 md:text-[19px] ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            Ernso Azor
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-9 w-9 flex-col items-end justify-center gap-2 text-bone"
              data-cursor="hover"
            >
              <span
                className={`h-px w-7 bg-current transition-transform duration-300 ease-in-out ${
                  open ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-7 bg-current transition-transform duration-300 ease-in-out ${
                  open ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-4 inset-x-0 z-40 mx-auto flex max-w-[1400px] flex-col justify-center overflow-hidden bg-black px-6 text-bone md:inset-y-10 md:px-12"
          >
            <nav className="flex flex-col gap-3">
              {[...items, { label: t("initiate"), href: "/initiate" }].map(
                (item, i) => {
                  const active = item.href === pathname;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + i * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block font-display text-5xl tracking-tight transition-colors md:text-6xl ${
                          active
                            ? "font-normal text-muted-2"
                            : "font-semibold text-bone hover:text-muted-2"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                }
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
