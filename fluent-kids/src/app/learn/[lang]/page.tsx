"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { JourneyMap } from "@/components/JourneyMap";
import { JourneyGuide } from "@/components/characters/LanguageCharacter";
import { useProgress } from "@/context/ProgressContext";

const SIDEBAR = [
  { href: "lesson", label: "Lessons", icon: "📖", active: true },
  { href: "library", label: "Library", icon: "📚" },
  { href: "games", label: "Games", icon: "🎮" },
  { href: "vocabulary", label: "Practice", icon: "🎤" },
];

export default function LearnHomePage({
  params,
}: {
  params: { lang: string };
}) {
  const { pack, progress } = useProgress();

  return (
    <>
      <AppHeader
        title="Fluent Kids"
        subtitle={`${pack.name} — Your Journey`}
      />

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pb-2 no-scrollbar">
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-soft">
          <div>
            <p className="text-xs text-fluent-purple-dark/50">XP</p>
            <p className="text-xl font-extrabold text-fluent-purple">{progress.xp}</p>
          </div>
          <div>
            <p className="text-xs text-fluent-purple-dark/50">Streak</p>
            <p className="text-xl font-extrabold text-fluent-purple-dark">
              🔥 {progress.streak}
            </p>
          </div>
          <div>
            <p className="text-xs text-fluent-purple-dark/50">Trophies</p>
            <p className="text-xl">{progress.trophies.length > 0 ? "🏆" : "—"}</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto no-scrollbar">
          {SIDEBAR.map((item) => (
            <Link
              key={item.label}
              href={`/learn/${params.lang}/${item.href === "lesson" ? "" : item.href}`.replace(/\/$/, "") || `/learn/${params.lang}`}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-soft ${
                item.active
                  ? "bg-fluent-purple text-white"
                  : "bg-white text-fluent-purple-dark"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center -mb-2">
          <JourneyGuide className="h-28 w-28" />
        </div>

        <JourneyMap
          lessons={pack.lessons}
          lang={params.lang}
          progress={progress}
        />

        <Link
          href={`/learn/${params.lang}/games`}
          className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card active:scale-[0.98] ring-2 ring-fluent-purple/10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ring-green text-3xl">
            🎯
          </span>
          <div>
            <p className="font-extrabold text-fluent-purple-dark">Quick Play</p>
            <p className="text-sm text-fluent-purple-dark/60">
              Flashcards, matching, bingo & more
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
