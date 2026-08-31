"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const budgetOptions = [
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $7,000",
  "$7,000 – $10,000+",
];

const sourceOptions = [
  "Instagram",
  "Behance",
  "Referral",
  "LinkedIn",
  "TikTok",
  "YouTube",
];

type Status = "idle" | "submitting" | "done" | "error";

export default function ContactForm() {
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
          Thank you, {firstName}.
        </div>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-muted-2 md:text-[16px]">
          Your project brief has been received. Expect a reply at {email}{" "}
          within one to two business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-bone/15 bg-transparent px-4 py-3 text-[15px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none";

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
          placeholder="Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Brand or product name"
          required
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Estimated deadline"
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Budget */}
      <div className="mt-8">
        <div className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-2">
          Estimated budget
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {budgetOptions.map((b) => (
            <button
              key={b}
              type="button"
              data-cursor="hover"
              onClick={() => setBudget(b)}
              className={`border px-4 py-3 text-[13px] font-medium transition-colors md:text-[14px] ${
                budget === b
                  ? "border-bone bg-bone/[0.06] text-bone"
                  : "border-bone/15 text-muted-2 hover:border-bone/40 hover:text-bone"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Source */}
      <div className="mt-8">
        <div className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-2">
          How did you find me
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {sourceOptions.map((s) => (
            <button
              key={s}
              type="button"
              data-cursor="hover"
              onClick={() => setSource(s)}
              className={`border px-4 py-3 text-[13px] font-medium transition-colors md:text-[14px] ${
                source === s
                  ? "border-bone bg-bone/[0.06] text-bone"
                  : "border-bone/15 text-muted-2 hover:border-bone/40 hover:text-bone"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <textarea
          placeholder="Brief project description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-[13px] text-gold-ember">
          Something went wrong sending your brief. Please try again or email
          directly.
        </p>
      )}

      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          data-cursor="hover"
          disabled={!isComplete || status === "submitting"}
          className="inline-flex items-center gap-2 border border-bone/20 px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors enabled:hover:bg-bone enabled:hover:text-black disabled:opacity-30"
        >
          {status === "submitting" ? "Sending…" : "Submit"}
        </button>
      </div>
    </motion.form>
  );
}
