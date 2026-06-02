# Fluent Kids

A mobile-first, gamified language learning platform for children ages **3–12**, focused on **Yoruba** and **Twi** with planned expansion to Hausa, Igbo, and Ewe.

## Features

- **Structured lessons** — Beginner through advanced (6 levels per language)
- **Games** — Flashcards, word matching, audio matching, bingo, vocabulary quizzes
- **Pronunciation practice** — Reading.com–style controller with **slow-down slider** (0.5×–1.0× playback)
- **Conversations** — Scripted dialogues with listen-and-respond turns
- **Library** — Folktales, proverbs, and storytelling prompts
- **Progress** — XP, streaks, trophies (local storage)
- **Journey map** — Visual lesson path with unlock progression

## Pedagogy (ages 3–12)

- Spaced repetition via flashcards and quizzes
- Multimodal learning (audio, text, emoji visuals)
- Gamification (XP, bingo, matching streaks)
- Cultural content (folktales, proverbs, idiomatic speech)
- Production practice (recording, storytelling prompts)

## Audio sources

Vocabulary audio uses browser TTS (`yo`, `tw` BCP-47) when dedicated clips are not bundled. For production, integrate:

| Source | License | Use |
|--------|---------|-----|
| [BibleTTS / OpenSLR SLR129](https://openslr.org/129) | CC BY-SA 4.0 | High-quality verse-aligned Yoruba & Twi speech |
| [open.bible / Biblica](https://open.bible/) | Open Bible recordings | Narration & reading practice |
| [Masakhane BibleTTS](https://masakhane-io.github.io/bibleTTS/) | CC BY-SA 4.0 | TTS models & samples |

See `src/data/*/vocabulary.ts` for per-item `audioSource` attribution fields.

## Demo (ready to use)

```bash
cd fluent-kids
npm install
npm run fetch-audio   # downloads Wikimedia/Lingua Libre clips (first time)
npm run dev
```

Open **http://localhost:3000** on a phone, tablet, or narrow browser window.

| Route | What to try |
|-------|-------------|
| `/` | Splash → Start learning |
| `/languages` | Pick Yoruba or Twi (SVG mascots) |
| `/learn/twi` | Journey map + Lesson 1 → **Pronunciation** (bundled `maakye.wav`) |
| `/learn/twi/games/audio-matching` | Hear real native audio |
| `/learn/yoruba/library` | Folktales + embedded video |
| `/parent` | Parent dashboard — XP, export/import progress |

Bundled audio lives in `public/audio/` (CC BY-SA 4.0, Lingua Libre / Wikimedia).

## Development

Open on a phone or tablet viewport (max-width 512px). The UI is optimized for touch and portrait orientation.

```bash
npm run build
npm start
```

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Web Speech API + HTML5 Audio (speed-controlled playback)

## Roadmap

- [ ] Bundle BibleTTS clips for core vocabulary
- [ ] Video / animated story integration
- [ ] Hausa, Igbo, Ewe language packs
- [ ] Parent dashboard & cloud sync
