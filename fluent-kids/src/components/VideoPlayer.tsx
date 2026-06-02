"use client";

import { VideoLesson } from "@/data/videos";

interface VideoPlayerProps {
  video: VideoLesson;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-card">
      <div className="relative aspect-video w-full">
        <iframe
          title={video.title}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="bg-white/10 p-4">
        <p className="font-bold text-white">{video.title}</p>
        <p className="mt-1 text-sm text-white/70">{video.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {video.duration} · {video.level} · {video.source}
        </p>
      </div>
    </div>
  );
}
