"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";

const ALL_TROPHIES = [
  { id: "bronze", name: "Bronze Explorer", emoji: "🥉", xp: 100 },
  { id: "silver", name: "Silver Storyteller", emoji: "🥈", xp: 300 },
  { id: "gold", name: "Gold Polyglot", emoji: "🥇", xp: 500 },
  { id: "streak", name: "Fire Streak", emoji: "🔥", xp: 0 },
];

export default function TrophiesPage({ params }: { params: { lang: string } }) {
  const { progress } = useProgress();

  return (
    <>
      <AppHeader title="Trophies" backHref={`/learn/${params.lang}`} />
      <div className="flex-1 overflow-y-auto p-4 pb-2">
        <div className="mb-6 text-center">
          <p className="text-4xl font-bold text-fluent-yellow">{progress.xp} XP</p>
          <p className="text-white/60">Keep learning to earn trophies!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ALL_TROPHIES.map((t) => {
            const earned =
              t.id === "streak"
                ? progress.streak >= 3
                : progress.trophies.includes(t.id);
            return (
              <div
                key={t.id}
                className={`flex flex-col items-center rounded-3xl p-6 ${
                  earned ? "bg-fluent-yellow/20 ring-2 ring-fluent-yellow" : "bg-white/5 opacity-50"
                }`}
              >
                <span className="text-5xl">{t.emoji}</span>
                <p className="mt-2 text-center font-bold text-white">{t.name}</p>
                {t.xp > 0 && (
                  <p className="text-xs text-white/50">{t.xp} XP</p>
                )}
                {earned && <p className="mt-1 text-fluent-green text-sm">Earned!</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-white/10 p-4">
          <p className="font-semibold text-white">Lessons completed</p>
          <p className="text-3xl font-bold text-fluent-green">
            {progress.completedLessons.length}
          </p>
        </div>
      </div>
    </>
  );
}
