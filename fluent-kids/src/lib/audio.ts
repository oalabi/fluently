"use client";

import { LanguageCode } from "@/types/curriculum";

const LANG_BCP47: Record<LanguageCode, string> = {
  yoruba: "yo",
  twi: "tw",
};

let currentAudio: HTMLAudioElement | null = null;

export function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Play vocabulary audio from URL or fall back to browser TTS.
 * playbackRate: 0.5 (slow) to 1.0 (normal) — reading.com style controller.
 */
export async function playVocabAudio(
  text: string,
  options: {
    audioUrl?: string;
    language: LanguageCode;
    playbackRate?: number;
    onEnd?: () => void;
  }
): Promise<void> {
  const { audioUrl, language, playbackRate = 1, onEnd } = options;
  stopAllAudio();

  const rate = Math.min(1, Math.max(0.4, playbackRate));

  if (audioUrl) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      currentAudio = audio;
      audio.playbackRate = rate;
      audio.onended = () => {
        currentAudio = null;
        onEnd?.();
        resolve();
      };
      audio.onerror = () => {
        currentAudio = null;
        playTTS(text, language, rate, onEnd).then(resolve).catch(reject);
      };
      audio.play().catch(() => {
        playTTS(text, language, rate, onEnd).then(resolve).catch(reject);
      });
    });
  }

  return playTTS(text, language, rate, onEnd);
}

function playTTS(
  text: string,
  language: LanguageCode,
  rate: number,
  onEnd?: () => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      reject(new Error("Speech not available"));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_BCP47[language] || "en";
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onend = () => {
      onEnd?.();
      resolve();
    };
    utterance.onerror = () => reject(new Error("TTS failed"));

    window.speechSynthesis.speak(utterance);
  });
}

/** Map slider 0–100 to playback rate 0.5–1.0 */
export function sliderToPlaybackRate(sliderValue: number): number {
  const min = 0.5;
  const max = 1.0;
  return min + (sliderValue / 100) * (max - min);
}

export function playbackRateLabel(rate: number): string {
  if (rate <= 0.55) return "Very slow";
  if (rate <= 0.7) return "Slow";
  if (rate <= 0.85) return "A little slow";
  return "Normal";
}
