"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { worlds } from "@/lib/content";
import {
  needOptions,
  timelineOptions,
  computeQuote,
  formatUsd,
  type NeedKey,
  type TimelineKey,
} from "@/lib/quote";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 4;

type Status = "idle" | "submitting" | "done" | "error";

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [world, setWorld] = useState<string>("");
  const [needs, setNeeds] = useState<NeedKey[]>([]);
  const [timeline, setTimeline] = useState<TimelineKey | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  const toggleNeed = (key: NeedKey) => {
    setNeeds((prev) =>
      prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key]
    );
  };

  const canAdvance =
    (step === 1 && world) ||
    (step === 2 && needs.length > 0) ||
    (step === 3 && timeline);

  const handleSubmit = async () => {
    if (!name || !email) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ world, needs, timeline, name, email, company }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setResult({ low: data.low, high: data.high });
      setStatus("done");
    } catch {
      setResult(computeQuote(needs, timeline as TimelineKey));
      setStatus("error");
    }
  };

  if (status === "done" || status === "error") {
    return (
      <div className="border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 px-6 py-10 text-center md:px-12 md:py-16">
        <div className="font-display text-[13px] uppercase tracking-[0.2em] text-muted-2">
          Your estimate
        </div>
        <div className="mt-4 font-display text-bone text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">
          {result ? `${formatUsd(result.low)} – ${formatUsd(result.high)}` : ""}
        </div>
        <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-muted-2 md:text-[16px]">
          {status === "done"
            ? `Sent to ${email}. This is a starting range, not a final invoice. Reply to that email and we'll refine it together.`
            : "The estimate is ready, but the email couldn't be sent right now. Reach out directly and I'll follow up with the full breakdown."}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 px-6 py-8 md:px-12 md:py-12">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-px flex-1 transition-colors duration-500 ${
              i < step ? "bg-bone" : "bg-bone/15"
            }`}
          />
        ))}
      </div>
      <div className="mt-3 font-display text-[13px] tracking-[0.1em] text-bone">
        {String(step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-8"
        >
          {step === 1 && (
            <div>
              <h3 className="font-display text-bone text-[22px] font-bold tracking-[-0.02em] md:text-[28px]">
                Which world are you in?
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {worlds.map((w) => (
                  <button
                    key={w.tag}
                    data-cursor="hover"
                    onClick={() => setWorld(w.tag)}
                    className={`border px-5 py-6 text-left transition-colors ${
                      world === w.tag
                        ? "border-bone bg-bone/[0.06]"
                        : "border-bone/15 hover:border-bone/40"
                    }`}
                  >
                    <span className="font-display text-[13px] font-bold tracking-[0.1em] text-bone">
                      {w.numeral}
                    </span>
                    <div className="mt-3 font-display text-[16px] font-bold text-bone md:text-[18px]">
                      {w.tag}
                    </div>
                    <div className="mt-1 text-[13px] text-muted-2">{w.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-bone text-[22px] font-bold tracking-[-0.02em] md:text-[28px]">
                What do you need?
              </h3>
              <p className="mt-2 text-[13px] text-muted-2 md:text-[14px]">
                Select everything that applies.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {needOptions.map((n) => {
                  const active = needs.includes(n.key);
                  return (
                    <button
                      key={n.key}
                      data-cursor="hover"
                      onClick={() => toggleNeed(n.key)}
                      className={`border px-5 py-5 text-left transition-colors ${
                        active
                          ? "border-bone bg-bone/[0.06]"
                          : "border-bone/15 hover:border-bone/40"
                      }`}
                    >
                      <div className="font-display text-[16px] font-bold text-bone">
                        {n.label}
                      </div>
                      <div className="mt-1 text-[13px] text-muted-2">{n.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-bone text-[22px] font-bold tracking-[-0.02em] md:text-[28px]">
                What's your timeline?
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {timelineOptions.map((t) => (
                  <button
                    key={t.key}
                    data-cursor="hover"
                    onClick={() => setTimeline(t.key)}
                    className={`border px-5 py-6 text-left transition-colors ${
                      timeline === t.key
                        ? "border-bone bg-bone/[0.06]"
                        : "border-bone/15 hover:border-bone/40"
                    }`}
                  >
                    <div className="font-display text-[16px] font-bold text-bone md:text-[18px]">
                      {t.label}
                    </div>
                    <div className="mt-1 text-[13px] text-muted-2">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-display text-bone text-[22px] font-bold tracking-[-0.02em] md:text-[28px]">
                Where should the estimate go?
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-bone/15 bg-transparent px-4 py-3 text-[15px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-bone/15 bg-transparent px-4 py-3 text-[15px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border border-bone/15 bg-transparent px-4 py-3 text-[15px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none sm:col-span-2"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="mt-10 flex items-center justify-between">
        <button
          data-cursor="hover"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className={`text-[13px] font-medium uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone ${
            step === 1 ? "pointer-events-none opacity-0" : ""
          }`}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            data-cursor="hover"
            disabled={!canAdvance}
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            className="inline-flex items-center gap-2 border border-bone/20 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors enabled:hover:bg-bone enabled:hover:text-black disabled:opacity-30"
          >
            Next →
          </button>
        ) : (
          <button
            data-cursor="hover"
            disabled={!name || !email || status === "submitting"}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 border border-bone/20 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors enabled:hover:bg-bone enabled:hover:text-black disabled:opacity-30"
          >
            {status === "submitting" ? "Sending…" : "Get my estimate"}
          </button>
        )}
      </div>
    </div>
  );
}
