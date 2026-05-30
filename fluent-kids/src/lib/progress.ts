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
    streak: current.streak + (completedActivities.length > current.completedActivities.length ? 0 : 0),
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
