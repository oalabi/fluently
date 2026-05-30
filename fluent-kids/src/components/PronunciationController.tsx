"use client";

import { useCallback, useState } from "react";
import { VocabItem, LanguageCode } from "@/types/curriculum";
import {
  playVocabAudio,
  sliderToPlaybackRate,
  playbackRateLabel,
  stopAllAudio,
} from "@/lib/audio";

interface PronunciationControllerProps {
  item: VocabItem;
  language: LanguageCode;
  onComplete?: () => void;
}

const STEPS = ["listen", "slow", "record", "done"] as const;

export function PronunciationController({
  item,
  language,
  onComplete,
}: PronunciationControllerProps) {
  const [speedSlider, setSpeedSlider] = useState(35);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const playbackRate = sliderToPlaybackRate(speedSlider);

  const play = useCallback(async () => {
    setIsPlaying(true);
    try {
      await playVocabAudio(item.native, {
        audioUrl: item.audioUrl,
        language,
        playbackRate,
      });
    } finally {
      setIsPlaying(false);
    }
  }, [item, language, playbackRate]);

  const handleRecord = async () => {
    if (isRecording) return;
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setHasRecorded(true);
        setStepIndex(3);
      };
      recorder.start();
      setTimeout(() => recorder.stop(), 3000);
    } catch {
      setHasRecorded(true);
      setStepIndex(3);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      {/* Progress steps — reading.com style */}
      <div className="flex w-full max-w-xs gap-1">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`flex h-3 flex-1 items-center justify-center rounded-full transition-all ${
              i < stepIndex
                ? "bg-fluent-green"
                : i === stepIndex
                  ? i === 2
                    ? "bg-fluent-coral"
                    : "bg-fluent-blue"
                  : "bg-white/20"
            }`}
          >
            {i === 2 && stepIndex >= 2 && (
              <span className="text-[10px] text-white">🎤</span>
            )}
          </div>
        ))}
      </div>

      <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-fluent-purple-light to-fluent-blue shadow-glow">
        <p className="text-center text-3xl font-bold text-white text-shadow-kid">
          {item.native}
        </p>
        {isPlaying && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full border-4 border-white/40" />
        )}
      </div>

      <p className="text-lg text-white/80">{item.english}</p>
      {item.phonetic && (
        <p className="text-sm text-fluent-sky-light">({item.phonetic})</p>
      )}

      {/* Waveform decoration */}
      <div className="flex h-8 items-end justify-center gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-white/70 transition-all ${
              isPlaying ? "animate-bounce-soft" : ""
            }`}
            style={{
              height: isPlaying ? `${12 + (i % 4) * 8}px` : "8px",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* Speed slider — reading.com controller */}
      <div className="w-full max-w-xs rounded-2xl bg-white/10 p-4 backdrop-blur">
        <div className="mb-2 flex justify-between text-sm text-white/90">
          <span>🐢 Slow down</span>
          <span className="font-semibold text-fluent-yellow">
            {playbackRateLabel(playbackRate)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={speedSlider}
          onChange={(e) => setSpeedSlider(Number(e.target.value))}
          className="w-full"
          aria-label="Pronunciation speed"
        />
        <div className="mt-1 flex justify-between text-xs text-white/50">
          <span>Slow</span>
          <span>Normal</span>
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            play();
            if (stepIndex === 0) setStepIndex(1);
          }}
          disabled={isPlaying}
          className="touch-target w-full rounded-full bg-white py-4 text-lg font-bold text-fluent-purple-dark shadow-card active:scale-95 disabled:opacity-60"
        >
          {isPlaying ? "Playing…" : "▶ Listen"}
        </button>

        <button
          type="button"
          onClick={handleRecord}
          disabled={isRecording}
          className={`touch-target w-full rounded-full py-4 text-lg font-bold text-white shadow-card active:scale-95 ${
            isRecording ? "bg-fluent-coral animate-pulse" : "bg-fluent-green"
          }`}
        >
          {isRecording ? "Recording…" : "🎤 Record"}
        </button>

        {hasRecorded && (
          <button
            type="button"
            onClick={() => {
              stopAllAudio();
              onComplete?.();
            }}
            className="touch-target w-full rounded-full bg-fluent-yellow py-4 text-lg font-bold text-fluent-purple-dark"
          >
            ✓ Great job!
          </button>
        )}
      </div>

      {item.audioSource && (
        <p className="max-w-xs text-center text-xs text-white/40">
          Audio: {item.audioSource}
        </p>
      )}
    </div>
  );
}
