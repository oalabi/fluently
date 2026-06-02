"use client";

import { useState } from "react";
import { DialogueLine, LanguageCode, VocabItem } from "@/types/curriculum";
import { PronunciationController } from "@/components/PronunciationController";
import { playVocabAudio } from "@/lib/audio";

interface ConversationPracticeProps {
  script: DialogueLine[];
  vocabulary: VocabItem[];
  language: LanguageCode;
  onComplete?: () => void;
}

export function ConversationPractice({
  script,
  vocabulary,
  language,
  onComplete,
}: ConversationPracticeProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  const line = script[lineIndex];
  const vocab = line?.vocabId
    ? vocabulary.find((v) => v.id === line.vocabId)
    : undefined;
  const isUserTurn = line?.speaker === "You";

  if (!line) return null;

  const advance = () => {
    if (lineIndex + 1 >= script.length) {
      onComplete?.();
    } else {
      setLineIndex(lineIndex + 1);
      setShowPrompt(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex gap-1 overflow-x-auto pb-2 no-scrollbar">
        {script.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 shrink-0 rounded-full ${
              i <= lineIndex ? "bg-fluent-green" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <div
        className={`rounded-3xl p-5 ${
          isUserTurn ? "bg-fluent-green/30 ring-2 ring-fluent-yellow" : "bg-white/10"
        }`}
      >
        <p className="text-sm font-semibold text-fluent-sky-light">{line.speaker}</p>
        <p className="mt-2 text-2xl font-bold text-white">{line.native}</p>
        <p className="mt-1 text-white/70">{line.english}</p>
      </div>

      <button
        type="button"
        onClick={() => playVocabAudio(line.native, { language })}
        className="touch-target self-center rounded-full bg-fluent-blue px-8 py-3 font-semibold text-white"
      >
        🔊 Listen
      </button>

      {isUserTurn && vocab && showPrompt ? (
        <PronunciationController
          item={vocab}
          language={language}
          onComplete={advance}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            if (isUserTurn && vocab) setShowPrompt(true);
            else advance();
          }}
          className="touch-target rounded-full bg-fluent-yellow py-4 text-lg font-bold text-fluent-purple-dark"
        >
          {isUserTurn ? "🎤 Your turn!" : "Next →"}
        </button>
      )}
    </div>
  );
}
