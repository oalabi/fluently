"use client";

import { KidVariant } from "@/components/characters/KidCharacter";
import { LEARNER_STORAGE_KEY } from "@/data/learners";

export function getSelectedLearner(): KidVariant | null {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem(LEARNER_STORAGE_KEY);
  if (id === "amara" || id === "kofi" || id === "zara" || id === "nia") return id;
  return null;
}

export function setSelectedLearner(id: KidVariant): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LEARNER_STORAGE_KEY, id);
}
