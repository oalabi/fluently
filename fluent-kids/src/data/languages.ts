import { LanguagePack } from "@/types/curriculum";
import { applyPublicAudioToVocabulary } from "./audio/public-audio";
import { yorubaVocabulary } from "./yoruba/vocabulary";
import { yorubaLessons } from "./yoruba/lessons";
import { twiVocabulary } from "./twi/vocabulary";
import { twiLessons } from "./twi/lessons";

export const yorubaProverbs = [
  {
    native: "Ìwà lẹwà",
    english: "Character is beauty",
    meaning: "Being kind matters more than looks.",
  },
  {
    native: "Bi a bá ń rí, a ń sọ",
    english: "As we see, so we speak",
    meaning: "Tell stories about what you observe.",
  },
  {
    native: "Ọmọdé kì í ṣe òkúta",
    english: "A child is not a stone",
    meaning: "Children need patience and teaching.",
  },
];

export const twiProverbs = [
  {
    native: "Wɔko a ɛyɛ",
    english: "Together it is good",
    meaning: "We learn better with friends.",
  },
  {
    native: "Ɔbra bu wɔ",
    english: "Life is a market",
    meaning: "Every day brings new lessons.",
  },
  {
    native: "Nyansa nni abotre",
    english: "Wisdom has no end",
    meaning: "Keep practicing — you grow every day!",
  },
];

export const yorubaFolktales = [
  {
    title: "Tortoise & the Feast",
    excerpt:
      "Ijapa the tortoise wanted all the food at the king's feast. His tricks left him with a cracked shell — a reminder to share.",
    moral: "Honesty and sharing feed the whole village.",
  },
  {
    title: "Why the Sky is Far",
    excerpt:
      "Long ago, the sky was close. Children tapped it with sticks until it rose — so we reach up to learn.",
    moral: "Curiosity lifts us higher.",
  },
];

export const twiFolktales = [
  {
    title: "Anansi & the Stories",
    excerpt:
      "Anansi spun webs of clever plans to gather every tale. The sky god taught him that stories belong to everyone who tells them.",
    moral: "Share stories — they grow when you tell them.",
  },
  {
    title: "The Golden Stool",
    excerpt:
      "A stool fell from the heavens for the Ashanti people — a symbol that every child belongs to a proud history.",
    moral: "You are part of something wonderful.",
  },
];

export const languages: LanguagePack[] = [
  {
    code: "yoruba",
    name: "Yoruba",
    nativeName: "Èdè Yorùbá",
    flagEmoji: "🇳🇬",
    characterEmoji: "🧒🏾",
    description: "Speak and read Yoruba like a native — from Ẹ káàárọ̀ to folktales!",
    vocabulary: applyPublicAudioToVocabulary(yorubaVocabulary),
    lessons: yorubaLessons,
    proverbs: yorubaProverbs,
    folktales: yorubaFolktales,
  },
  {
    code: "twi",
    name: "Twi",
    nativeName: "Twi (Asante)",
    flagEmoji: "🇬🇭",
    characterEmoji: "👧🏾",
    description: "Learn Asante Twi through games, stories, and songs!",
    vocabulary: applyPublicAudioToVocabulary(twiVocabulary),
    lessons: twiLessons,
    proverbs: twiProverbs,
    folktales: twiFolktales,
  },
];

export const comingSoonLanguages = [
  { code: "hausa", name: "Hausa", characterEmoji: "🧒🏾" },
  { code: "igbo", name: "Igbo", characterEmoji: "👧🏾" },
  { code: "ewe", name: "Ewe", characterEmoji: "🧒" },
];

export function getLanguage(code: string): LanguagePack | undefined {
  return languages.find((l) => l.code === code);
}

export function getVocab(
  lang: LanguagePack,
  ids?: string[]
): typeof lang.vocabulary {
  if (!ids?.length) return lang.vocabulary;
  return lang.vocabulary.filter((v) => ids.includes(v.id));
}
