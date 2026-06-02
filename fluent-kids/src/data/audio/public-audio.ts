/**
 * Curated public-domain / CC-licensed audio URLs.
 * Twi: Lingua Libre (CC BY-SA 4.0) — native speaker Mndetatsin
 * Yoruba: Wikimedia Commons pronunciation files
 */

export interface PublicAudioClip {
  vocabId: string;
  /** Remote URL or local path under /audio/ */
  url: string;
  source: string;
  license: string;
}

export const publicAudioClips: PublicAudioClip[] = [
  {
    vocabId: "tw-greeting-morning",
    url: "/audio/twi/maakye.wav",
    source: "Wikimedia Commons — Lingua Libre: maakye",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-greeting-hello",
    url: "/audio/twi/onua.wav",
    source: "Wikimedia Commons — Lingua Libre: onua (hello)",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-thanks",
    url: "/audio/twi/medaase.wav",
    source: "Wikimedia Commons — Lingua Libre: medaase",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-water",
    url: "/audio/twi/nsuo.wav",
    source: "Wikimedia Commons — Lingua Libre: nsuo",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-one",
    url: "/audio/twi/baako.wav",
    source: "Wikimedia Commons — Lingua Libre: baako",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-two",
    url: "/audio/twi/mmienu.wav",
    source: "Wikimedia Commons — Lingua Libre: mmienu",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "tw-three",
    url: "/audio/twi/mmeensa.wav",
    source: "Wikimedia Commons — Lingua Libre: mmeɛnsa",
    license: "CC BY-SA 4.0",
  },
  {
    vocabId: "yo-father",
    url: "/audio/yoruba/baba.ogg",
    source: "Wikimedia Commons — Yo-Baba suwe.ogg",
    license: "CC BY-SA 4.0",
  },
];

/** Remote URLs used by scripts/fetch-audio.mjs */
export const remoteAudioDownloads: { file: string; url: string }[] = [
  {
    file: "twi/maakye.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/LL-Q12068060%28twi%29-Mndetatsin-maakye%28Bonjour%29.wav",
  },
  {
    file: "twi/onua.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/LL-Q12068060%28twi%29-Mndetatsin-onua%28Salut%29.wav",
  },
  {
    file: "twi/medaase.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/LL-Q2728730%28twi%29-Mndetatsin-medaase%28Merci%29.wav",
  },
  {
    file: "twi/nsuo.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/LL-Q283%28twi%29-Mndetatsin-nsuo%28l%27eau%29.wav",
  },
  {
    file: "twi/baako.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/LL-Q199%28twi%29-Mndetatsin-baako%28un%29.wav",
  },
  {
    file: "twi/mmienu.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/LL-Q200%28twi%29-Mndetatsin-mmienu%28deux%29.wav",
  },
  {
    file: "twi/mmeensa.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/LL-Q201%28twi%29-Mndetatsin-mme%C9%9Bnsa%28trois%29.wav",
  },
  {
    file: "yoruba/baba.ogg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Yo-Baba_suwe.ogg",
  },
];

export function getPublicAudioUrl(vocabId: string): PublicAudioClip | undefined {
  return publicAudioClips.find((c) => c.vocabId === vocabId);
}

export function applyPublicAudioToVocabulary<
  T extends { id: string; audioUrl?: string; audioSource?: string },
>(vocabulary: T[]): T[] {
  return vocabulary.map((item) => {
    const clip = getPublicAudioUrl(item.id);
    if (!clip) return item;
    return {
      ...item,
      audioUrl: clip.url,
      audioSource: `${clip.source} (${clip.license})`,
    };
  });
}
