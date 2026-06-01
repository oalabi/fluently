"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
      <main className="mobile-shell flex min-h-dvh items-center justify-center bg-fluent-purple-dark">
        <p className="text-white">Loading dashboard…</p>
      </main>
    );
  }

  const totalXp =
    allProgress.yoruba.xp + allProgress.twi.xp;
  const totalLessons =
    allProgress.yoruba.completedLessons.length +
    allProgress.twi.completedLessons.length;

  return (
    <main className="mobile-shell min-h-dvh bg-fluent-purple-dark">
      <header className="border-b border-white/10 px-4 py-4">
        <Link href="/" className="text-sm text-white/60">
          ← Back to app
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">Parent Dashboard</h1>
        <p className="text-sm text-white/60">
          View progress saved on this device. Export to move to another tablet.
        </p>
      </header>

      <div className="flex flex-col gap-4 p-4 pb-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-3xl font-bold text-fluent-yellow">{totalXp}</p>
            <p className="text-xs text-white/60">Total XP</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-3xl font-bold text-fluent-green">{totalLessons}</p>
            <p className="text-xs text-white/60">Lessons done</p>
          </div>
        </div>

        {languages.map((lang) => {
          const p = allProgress[lang.code as LanguageCode];
          return (
            <div key={lang.code} className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  {lang.flagEmoji} {lang.name}
                </h2>
                <Link
                  href={`/learn/${lang.code}`}
                  className="text-sm text-fluent-sky-light"
                >
                  Open →
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="font-bold text-fluent-yellow">{p.xp}</p>
                  <p className="text-white/50">XP</p>
                </div>
                <div>
                  <p className="font-bold text-white">{p.completedLessons.length}</p>
                  <p className="text-white/50">Lessons</p>
                </div>
                <div>
                  <p className="font-bold text-white">{p.streak}</p>
                  <p className="text-white/50">Streak</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-white/40">
                Last played:{" "}
                {new Date(p.lastPlayedAt).toLocaleString()}
              </p>
              {p.trophies.length > 0 && (
                <p className="mt-1 text-sm text-fluent-yellow">
                  🏆 {p.trophies.join(", ")}
                </p>
              )}
            </div>
          );
        })}

        <section className="rounded-2xl border border-white/10 p-4">
          <h3 className="font-bold text-white">Cloud sync (beta)</h3>
          <p className="mt-1 text-sm text-white/60">
            Export progress as JSON and paste it on another device to restore.
            Full cloud accounts coming soon.
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="touch-target mt-3 w-full rounded-full bg-fluent-blue py-3 font-semibold text-white"
          >
            Copy progress to clipboard
          </button>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste exported JSON here to restore…"
            className="mt-3 w-full rounded-xl bg-black/30 p-3 text-sm text-white placeholder:text-white/30"
            rows={4}
          />
          <button
            type="button"
            onClick={handleImport}
            className="touch-target mt-2 w-full rounded-full bg-fluent-green py-3 font-semibold text-white"
          >
            Import progress
          </button>
        </section>

        {message && (
          <p className="text-center text-sm text-fluent-yellow">{message}</p>
        )}

        <Link
          href="/languages"
          className="touch-target block rounded-full bg-white py-4 text-center font-bold text-fluent-purple-dark"
        >
          Child view — Start learning
        </Link>
      </div>
    </main>
  );
}
