"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { JourneyMap } from "@/components/JourneyMap";
import { RangerGuide } from "@/components/characters/LanguageMascot";
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
        <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
          <div>
            <p className="text-xs text-white/60">XP</p>
            <p className="text-xl font-bold text-fluent-yellow">{progress.xp}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Streak</p>
            <p className="text-xl font-bold text-white">🔥 {progress.streak}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Trophies</p>
            <p className="text-xl">{progress.trophies.length > 0 ? "🏆" : "—"}</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto no-scrollbar">
          {SIDEBAR.map((item) => (
            <Link
              key={item.label}
              href={`/learn/${params.lang}/${item.href === "lesson" ? "" : item.href}`.replace(/\/$/, "") || `/learn/${params.lang}`}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                item.active
                  ? "bg-white text-fluent-purple-dark"
                  : "bg-white/10 text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center -mb-2">
          <RangerGuide className="h-24 w-32" />
        </div>

        <JourneyMap
          lessons={pack.lessons}
          lang={params.lang}
          progress={progress}
        />

        <Link
          href={`/learn/${params.lang}/games`}
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-fluent-blue to-fluent-green p-4 active:scale-[0.98]"
        >
          <span className="text-4xl">🎯</span>
          <div>
            <p className="font-bold text-white">Quick Play</p>
            <p className="text-sm text-white/80">
              Flashcards, matching, bingo & more
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
