"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";
import { playVocabAudio, sliderToPlaybackRate } from "@/lib/audio";
import { LanguageCode } from "@/types/curriculum";
import { VideoPlayer } from "@/components/VideoPlayer";
import { videoLibrary } from "@/data/videos";
import { useState } from "react";

export default function LibraryPage({ params }: { params: { lang: string } }) {
  const { pack } = useProgress();
  const lang = params.lang as LanguageCode;
  const [speed, setSpeed] = useState(40);

  return (
    <>
      <AppHeader title="Library" subtitle="Stories & wisdom" backHref={`/learn/${params.lang}`} />
      <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
        <div className="rounded-2xl bg-white/10 p-4">
          <label className="mb-2 block text-sm text-white/80">🐢 Story reading speed</label>
          <input
            type="range"
            min={0}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <section>
          <h2 className="mb-3 text-lg font-bold text-fluent-yellow">📖 Folktales</h2>
          {pack.folktales.map((tale) => (
            <div key={tale.title} className="mb-4 rounded-2xl bg-white/10 p-4">
              <h3 className="font-bold text-white">{tale.title}</h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{tale.excerpt}</p>
              <p className="mt-2 text-xs italic text-fluent-sky-light">💡 {tale.moral}</p>
              <button
                type="button"
                onClick={() =>
                  playVocabAudio(tale.excerpt, {
                    language: lang,
                    playbackRate: sliderToPlaybackRate(speed),
                  })
                }
                className="touch-target mt-3 rounded-full bg-fluent-blue px-4 py-2 text-sm font-semibold text-white"
              >
                🔊 Read aloud
              </button>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-fluent-yellow">📜 Proverbs</h2>
          {pack.proverbs.map((p) => (
            <div
              key={p.native}
              className="mb-3 rounded-2xl border border-white/10 bg-fluent-purple-light/30 p-4"
            >
              <p className="text-xl font-bold text-white">{p.native}</p>
              <p className="text-fluent-yellow">{p.english}</p>
              <p className="mt-1 text-sm text-white/70">{p.meaning}</p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-fluent-yellow">🎬 Videos</h2>
            <Link
              href={`/learn/${params.lang}/videos`}
              className="text-sm text-fluent-sky-light"
            >
              See all →
            </Link>
          </div>
          {(videoLibrary[lang] ?? []).slice(0, 1).map((video) => (
            <VideoPlayer key={video.id} video={video} />
          ))}
        </section>

        <Link
          href={`/learn/${params.lang}/games/pronunciation`}
          className="block rounded-2xl bg-gradient-to-r from-fluent-coral to-fluent-yellow p-4 text-center font-bold text-fluent-purple-dark"
        >
          🎤 Aviator — Pronunciation Practice
        </Link>
      </div>
    </>
  );
}
