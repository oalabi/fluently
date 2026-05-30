"use client";

import { useState } from "react";
import { VocabItem } from "@/types/curriculum";

interface VocabularyQuizProps {
  items: VocabItem[];
  onComplete?: () => void;
}

export function VocabularyQuiz({ items, onComplete }: VocabularyQuizProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const question = items[index % items.length];
  const options = [
    question,
    ...items.filter((i) => i.id !== question.id).slice(0, 3),
  ].sort(() => Math.random() - 0.5);

  const answer = (item: VocabItem) => {
    if (item.id === question.id) setScore(score + 1);
    if (index + 1 >= 5) {
      onComplete?.();
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="px-4">
      <p className="mb-4 text-center text-white/80">
        Question {Math.min(index + 1, 5)}/5 · ⭐ {score}
      </p>
      <p className="mb-6 text-center text-2xl font-bold text-white">
        What does <span className="text-fluent-yellow">{question.native}</span>{" "}
        mean?
      </p>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => answer(opt)}
            className="touch-target rounded-2xl bg-white py-4 text-lg font-semibold text-fluent-purple-dark active:scale-95"
          >
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
}
