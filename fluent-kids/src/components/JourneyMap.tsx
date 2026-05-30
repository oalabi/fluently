"use client";

import Link from "next/link";
import { Lesson } from "@/types/curriculum";
import { UserProgress } from "@/types/curriculum";

interface JourneyMapProps {
  lessons: Lesson[];
  lang: string;
  progress: UserProgress;
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-fluent-green",
  elementary: "bg-fluent-blue",
  intermediate: "bg-fluent-yellow",
  "upper-intermediate": "bg-fluent-coral",
  advanced: "bg-fluent-purple-light",
};

export function JourneyMap({ lessons, lang, progress }: JourneyMapProps) {
  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-3xl gradient-journey p-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-8 h-16 w-32 rounded-full bg-white/20 blur-xl" />
        <div className="absolute bottom-12 right-8 h-24 w-24 rounded-full bg-fluent-yellow/30" />
      </div>
      <p className="relative mb-4 text-center text-sm font-semibold text-white text-shadow-kid">
        🌈 Your learning journey
      </p>
      <div className="relative flex flex-col gap-3">
        {lessons.map((lesson, i) => {
          const done = progress.completedLessons.includes(lesson.id);
          const locked = i > 0 && !progress.completedLessons.includes(lessons[i - 1]?.id ?? "");
          return (
            <Link
              key={lesson.id}
              href={locked ? "#" : `/learn/${lang}/lesson/${lesson.id}`}
              className={`flex items-center gap-3 rounded-2xl p-3 transition-all ${
                locked
                  ? "pointer-events-none opacity-40 bg-black/20"
                  : done
                    ? "bg-white/25 ring-2 ring-fluent-yellow"
                    : "bg-white/15 active:scale-[0.98]"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
                  LEVEL_COLORS[lesson.level] ?? "bg-fluent-purple"
                }`}
              >
                {done ? "✓" : lesson.number}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white truncate">{lesson.title}</p>
                <p className="text-xs text-white/70">{lesson.subtitle}</p>
                <p className="text-xs text-fluent-yellow">+{lesson.xpReward} XP</p>
              </div>
              {!locked && <span className="text-white">→</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
