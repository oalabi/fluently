"use client";

import { useMemo, useState } from "react";
import { VocabItem } from "@/types/curriculum";

interface MatchingGameProps {
  items: VocabItem[];
  onComplete?: () => void;
}

type Card = { id: string; text: string; pairId: string; side: "native" | "english" };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MatchingGame({ items, onComplete }: MatchingGameProps) {
  const cards = useMemo(() => {
    const pair = items.slice(0, 6);
    const native: Card[] = pair.map((v) => ({
      id: `n-${v.id}`,
      text: v.native,
      pairId: v.id,
      side: "native",
    }));
    const english: Card[] = pair.map((v) => ({
      id: `e-${v.id}`,
      text: v.english,
      pairId: v.id,
      side: "english",
    }));
    return shuffle([...native, ...english]);
  }, [items]);

  const [selected, setSelected] = useState<Card | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [stars, setStars] = useState(0);

  const handleTap = (card: Card) => {
    if (matched.has(card.pairId)) return;
    if (!selected) {
      setSelected(card);
      return;
    }
    if (selected.id === card.id) {
      setSelected(null);
      return;
    }
    if (selected.pairId === card.pairId && selected.side !== card.side) {
      const next = new Set(matched);
      next.add(card.pairId);
      setMatched(next);
      setStars(stars + 1);
      setSelected(null);
      if (next.size >= cards.length / 2) {
        setTimeout(() => onComplete?.(), 600);
      }
    } else {
      setWrong(card.id);
      setTimeout(() => {
        setWrong(null);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <div className="px-3">
      <p className="mb-4 text-center text-white/80">
        Match pairs! ⭐ {stars} / {cards.length / 2}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((card) => {
          const isMatched = matched.has(card.pairId);
          const isSelected = selected?.id === card.id;
          const isWrong = wrong === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleTap(card)}
              disabled={isMatched}
              className={`touch-target min-h-[72px] rounded-2xl p-3 text-center text-sm font-semibold transition-all active:scale-95 ${
                isMatched
                  ? "bg-fluent-green/40 text-white/50 line-through"
                  : isWrong
                    ? "bg-fluent-coral animate-shake"
                    : isSelected
                      ? "bg-fluent-yellow text-fluent-purple-dark scale-105"
                      : card.side === "native"
                        ? "bg-fluent-purple-light text-white"
                        : "bg-white/90 text-fluent-purple-dark"
              }`}
            >
              {card.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
