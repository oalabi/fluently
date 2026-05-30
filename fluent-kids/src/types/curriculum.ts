export type LanguageCode = "yoruba" | "twi";

export type ProficiencyLevel =
  | "beginner"
  | "elementary"
  | "intermediate"
  | "upper-intermediate"
  | "advanced";

export type ActivityType =
  | "flashcards"
  | "matching"
  | "audio-matching"
  | "bingo"
  | "pronunciation"
  | "vocabulary-quiz"
  | "conversation"
  | "story"
  | "folktale"
  | "proverb"
  | "video"
  | "reading"
  | "storytelling-prompt";

export interface VocabItem {
  id: string;
  native: string;
  english: string;
  phonetic?: string;
  imageEmoji?: string;
  /** Public-domain or CC-licensed audio URL when available */
  audioUrl?: string;
  /** BibleTTS / Open.Bible verse reference for attribution */
  audioSource?: string;
}

export interface LessonActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  vocabIds?: string[];
  /** For conversation / story activities */
  script?: DialogueLine[];
  storyText?: string;
  prompt?: string;
  videoUrl?: string;
}

export interface DialogueLine {
  speaker: string;
  native: string;
  english: string;
  vocabId?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: ProficiencyLevel;
  xpReward: number;
  activities: LessonActivity[];
}

export interface LanguagePack {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  characterEmoji: string;
  description: string;
  comingSoon?: boolean;
  vocabulary: VocabItem[];
  lessons: Lesson[];
  proverbs: { native: string; english: string; meaning: string }[];
  folktales: { title: string; excerpt: string; moral: string }[];
}

export interface UserProgress {
  language: LanguageCode;
  xp: number;
  streak: number;
  completedLessons: string[];
  completedActivities: string[];
  trophies: string[];
  lastPlayedAt: string;
}
