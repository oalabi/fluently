"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";
import { playVocabAudio } from "@/lib/audio";
import { LanguageCode } from "@/types/curriculum";

export default function VocabularyPage({ params }: { params: { lang: string } }) {
  const { pack } = useProgress();
  const lang = params.lang as LanguageCode;

  return (
    <>
      <AppHeader title="Vocabulary" subtitle={pack.name} backHref={`/learn/${params.lang}`} />
      <div className="flex-1 overflow-y-auto p-4 pb-2">
        <p className="mb-4 text-sm text-white/60">
          Tap any word to hear it. Use lessons for slow-down practice.
        </p>
        <div className="flex flex-col gap-2">
          {pack.vocabulary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                playVocabAudio(item.native, {
                  audioUrl: item.audioUrl,
                  language: lang,
                })
              }
              className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 text-left active:scale-[0.98]"
            >
              <span className="text-3xl">{item.imageEmoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-white">{item.native}</p>
                <p className="text-sm text-white/60">{item.english}</p>
                {item.phonetic && (
                  <p className="text-xs text-fluent-sky-light">{item.phonetic}</p>
                )}
              </div>
              <span className="text-xl">🔊</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
