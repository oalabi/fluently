"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { ActivityRenderer } from "@/components/ActivityRenderer";
import { useProgress } from "@/context/ProgressContext";
import { completeActivity, completeLesson } from "@/lib/progress";
import { LanguageCode } from "@/types/curriculum";

export default function ActivityPage({
  params,
}: {
  params: { lang: string; lessonId: string; activityId: string };
}) {
  const router = useRouter();
  const { pack, setProgress } = useProgress();
  const lesson = pack.lessons.find((l) => l.id === params.lessonId);
  const activity = lesson?.activities.find((a) => a.id === params.activityId);

  if (!lesson || !activity) {
    return (
      <div className="p-8 text-center text-white">
        Activity not found
      </div>
    );
  }

  const handleComplete = () => {
    const xp = 15;
    let updated = completeActivity(
      params.lang as LanguageCode,
      activity.id,
      xp
    );
    const allDone = lesson.activities.every(
      (a) =>
        updated.completedActivities.includes(a.id) || a.id === activity.id
    );
    if (allDone && !updated.completedLessons.includes(lesson.id)) {
      updated = completeLesson(
        params.lang as LanguageCode,
        lesson.id,
        lesson.xpReward
      );
    }
    setProgress(updated);
    router.push(`/learn/${params.lang}/lesson/${lesson.id}`);
  };

  return (
    <>
      <AppHeader
        title={activity.title}
        subtitle={lesson.title}
        backHref={`/learn/${params.lang}/lesson/${lesson.id}`}
      />
      <div className="flex-1 overflow-y-auto py-6 pb-28 no-scrollbar">
        <ActivityRenderer
          activity={activity}
          languagePack={pack}
          onComplete={handleComplete}
        />
      </div>
    </>
  );
}
