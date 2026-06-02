"use client";

import { LanguageCode } from "@/types/curriculum";
import { playVocabAudio } from "@/lib/audio";

interface ProverbActivityProps {
  proverbs: { native: string; english: string; meaning: string }[];
  language: LanguageCode;
  onComplete?: () => void;
}

export function ProverbActivity({
  proverbs,
  language,
  onComplete,
}: ProverbActivityProps) {
  const proverb = proverbs[Math.floor(Math.random() * proverbs.length)];

  return (
    <div className="flex flex-col items-center gap-6 px-4 text-center">
      <span className="text-5xl">📜</span>
      <p className="text-3xl font-bold text-white">{proverb.native}</p>
      <p className="text-xl text-fluent-yellow">{proverb.english}</p>
      <p className="text-white/80">{proverb.meaning}</p>
      <button
        type="button"
        onClick={() => playVocabAudio(proverb.native, { language })}
        className="touch-target rounded-full bg-white px-8 py-3 font-bold text-fluent-purple-dark"
      >
        🔊 Hear it
      </button>
      <button
        type="button"
        onClick={onComplete}
        className="touch-target w-full max-w-xs rounded-full bg-fluent-green py-4 font-bold text-white"
      >
        I learned it! ✓
      </button>
    </div>
  );
}
