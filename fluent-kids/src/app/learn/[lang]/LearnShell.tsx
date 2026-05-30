"use client";

import { ReactNode, useEffect, useState } from "react";
import { LanguagePack, UserProgress } from "@/types/curriculum";
import { loadProgress } from "@/lib/progress";
import { LanguageCode } from "@/types/curriculum";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressProvider } from "@/context/ProgressContext";

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

  useEffect(() => {
    setProgress(loadProgress(lang as LanguageCode));
  }, [lang]);

  if (!progress) {
    return (
      <div className="mobile-shell flex min-h-dvh items-center justify-center bg-fluent-purple-dark">
        <p className="text-white animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <ProgressProvider value={{ progress, setProgress, pack }}>
      <div className="mobile-shell flex min-h-dvh flex-col bg-fluent-purple-dark">
        {children}
        <BottomNav lang={lang} />
      </div>
    </ProgressProvider>
  );
}
