"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";
import { getVocab } from "@/data/languages";

const GAME_MODES = [
  {
    id: "flashcards",
    title: "Flashcards",
    emoji: "🃏",
    description: "Flip and learn new words",
    path: "flashcards",
  },
  {
    id: "matching",
    title: "Word Match",
    emoji: "🧩",
    description: "Pair words with meanings",
    path: "matching",
  },
  {
    id: "audio-matching",
    title: "Hear & Match",
    emoji: "👂",
    description: "Listen and tap the right word",
    path: "audio-matching",
  },
  {
    id: "bingo",
    title: "Bingo",
    emoji: "🎱",
    description: "Get four in a row!",
    path: "bingo",
  },
  {
    id: "quiz",
    title: "Vocabulary Quiz",
    emoji: "❓",
    description: "Quick quiz challenge",
    path: "quiz",
  },
  {
    id: "pronunciation",
    title: "Pronunciation",
    emoji: "🎤",
    description: "Slow-down slider practice",
    path: "pronunciation",
  },
];

export default function GamesPage({ params }: { params: { lang: string } }) {
  const { pack } = useProgress();
  const vocab = getVocab(pack).slice(0, 8);

  return (
    <>
      <AppHeader title="Games" subtitle={pack.name} backHref={`/learn/${params.lang}`} />
      <div className="flex-1 overflow-y-auto p-4 pb-2">
        <div className="mb-6 grid grid-cols-2 gap-3">
          {GAME_MODES.map((game) => (
            <Link
              key={game.id}
              href={`/learn/${params.lang}/games/${game.path}`}
              className="flex flex-col items-center rounded-3xl bg-white/10 p-5 text-center active:scale-95"
            >
              <span className="text-4xl mb-2">{game.emoji}</span>
              <p className="font-bold text-white">{game.title}</p>
              <p className="mt-1 text-xs text-white/60">{game.description}</p>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-white/40">
          Using {vocab.length}+ words · Ages 3–12
        </p>
      </div>
    </>
  );
}
