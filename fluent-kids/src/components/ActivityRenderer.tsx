"use client";

import {
  LessonActivity,
  LanguageCode,
  LanguagePack,
} from "@/types/curriculum";
import { getVocab } from "@/data/languages";
import { Flashcards } from "@/components/games/Flashcards";
import { MatchingGame } from "@/components/games/MatchingGame";
import { AudioMatchingGame } from "@/components/games/AudioMatchingGame";
import { BingoGame } from "@/components/games/BingoGame";
import { VocabularyQuiz } from "@/components/games/VocabularyQuiz";
import { PronunciationController } from "@/components/PronunciationController";
import { ConversationPractice } from "@/components/activities/ConversationPractice";
import { StoryActivity } from "@/components/activities/StoryActivity";
import { ProverbActivity } from "@/components/activities/ProverbActivity";
import { VideoPlayer } from "@/components/VideoPlayer";
import { videoLibrary } from "@/data/videos";

interface ActivityRendererProps {
  activity: LessonActivity;
  languagePack: LanguagePack;
  onComplete: () => void;
}

export function ActivityRenderer({
  activity,
  languagePack,
  onComplete,
}: ActivityRendererProps) {
  const lang = languagePack.code as LanguageCode;
  const vocab = getVocab(languagePack, activity.vocabIds);

  switch (activity.type) {
    case "flashcards":
      return <Flashcards items={vocab} language={lang} onComplete={onComplete} />;
    case "matching":
      return <MatchingGame items={vocab} onComplete={onComplete} />;
    case "audio-matching":
      return (
        <AudioMatchingGame items={vocab} language={lang} onComplete={onComplete} />
      );
    case "bingo":
      return <BingoGame items={vocab} language={lang} onComplete={onComplete} />;
    case "vocabulary-quiz":
      return <VocabularyQuiz items={vocab} onComplete={onComplete} />;
    case "pronunciation":
      return vocab[0] ? (
        <PronunciationController
          item={vocab[0]}
          language={lang}
          onComplete={onComplete}
        />
      ) : null;
    case "conversation":
      return activity.script ? (
        <ConversationPractice
          script={activity.script}
          vocabulary={languagePack.vocabulary}
          language={lang}
          onComplete={onComplete}
        />
      ) : null;
    case "folktale": {
      const tale = languagePack.folktales[0];
      return (
        <StoryActivity
          title={tale?.title ?? activity.title}
          text={activity.storyText ?? tale?.excerpt ?? activity.description}
          moral={tale?.moral}
          prompt={activity.prompt}
          language={lang}
          onComplete={onComplete}
        />
      );
    }
    case "story":
    case "reading":
    case "storytelling-prompt":
      return (
        <StoryActivity
          title={activity.title}
          text={activity.storyText ?? activity.description}
          prompt={activity.prompt}
          language={lang}
          onComplete={onComplete}
        />
      );
    case "proverb":
      return (
        <ProverbActivity
          proverbs={languagePack.proverbs}
          language={lang}
          onComplete={onComplete}
        />
      );
    case "video": {
      const videos = videoLibrary[lang];
      const video = videos[0];
      return video ? (
        <div className="px-4">
          <VideoPlayer video={video} />
          <button
            type="button"
            onClick={onComplete}
            className="touch-target mt-6 w-full rounded-full bg-fluent-green py-3 font-bold text-white"
          >
            Continue
          </button>
        </div>
      ) : null;
    }
    default:
      return (
        <button
          type="button"
          onClick={onComplete}
          className="mx-auto block rounded-full bg-fluent-green px-8 py-3 text-white"
        >
          Continue
        </button>
      );
  }
}
