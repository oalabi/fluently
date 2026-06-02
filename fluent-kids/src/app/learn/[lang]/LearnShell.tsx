"use client";

import { ReactNode, useEffect, useState } from "react";
import { LanguagePack, UserProgress } from "@/types/curriculum";
import { loadProgress } from "@/lib/progress";
import { LanguageCode } from "@/types/curriculum";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressProvider } from "@/context/ProgressContext";
import { KidCharacter } from "@/components/characters/KidCharacter";
import { getSelectedLearner } from "@/lib/learner";
import { KidVariant } from "@/components/characters/KidCharacter";

export function LearnShell({
  children,
  lang,
  pack,
}: {
  children: ReactNode;
  lang: string;
  pack: LanguagePack;
}) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [learner, setLearner] = useState<KidVariant | null>(null);

  useEffect(() => {
    setProgress(loadProgress(lang as LanguageCode));
    setLearner(getSelectedLearner());
  }, [lang]);

  if (!progress) {
    return (
      <div className="mobile-shell flex min-h-dvh items-center justify-center bg-fluent-lavender">
        <p className="font-semibold text-fluent-purple animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <ProgressProvider value={{ progress, setProgress, pack }}>
      <div className="mobile-shell flex min-h-dvh flex-col bg-fluent-lavender">
        {learner && (
          <div className="absolute right-4 top-14 z-40 h-10 w-10 overflow-hidden rounded-full bg-white shadow-soft ring-2 ring-white">
            <KidCharacter variant={learner} />
          </div>
        )}
        {children}
        <BottomNav lang={lang} />
      </div>
    </ProgressProvider>
  );
}
