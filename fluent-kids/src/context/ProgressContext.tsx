"use client";

import { createContext, useContext, ReactNode } from "react";
import { LanguagePack, UserProgress } from "@/types/curriculum";

interface ProgressContextValue {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  pack: LanguagePack;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ProgressContextValue;
}) {
  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within LearnShell");
  return ctx;
}
