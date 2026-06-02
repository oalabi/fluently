"use client";

import { LanguageCode, UserProgress } from "@/types/curriculum";

const STORAGE_KEY = "fluent-kids-progress";

function defaultProgress(language: LanguageCode): UserProgress {
  return {
    language,
    xp: 0,
    streak: 0,
    completedLessons: [],
    completedActivities: [],
    trophies: [],
    lastPlayedAt: new Date().toISOString(),
  };
}

export function loadAllProgress(): Record<LanguageCode, UserProgress> {
  const result: Record<string, UserProgress> = {
    yoruba: defaultProgress("yoruba"),
    twi: defaultProgress("twi"),
  };
  if (typeof window === "undefined") return result as Record<LanguageCode, UserProgress>;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return result as Record<LanguageCode, UserProgress>;
    const all = JSON.parse(raw) as Record<string, UserProgress>;
    return {
      yoruba: all.yoruba ?? defaultProgress("yoruba"),
      twi: all.twi ?? defaultProgress("twi"),
    };
  } catch {
    return result as Record<LanguageCode, UserProgress>;
  }
}

export function loadProgress(language: LanguageCode): UserProgress {
  if (typeof window === "undefined") return defaultProgress(language);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress(language);
    const all = JSON.parse(raw) as Record<string, UserProgress>;
    return all[language] ?? defaultProgress(language);
  } catch {
    return defaultProgress(language);
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: Record<string, UserProgress> = raw ? JSON.parse(raw) : {};
    all[progress.language] = {
      ...progress,
      lastPlayedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota errors */
  }
}

export function exportProgressJson(): string {
  if (typeof window === "undefined") return "{}";
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}

export function importProgressJson(json: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    JSON.parse(json);
    localStorage.setItem(STORAGE_KEY, json);
    return true;
  } catch {
    return false;
  }
}

export function completeActivity(
  language: LanguageCode,
  activityId: string,
  xpGain: number
): UserProgress {
  const current = loadProgress(language);
  const completedActivities = current.completedActivities.includes(activityId)
    ? current.completedActivities
    : [...current.completedActivities, activityId];

  const updated: UserProgress = {
    ...current,
    xp: current.xp + xpGain,
    completedActivities,
    streak: current.streak,
  };

  if (updated.xp >= 100 && !updated.trophies.includes("bronze")) {
    updated.trophies = [...updated.trophies, "bronze"];
  }
  if (updated.xp >= 300 && !updated.trophies.includes("silver")) {
    updated.trophies = [...updated.trophies, "silver"];
  }
  if (updated.xp >= 500 && !updated.trophies.includes("gold")) {
    updated.trophies = [...updated.trophies, "gold"];
  }

  saveProgress(updated);
  return updated;
}

export function completeLesson(
  language: LanguageCode,
  lessonId: string,
  xpReward: number
): UserProgress {
  const current = loadProgress(language);
  const completedLessons = current.completedLessons.includes(lessonId)
    ? current.completedLessons
    : [...current.completedLessons, lessonId];

  const updated: UserProgress = {
    ...current,
    xp: current.xp + xpReward,
    completedLessons,
    streak: current.streak + 1,
  };
  saveProgress(updated);
  return updated;
}
