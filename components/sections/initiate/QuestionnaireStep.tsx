"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ConfirmationCard from "./ConfirmationCard";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 7;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Option = { value: string; label: string };

type Answers = {
  q1: string;
  q2: string;
  q3: string[];
  q4: string;
  q5: string;
  q6: string;
  name: string;
  email: string;
};

const emptyAnswers: Answers = {
  q1: "",
  q2: "",
  q3: [],
  q4: "",
  q5: "",
  q6: "",
  name: "",
  email: "",
};

type Status = "idle" | "submitting" | "done" | "error";

function QuestionBlock({
  title,
  subtitle,
  hint,
  children,
}: {
  title: string;
  subtitle?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-bone text-[clamp(24px,3.6vw,40px)] font-bold leading-[1.15] tracking-[-0.03em]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[15px] leading-relaxed text-muted-2 md:text-[17px]">
          {subtitle}
        </p>
      )}
      {hint && <p className="meta mt-2 text-muted-2">{hint}</p>}
      {children}
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      data-press
      className={`w-full border px-5 py-4 text-left text-[15px] transition-colors md:px-6 md:py-5 md:text-[16px] ${
        selected
          ? "border-bone bg-bone/[0.06] text-bone"
          : "border-bone/15 text-bone/85 hover:border-bone/40 hover:bg-bone/[0.02]"
      }`}
    >
      {label}
    </button>
  );
}

function OptionChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      data-press
      className={`border px-5 py-3 text-[14px] transition-colors md:text-[15px] ${
        selected
          ? "border-bone bg-bone/[0.06] text-bone"
          : "border-bone/15 text-bone/85 hover:border-bone/40 hover:bg-bone/[0.02]"
      }`}
    >
      {label}
    </button>
  );
}

const inputClass =
  "w-full border border-bone/15 bg-transparent px-4 py-3 text-[16px] text-bone placeholder:text-muted-2 focus:border-bone focus:outline-none";

export default function QuestionnaireStep({
  onBackToChoice,
}: {
  onBackToChoice: () => void;
}) {
  const t = useTranslations("initiate.questionnaire");
  const q1Options = t.raw("q1.options") as Option[];
  const q3Options = t.raw("q3.options") as Option[];
  const q5Options = t.raw("q5.options") as Option[];
  const q6Options = t.raw("q6.options") as Option[];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [status, setStatus] = useState<Status>("idle");

  const canProceed = (() => {
    switch (step) {
      case 0:
        return answers.q1 !== "";
      case 1:
        return answers.q2.trim() !== "";
      case 2:
        return answers.q3.length > 0;
      case 3:
        return answers.q4.trim() !== "";
      case 4:
        return answers.q5 !== "";
      case 5:
        return answers.q6 !== "";
      case 6:
        return answers.name.trim() !== "" && EMAIL_RE.test(answers.email);
      default:
        return false;
    }
  })();

  function toggleQ3(value: string) {
    setAnswers((a) => ({
      ...a,
      q3: a.q3.includes(value)
        ? a.q3.filter((v) => v !== value)
        : [...a.q3, value],
    }));
  }

  function goBack() {
    if (step === 0) {
      onBackToChoice();
      return;
    }
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: answers.q1,
          profileLabel:
            q1Options.find((o) => o.value === answers.q1)?.label ?? answers.q1,
          nameOrOrg: answers.q2,
          services: answers.q3,
          serviceLabels: answers.q3.map(
            (v) => q3Options.find((o) => o.value === v)?.label ?? v
          ),
          description: answers.q4,
          timeline: answers.q5,
          timelineLabel:
            q5Options.find((o) => o.value === answers.q5)?.label ?? answers.q5,
          budget: answers.q6,
          budgetLabel:
            q6Options.find((o) => o.value === answers.q6)?.label ?? answers.q6,
          name: answers.name,
          email: answers.email,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function goNext() {
    if (!canProceed) return;
    if (step === TOTAL_STEPS - 1) {
      handleSubmit();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  }

  if (status === "done") {
    return (
      <ConfirmationCard
        headline={t("confirmedHeadline")}
        subtext={t("confirmedSubtext")}
        signature={t("confirmedSignature")}
      />
    );
  }

  const q2Title =
    answers.q1 === "institution"
      ? t("q2.titleInstitution")
      : answers.q1 === "professional"
      ? t("q2.titleProfessional")
      : t("q2.titleCreator");

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
  };

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          data-cursor="hover"
          className="group inline-flex items-center gap-2 text-[14px] text-bone transition-colors hover:text-gold-ember"
        >
          <span
            aria-hidden
            className="transition-transform duration-500 ease-cinematic group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>{t("back")}</span>
        </button>
        <span className="meta text-muted-2">
          {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-4 h-px w-full bg-bone/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-bone"
          animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      <div className="relative mt-12 overflow-hidden md:mt-16">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
          >
            {step === 0 && (
              <QuestionBlock title={t("q1.title")} subtitle={t("q1.subtitle")}>
                <div className="mt-8 flex flex-col gap-3">
                  {q1Options.map((o) => (
                    <OptionButton
                      key={o.value}
                      label={o.label}
                      selected={answers.q1 === o.value}
                      onClick={() => setAnswers((a) => ({ ...a, q1: o.value }))}
                    />
                  ))}
                </div>
              </QuestionBlock>
            )}

            {step === 1 && (
              <QuestionBlock title={q2Title}>
                <input
                  autoFocus
                  type="text"
                  value={answers.q2}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, q2: e.target.value }))
                  }
                  placeholder={t("q2.placeholder")}
                  className={`mt-8 ${inputClass}`}
                />
              </QuestionBlock>
            )}

            {step === 2 && (
              <QuestionBlock
                title={t("q3.title")}
                subtitle={t("q3.subtitle")}
                hint={t("q3.hint")}
              >
                <div className="mt-8 flex flex-wrap gap-3">
                  {q3Options.map((o) => (
                    <OptionChip
                      key={o.value}
                      label={o.label}
                      selected={answers.q3.includes(o.value)}
                      onClick={() => toggleQ3(o.value)}
                    />
                  ))}
                </div>
              </QuestionBlock>
            )}

            {step === 3 && (
              <QuestionBlock title={t("q4.title")} subtitle={t("q4.subtitle")}>
                <textarea
                  autoFocus
                  rows={5}
                  value={answers.q4}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, q4: e.target.value }))
                  }
                  placeholder={t("q4.placeholder")}
                  className={`mt-8 resize-none text-[15px] leading-relaxed md:text-[16px] ${inputClass}`}
                />
              </QuestionBlock>
            )}

            {step === 4 && (
              <QuestionBlock title={t("q5.title")} subtitle={t("q5.subtitle")}>
                <div className="mt-8 flex flex-col gap-3">
                  {q5Options.map((o) => (
                    <OptionButton
                      key={o.value}
                      label={o.label}
                      selected={answers.q5 === o.value}
                      onClick={() => setAnswers((a) => ({ ...a, q5: o.value }))}
                    />
                  ))}
                </div>
              </QuestionBlock>
            )}

            {step === 5 && (
              <QuestionBlock title={t("q6.title")} subtitle={t("q6.subtitle")}>
                <div className="mt-8 flex flex-col gap-3">
                  {q6Options.map((o) => (
                    <OptionButton
                      key={o.value}
                      label={o.label}
                      selected={answers.q6 === o.value}
                      onClick={() => setAnswers((a) => ({ ...a, q6: o.value }))}
                    />
                  ))}
                </div>
              </QuestionBlock>
            )}

            {step === 6 && (
              <QuestionBlock title={t("q7.title")} subtitle={t("q7.subtitle")}>
                <div className="mt-8 flex flex-col gap-4">
                  <input
                    autoFocus
                    type="text"
                    value={answers.name}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, name: e.target.value }))
                    }
                    placeholder={t("q7.namePlaceholder")}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    value={answers.email}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, email: e.target.value }))
                    }
                    placeholder={t("q7.emailPlaceholder")}
                    className={inputClass}
                  />
                </div>
              </QuestionBlock>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p className="mt-4 text-[13px] text-gold-ember">{t("errorMessage")}</p>
      )}

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={goNext}
          disabled={!canProceed || status === "submitting"}
          data-cursor="hover"
          data-press
          className="inline-flex items-center gap-2 border border-bone bg-bone/[0.06] px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors enabled:hover:bg-bone enabled:hover:text-black disabled:border-bone/30 disabled:bg-transparent disabled:text-bone/40"
        >
          {step === TOTAL_STEPS - 1
            ? status === "submitting"
              ? t("sending")
              : t("submit")
            : t("next")}
        </button>
      </div>
    </div>
  );
}
