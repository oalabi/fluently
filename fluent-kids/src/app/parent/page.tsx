"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayfulBackground } from "@/components/art/PlayfulBackground";
import { FluentLogo } from "@/components/art/FluentLogo";
import {
  exportProgressJson,
  importProgressJson,
  loadAllProgress,
} from "@/lib/progress";
import { languages } from "@/data/languages";
import { LanguageCode, UserProgress } from "@/types/curriculum";

export default function ParentDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [allProgress, setAllProgress] = useState<Record<LanguageCode, UserProgress>>({
    yoruba: {
      language: "yoruba",
      xp: 0,
      streak: 0,
      completedLessons: [],
      completedActivities: [],
      trophies: [],
      lastPlayedAt: "",
    },
    twi: {
      language: "twi",
      xp: 0,
      streak: 0,
      completedLessons: [],
      completedActivities: [],
      trophies: [],
      lastPlayedAt: "",
    },
  });

  useEffect(() => {
    setMounted(true);
    setAllProgress(loadAllProgress());
  }, []);

  const refresh = () => setAllProgress(loadAllProgress());

  const handleExport = () => {
    const json = exportProgressJson();
    navigator.clipboard?.writeText(json);
    setMessage("Progress copied to clipboard!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = () => {
    if (importProgressJson(importText)) {
      refresh();
      setImportText("");
      setMessage("Progress restored successfully.");
    } else {
      setMessage("Invalid JSON — could not import.");
    }
    setTimeout(() => setMessage(null), 4000);
  };

  if (!mounted) {
    return (
      <main className="mobile-shell flex min-h-dvh items-center justify-center onboarding-bg">
        <p className="font-semibold text-fluent-purple animate-pulse">Loading…</p>
      </main>
    );
  }

  const totalXp = allProgress.yoruba.xp + allProgress.twi.xp;
  const totalLessons =
    allProgress.yoruba.completedLessons.length +
    allProgress.twi.completedLessons.length;

  return (
    <main className="mobile-shell onboarding-bg relative min-h-dvh">
      <PlayfulBackground />
      <div className="relative z-10 flex flex-col">
        <header className="px-4 py-6">
          <Link href="/" className="text-sm font-semibold text-fluent-purple-dark/50">
            ← Back to app
          </Link>
          <div className="mt-4 flex justify-center">
            <FluentLogo />
          </div>
          <h1 className="mt-4 text-center text-2xl font-extrabold text-fluent-purple-dark">
            Parent Dashboard
          </h1>
          <p className="mt-1 text-center text-sm text-fluent-purple-dark/60">
            View progress on this device · export to sync tablets
          </p>
        </header>

        <div className="flex flex-col gap-4 px-4 pb-10">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 text-center shadow-soft">
              <p className="text-3xl font-extrabold text-fluent-purple">{totalXp}</p>
              <p className="text-xs font-semibold text-fluent-purple-dark/50">Total XP</p>
            </div>
            <div className="rounded-2xl bg-white p-4 text-center shadow-soft">
              <p className="text-3xl font-extrabold text-fluent-green">{totalLessons}</p>
              <p className="text-xs font-semibold text-fluent-purple-dark/50">
                Lessons done
              </p>
            </div>
          </div>

          {languages.map((lang) => {
            const p = allProgress[lang.code as LanguageCode];
            return (
              <div key={lang.code} className="rounded-2xl bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-fluent-purple-dark">
                    {lang.flagEmoji} {lang.name}
                  </h2>
                  <Link
                    href={`/learn/${lang.code}`}
                    className="text-sm font-bold text-fluent-purple"
                  >
                    Open →
                  </Link>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="font-extrabold text-fluent-purple">{p.xp}</p>
                    <p className="text-fluent-purple-dark/50">XP</p>
                  </div>
                  <div>
                    <p className="font-extrabold">{p.completedLessons.length}</p>
                    <p className="text-fluent-purple-dark/50">Lessons</p>
                  </div>
                  <div>
                    <p className="font-extrabold">{p.streak}</p>
                    <p className="text-fluent-purple-dark/50">Streak</p>
                  </div>
                </div>
              </div>
            );
          })}

          <section className="rounded-2xl bg-white p-4 shadow-soft">
            <h3 className="font-extrabold text-fluent-purple-dark">Cloud sync (beta)</h3>
            <p className="mt-1 text-sm text-fluent-purple-dark/60">
              Copy progress JSON to move between devices.
            </p>
            <button
              type="button"
              onClick={handleExport}
              className="touch-target mt-3 w-full rounded-full bg-fluent-purple py-3 font-bold text-white shadow-soft"
            >
              Copy progress to clipboard
            </button>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste exported JSON here…"
              className="mt-3 w-full rounded-xl border border-fluent-purple/10 bg-fluent-lavender p-3 text-sm text-fluent-purple-dark"
              rows={4}
            />
            <button
              type="button"
              onClick={handleImport}
              className="touch-target mt-2 w-full rounded-full bg-fluent-green py-3 font-bold text-white"
            >
              Import progress
            </button>
          </section>

          {message && (
            <p className="text-center text-sm font-semibold text-fluent-purple">
              {message}
            </p>
          )}

          <Link
            href="/learners"
            className="touch-target block rounded-full bg-fluent-purple py-4 text-center text-lg font-bold text-white shadow-card"
          >
            Child view — Start learning
          </Link>
        </div>
      </div>
    </main>
  );
}
