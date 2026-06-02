"use client";

import { useState } from "react";
import { LanguageCode } from "@/types/curriculum";
import { playVocabAudio, sliderToPlaybackRate } from "@/lib/audio";

interface StoryActivityProps {
  title: string;
  text: string;
  moral?: string;
  prompt?: string;
  language: LanguageCode;
  onComplete?: () => void;
}

export function StoryActivity({
  title,
  text,
  moral,
  prompt,
  language,
  onComplete,
}: StoryActivityProps) {
  const [speed, setSpeed] = useState(30);
  const [listened, setListened] = useState(false);

  return (
    <div className="flex flex-col gap-5 px-4">
      <h3 className="text-xl font-bold text-fluent-yellow">{title}</h3>
      <div className="rounded-3xl bg-white/10 p-5 text-lg leading-relaxed text-white">
        {text}
      </div>
      {moral && (
        <p className="rounded-2xl bg-fluent-purple-light/50 p-4 text-center italic text-fluent-cream">
          💡 {moral}
        </p>
      )}

      <div className="rounded-2xl bg-white/10 p-4">
        <label className="mb-2 block text-sm text-white/80">🐢 Story speed</label>
        <input
          type="range"
          min={0}
          max={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <button
          type="button"
          onClick={async () => {
            await playVocabAudio(text, {
              language,
              playbackRate: sliderToPlaybackRate(speed),
            });
            setListened(true);
          }}
          className="touch-target mt-3 w-full rounded-full bg-fluent-blue py-3 font-bold text-white"
        >
          🔊 Read aloud
        </button>
      </div>

      {prompt && (
        <div className="rounded-2xl border-2 border-dashed border-fluent-yellow/50 p-4">
          <p className="font-semibold text-fluent-yellow">Your turn!</p>
          <p className="mt-2 text-white/90">{prompt}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onComplete}
        disabled={!!prompt && !listened}
        className="touch-target rounded-full bg-fluent-green py-4 text-lg font-bold text-white disabled:opacity-40"
      >
        ✓ Done
      </button>
    </div>
  );
}
