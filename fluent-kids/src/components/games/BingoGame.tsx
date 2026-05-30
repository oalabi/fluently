"use client";

import { useMemo, useState } from "react";
import { VocabItem, LanguageCode } from "@/types/curriculum";
import { playVocabAudio } from "@/lib/audio";

interface BingoGameProps {
  items: VocabItem[];
  language: LanguageCode;
  onComplete?: () => void;
}

export function BingoGame({ items, language, onComplete }: BingoGameProps) {
  const board = useMemo(() => {
    const pool = [...items].sort(() => Math.random() - 0.5).slice(0, 9);
    return pool;
  }, [items]);

  const [called, setCalled] = useState<VocabItem[]>([]);
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [won, setWon] = useState(false);

  const callNext = () => {
    const remaining = board.filter((b) => !called.find((c) => c.id === b.id));
    if (remaining.length === 0) return;
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    setCalled([...called, next]);
    playVocabAudio(next.native, { audioUrl: next.audioUrl, language });
  };

  const toggleMark = (id: string) => {
    const next = new Set(marked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setMarked(next);
    checkWin(next);
  };

  const checkWin = (marks: Set<string>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const lastCalled = called[called.length - 1];
    if (!lastCalled) return;

    for (const line of lines) {
      const ids = line.map((i) => board[i]?.id).filter(Boolean);
      if (ids.every((id) => marks.has(id!))) {
        setWon(true);
        setTimeout(() => onComplete?.(), 1000);
        return;
      }
    }
  };

  const currentCall = called[called.length - 1];

  return (
    <div className="flex flex-col items-center gap-4 px-3">
      <div className="flex w-full max-w-sm items-center justify-between">
        <button
          type="button"
          onClick={callNext}
          className="touch-target rounded-full bg-fluent-yellow px-5 py-3 font-bold text-fluent-purple-dark"
        >
          🎲 Call word
        </button>
        {currentCall && (
          <p className="text-center text-white">
            {currentCall.imageEmoji} <strong>{currentCall.english}</strong>
          </p>
        )}
      </div>

      <div className="grid w-full max-w-sm grid-cols-3 gap-2">
        {board.map((cell) => {
          const isMarked = marked.has(cell.id);
          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => toggleMark(cell.id)}
              className={`touch-target flex min-h-[80px] flex-col items-center justify-center rounded-xl p-2 text-center transition-all ${
                isMarked
                  ? "bg-fluent-green text-white ring-4 ring-fluent-yellow"
                  : "bg-white/90 text-fluent-purple-dark"
              }`}
            >
              <span className="text-2xl">{cell.imageEmoji}</span>
              <span className="text-xs font-bold">{cell.native}</span>
            </button>
          );
        })}
      </div>

      {won && (
        <p className="text-3xl font-bold text-fluent-yellow animate-bounce-soft">
          BINGO! 🎉
        </p>
      )}
    </div>
  );
}
