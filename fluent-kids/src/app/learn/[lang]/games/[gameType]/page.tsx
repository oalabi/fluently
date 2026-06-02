"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";
import { getVocab } from "@/data/languages";
import { Flashcards } from "@/components/games/Flashcards";
import { MatchingGame } from "@/components/games/MatchingGame";
import { AudioMatchingGame } from "@/components/games/AudioMatchingGame";
import { BingoGame } from "@/components/games/BingoGame";
import { VocabularyQuiz } from "@/components/games/VocabularyQuiz";
import { PronunciationController } from "@/components/PronunciationController";
import { LanguageCode } from "@/types/curriculum";
import { completeActivity } from "@/lib/progress";

const TITLES: Record<string, string> = {
  flashcards: "Flashcards",
  matching: "Word Match",
  "audio-matching": "Hear & Match",
  bingo: "Bingo",
  quiz: "Vocabulary Quiz",
  pronunciation: "Pronunciation Practice",
};

export default function GamePlayPage({
  params,
}: {
  params: { lang: string; gameType: string };
}) {
  const router = useRouter();
  const { pack, setProgress } = useProgress();
  const vocab = getVocab(pack).slice(0, 12);
  const lang = params.lang as LanguageCode;

  const onComplete = () => {
    const updated = completeActivity(lang, `game-${params.gameType}`, 10);
    setProgress(updated);
    router.push(`/learn/${params.lang}/games`);
  };

  const renderGame = () => {
    switch (params.gameType) {
      case "flashcards":
        return <Flashcards items={vocab.slice(0, 6)} language={lang} onComplete={onComplete} />;
      case "matching":
        return <MatchingGame items={vocab} onComplete={onComplete} />;
      case "audio-matching":
        return (
          <AudioMatchingGame items={vocab.slice(0, 5)} language={lang} onComplete={onComplete} />
        );
      case "bingo":
        return <BingoGame items={vocab} language={lang} onComplete={onComplete} />;
      case "quiz":
        return <VocabularyQuiz items={vocab.slice(0, 8)} onComplete={onComplete} />;
      case "pronunciation":
        return vocab[0] ? (
          <PronunciationController item={vocab[0]} language={lang} onComplete={onComplete} />
        ) : null;
      default:
        return <p className="p-8 text-white">Game not found</p>;
    }
  };

  return (
    <>
      <AppHeader
        title={TITLES[params.gameType] ?? "Game"}
        backHref={`/learn/${params.lang}/games`}
      />
      <div className="flex-1 overflow-y-auto py-4 pb-28">{renderGame()}</div>
    </>
  );
}
