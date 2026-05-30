"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { useProgress } from "@/context/ProgressContext";
export default function LessonDetailPage({
  params,
}: {
  params: { lang: string; lessonId: string };
}) {
  const { pack, progress } = useProgress();
  const lesson = pack.lessons.find((l) => l.id === params.lessonId);
  if (!lesson) notFound();

  const done = progress.completedLessons.includes(lesson.id);

  return (
    <>
      <AppHeader
        title={`Lesson ${lesson.number}`}
        subtitle={lesson.title}
        backHref={`/learn/${params.lang}`}
      />
      <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
        <div className="mb-6 rounded-2xl bg-white/10 p-4">
          <p className="text-sm uppercase tracking-wide text-fluent-sky-light">
            {lesson.level}
          </p>
          <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          <p className="text-white/70">{lesson.subtitle}</p>
          <p className="mt-2 text-fluent-yellow font-semibold">
            +{lesson.xpReward} XP when complete
          </p>
          {done && (
            <p className="mt-2 text-fluent-green font-bold">✓ Completed</p>
          )}
        </div>

        <p className="mb-3 text-sm font-semibold text-white/60">Activities</p>
        <div className="flex flex-col gap-3">
          {lesson.activities.map((activity, i) => {
            const activityDone = progress.completedActivities.includes(activity.id);
            return (
              <Link
                key={activity.id}
                href={`/learn/${params.lang}/lesson/${lesson.id}/activity/${activity.id}`}
                className={`flex items-center gap-4 rounded-2xl p-4 active:scale-[0.98] ${
                  activityDone ? "bg-fluent-green/20 ring-1 ring-fluent-green" : "bg-white/10"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fluent-purple-light text-lg font-bold text-white">
                  {activityDone ? "✓" : i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{activity.title}</p>
                  <p className="text-sm text-white/60 truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-white">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
