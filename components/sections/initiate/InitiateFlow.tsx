"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChoiceStep from "./ChoiceStep";
import CallStep from "./CallStep";
import QuestionnaireStep from "./QuestionnaireStep";

const EASE = [0.16, 1, 0.3, 1] as const;

type View = "choice" | "call" | "questionnaire";

export default function InitiateFlow() {
  const [view, setView] = useState<View>("choice");

  return (
    <div className="mt-10 md:mt-14">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {view === "choice" && <ChoiceStep onSelect={setView} />}
          {view === "call" && <CallStep onBack={() => setView("choice")} />}
          {view === "questionnaire" && (
            <QuestionnaireStep onBackToChoice={() => setView("choice")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
