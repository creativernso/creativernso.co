"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

type Option = { value: string; label: string };

type Status = "idle" | "submitting" | "done" | "error";

export default function ContactForm() {
  const t = useTranslations("initiate.form");
  const deadlineOptions = t.raw("deadlineOptions") as Option[];
  const budgetOptions = t.raw("budgetOptions") as Option[];
  const sourceOptions = t.raw("sourceOptions") as Option[];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isComplete =
    firstName &&
    lastName &&
    email &&
    brandName &&
    deadline &&
    budget &&
    source &&
    description;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          brandName,
          deadline,
          budget,
          source,
          description,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 px-6 py-10 text-center md:px-12 md:py-16">
        <div className="font-display text-bone text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em]">
          {t("thankYou", { firstName })}
        </div>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-muted-2 md:text-[16px]">
          {t("confirmation", { email })}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-bone/15 bg-transparent px-4 py-3 text-[15px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none";

  const selectClass =
    "w-full appearance-none border border-bone/15 bg-transparent px-4 py-3 pr-10 text-[15px] focus:border-bone focus:outline-none";

  const Chevron = () => (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      onSubmit={handleSubmit}
      className="border border-bone/10 bg-black/30 backdrop-blur-md backdrop-saturate-100 px-6 py-8 md:px-12 md:py-12"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder={t("lastNamePlaceholder")}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder={t("brandNamePlaceholder")}
          required
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Deadline */}
      <div className="mt-8">
        <label className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-2">
          {t("deadlineLabel")}
        </label>
        <div className="relative mt-3">
          <select
            required
            data-cursor="hover"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={`${selectClass} ${deadline ? "text-bone" : "text-muted-2"}`}
          >
            <option value="" disabled hidden>
              {t("selectPlaceholder")}
            </option>
            {deadlineOptions.map((d) => (
              <option key={d.value} value={d.value} className="bg-ink text-bone">
                {d.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Budget */}
      <div className="mt-8">
        <label className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-2">
          {t("budgetLabel")}
        </label>
        <div className="relative mt-3">
          <select
            required
            data-cursor="hover"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`${selectClass} ${budget ? "text-bone" : "text-muted-2"}`}
          >
            <option value="" disabled hidden>
              {t("selectPlaceholder")}
            </option>
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value} className="bg-ink text-bone">
                {b.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Source */}
      <div className="mt-8">
        <label className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-2">
          {t("sourceLabel")}
        </label>
        <div className="relative mt-3">
          <select
            required
            data-cursor="hover"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={`${selectClass} ${source ? "text-bone" : "text-muted-2"}`}
          >
            <option value="" disabled hidden>
              {t("selectPlaceholder")}
            </option>
            {sourceOptions.map((s) => (
              <option key={s.value} value={s.value} className="bg-ink text-bone">
                {s.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <textarea
          placeholder={t("descriptionPlaceholder")}
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-[13px] text-gold-ember">
          {t("errorMessage")}
        </p>
      )}

      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          data-cursor="hover"
          disabled={!isComplete || status === "submitting"}
          className="inline-flex items-center gap-2 border border-bone bg-bone/[0.06] px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors enabled:hover:bg-bone enabled:hover:text-black disabled:border-bone/60 disabled:bg-transparent disabled:text-bone/50"
        >
          {status === "submitting" ? t("sending") : t("submit")}
        </button>
      </div>
    </motion.form>
  );
}
