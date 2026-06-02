"use client";

import { useMemo, useState } from "react";
import { VocabItem, LanguageCode } from "@/types/curriculum";
import { playVocabAudio } from "@/lib/audio";

interface AudioMatchingGameProps {
  items: VocabItem[];
  language: LanguageCode;
  onComplete?: () => void;
}

export function AudioMatchingGame({
  items,
  language,
  onComplete,
}: AudioMatchingGameProps) {
  const rounds = useMemo(() => items.slice(0, 5), [items]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const current = rounds[round];
  const choices = useMemo(() => {
    if (!current) return [];
    const others = items.filter((i) => i.id !== current.id).slice(0, 3);
    const all = [current, ...others];
    return all.sort(() => Math.random() - 0.5);
  }, [current, items]);

  if (!current) return null;

  const pick = (item: VocabItem) => {
    const correct = item.id === current.id;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore(score + 1);
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= rounds.length) {
        onComplete?.();
      } else {
        setRound(round + 1);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <p className="text-white/70">
        Round {round + 1}/{rounds.length} · Score: {score}
      </p>

      <button
        type="button"
        onClick={() =>
          playVocabAudio(current.native, {
            audioUrl: current.audioUrl,
            language,
          })
        }
        className="flex h-32 w-32 items-center justify-center rounded-full bg-fluent-blue text-5xl shadow-glow active:scale-95"
        aria-label="Play sound"
      >
        🔊
      </button>
      <p className="text-lg text-white">Which word did you hear?</p>

      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        {choices.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => pick(item)}
            disabled={feedback !== null}
            className={`touch-target rounded-2xl py-4 text-lg font-bold transition-all active:scale-95 ${
              feedback && item.id === current.id
                ? "bg-fluent-green text-white"
                : feedback === "wrong"
                  ? "bg-white/20 text-white"
                  : "bg-white text-fluent-purple-dark"
            }`}
          >
            <span className="mr-1">{item.imageEmoji}</span>
            {item.native}
          </button>
        ))}
      </div>

      {feedback === "correct" && (
        <p className="text-2xl animate-bounce-soft">🎉 Correct!</p>
      )}
      {feedback === "wrong" && (
        <p className="text-lg text-fluent-coral">Try the next one!</p>
      )}
    </div>
  );
}
