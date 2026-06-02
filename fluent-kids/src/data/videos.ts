import { LanguageCode } from "@/types/curriculum";

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  /** YouTube video ID for embed */
  youtubeId: string;
  duration: string;
  level: "beginner" | "elementary" | "intermediate";
  source: string;
}

export const videoLibrary: Record<LanguageCode, VideoLesson[]> = {
  yoruba: [
    {
      id: "yo-v1",
      title: "Báwo Ni — Greeting Song",
      description:
        "Original Yoruba for Kidz song to learn casual greetings (Báwo ni?).",
      youtubeId: "_gPdjlNevCE",
      duration: "3 min",
      level: "beginner",
      source: "YouTube — Yoruba for Kidz",
    },
    {
      id: "yo-v2",
      title: "Greetings & Simple Conversations",
      description: "Ẹ káàárọ̀, introductions, and everyday phrases for beginners.",
      youtubeId: "zIxKjFGf__o",
      duration: "16 min",
      level: "elementary",
      source: "YouTube — Let's Learn Yoruba",
    },
  ],
  twi: [
    {
      id: "tw-v1",
      title: "Twi Phrases for Kids",
      description:
        "Maakye, medaase, and everyday phrases for talking with children.",
      youtubeId: "PmO5SQ-mi94",
      duration: "9 min",
      level: "beginner",
      source: "YouTube — A Little Twi With Adwoa Lee",
    },
    {
      id: "tw-v2",
      title: "Twi Short Story — My Perfect Day",
      description: "Listen, read, and respond to a beginner Twi story.",
      youtubeId: "f5y5ooLRvFU",
      duration: "17 min",
      level: "elementary",
      source: "YouTube — A Little Twi With Adwoa Lee",
    },
  ],
};
