"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { VideoPlayer } from "@/components/VideoPlayer";
import { videoLibrary } from "@/data/videos";
import { LanguageCode } from "@/types/curriculum";

export default function VideosPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as LanguageCode;
  const videos = videoLibrary[lang] ?? [];

  return (
    <>
      <AppHeader
        title="Videos"
        subtitle="Stories & lessons"
        backHref={`/learn/${params.lang}/library`}
      />
      <div className="flex flex-col gap-6 overflow-y-auto p-4 pb-24 no-scrollbar">
        <p className="text-sm text-white/70">
          Watch and repeat! Parents: verify videos suit your child&apos;s age.
        </p>
        {videos.map((video) => (
          <VideoPlayer key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
