"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL = "hey@creativernso.co";
const WHATSAPP_NUMBER: string = "";

function useChannels() {
  const t = useTranslations("initiate.directContact");
  return [
  {
    key: "email",
    label: t("emailLabel"),
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    desc: t("emailDesc"),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    ),
  },
  ...(WHATSAPP_NUMBER
    ? [
        {
          key: "whatsapp",
          label: t("whatsappLabel"),
          value: WHATSAPP_NUMBER,
          href: `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`,
          desc: t("whatsappDesc"),
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1.1 2.6.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3z" />
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.7 3.6 13.4 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z" />
            </svg>
          ),
        },
      ]
    : []),
  ];
}

export default function DirectContact() {
  const channels = useChannels();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`grid grid-cols-1 border-l border-t border-bone/10 ${
        channels.length > 1 ? "sm:grid-cols-2" : ""
      }`}
    >
      {channels.map((c) => (
        <a
          key={c.key}
          href={c.href}
          target={c.key === "whatsapp" ? "_blank" : undefined}
          rel={c.key === "whatsapp" ? "noreferrer" : undefined}
          data-cursor="hover"
          className="group flex items-center justify-between gap-4 border-b border-r border-bone/10 px-6 py-6 transition-colors hover:bg-bone/[0.03] md:px-10 md:py-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/15 text-bone md:h-14 md:w-14">
              {c.icon}
            </span>
            <div>
              <div className="font-display text-[18px] font-bold text-bone md:text-[22px]">
                {c.label}
              </div>
              <div className="text-[13px] text-muted-2 md:text-[14px]">{c.desc}</div>
            </div>
          </div>
          <span
            aria-hidden
            className="text-[18px] text-bone/60 transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 group-hover:text-bone"
          >
            ↗
          </span>
        </a>
      ))}
    </motion.div>
  );
}
