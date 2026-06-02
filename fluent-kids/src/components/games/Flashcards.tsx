"use client";

import { useState } from "react";
import { VocabItem, LanguageCode } from "@/types/curriculum";
import { playVocabAudio } from "@/lib/audio";

interface FlashcardsProps {
  items: VocabItem[];
  language: LanguageCode;
  onComplete?: () => void;
}

export function Flashcards({ items, language, onComplete }: FlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = items[index];
  if (!card) return null;

  const next = (gotIt: boolean) => {
    const newKnown = gotIt ? known + 1 : known;
    setKnown(newKnown);
    setFlipped(false);
    if (index + 1 >= items.length) {
      onComplete?.();
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <p className="text-sm text-white/70">
        Card {index + 1} of {items.length} · ⭐ {known} remembered
      </p>

      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className="relative h-64 w-full max-w-sm perspective-1000"
        aria-label="Flip flashcard"
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-fluent-teal to-fluent-purple p-6 shadow-card transition-transform duration-500 ${
            flipped ? "scale-95" : ""
          }`}
        >
          {!flipped ? (
            <>
              <span className="text-6xl">{card.imageEmoji ?? "📇"}</span>
              <p className="mt-4 text-3xl font-bold text-white">{card.native}</p>
              <p className="mt-2 text-sm text-white/60">Tap to flip</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-fluent-yellow">{card.english}</p>
              {card.phonetic && (
                <p className="mt-2 text-white/70">({card.phonetic})</p>
              )}
            </>
          )}
        </div>
      </button>

      <button
        type="button"
        onClick={() =>
          playVocabAudio(card.native, {
            audioUrl: card.audioUrl,
            language,
          })
        }
        className="touch-target rounded-full bg-white/20 px-6 py-2 text-white"
      >
        🔊 Hear it
      </button>

      {flipped && (
        <div className="flex w-full max-w-sm gap-3">
          <button
            type="button"
            onClick={() => next(false)}
            className="touch-target flex-1 rounded-full bg-white/20 py-3 font-semibold text-white"
          >
            Practice more
          </button>
          <button
            type="button"
            onClick={() => next(true)}
            className="touch-target flex-1 rounded-full bg-fluent-green py-3 font-semibold text-white"
          >
            Got it! ✓
          </button>
        </div>
      )}
    </div>
  );
}
