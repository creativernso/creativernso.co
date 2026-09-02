"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ConfirmationCard from "./ConfirmationCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK || "creativernso/discovery-call";

type BookingSuccessDetail = {
  uid?: string;
  title?: string;
  startTime?: string;
  videoCallUrl?: string;
};

export default function CallStep({ onBack }: { onBack: () => void }) {
  const t = useTranslations("initiate.call");
  const tq = useTranslations("initiate.questionnaire");
  const [confirmed, setConfirmed] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  const notifiedRef = useRef(false);

  useEffect(() => {
    // Fallback: if `linkReady` never fires (slow network, ad blocker, or an
    // invalid/placeholder cal link with no page to load), don't leave the
    // visitor staring at "loading calendar…" forever.
    const fallback = setTimeout(() => setEmbedReady(true), 6000);

    (async function initCal() {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#C49A55" },
        },
        hideEventTypeDetails: false,
      });
      cal("on", {
        action: "linkReady",
        callback: () => setEmbedReady(true),
      });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (e: CustomEvent<{ data: BookingSuccessDetail }>) => {
          setConfirmed(true);
          if (!notifiedRef.current) {
            notifiedRef.current = true;
            const detail = e.detail?.data ?? {};
            fetch("/api/initiate/booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                uid: detail.uid ?? null,
                title: detail.title ?? null,
                startTime: detail.startTime ?? null,
                videoCallUrl: detail.videoCallUrl ?? null,
              }),
            }).catch(() => {});
          }
        },
      });
    })();

    return () => clearTimeout(fallback);
  }, []);

  if (confirmed) {
    return (
      <ConfirmationCard
        headline={t("confirmedHeadline")}
        subtext={t("confirmedSubtext")}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <button
        type="button"
        onClick={onBack}
        data-cursor="hover"
        className="group inline-flex items-center gap-2 text-[14px] text-bone transition-colors hover:text-gold-ember"
      >
        <span
          aria-hidden
          className="transition-transform duration-500 ease-cinematic group-hover:-translate-x-0.5"
        >
          ←
        </span>
        <span>{tq("back")}</span>
      </button>

      <div
        className="relative mt-6 overflow-hidden bg-black/30 backdrop-blur-md backdrop-saturate-100 md:mt-8"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }}
      >
        {!embedReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink">
            <span className="meta text-muted-2">{t("loading")}</span>
          </div>
        )}
        <Cal
          calLink={CAL_LINK}
          style={{ width: "100%", height: "700px", overflow: "scroll" }}
          config={{ theme: "dark" }}
        />
      </div>
    </motion.div>
  );
}
