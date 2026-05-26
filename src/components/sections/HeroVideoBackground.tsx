"use client";

import { useSettings } from "@/context/SettingsContext";
import { useCallback, useRef, useState } from "react";

const HERO_VIDEOS = [
  "/videos/videoPaginaInicio1.mp4",
  "/videos/videoPaginaInicio2.mp4",
  "/videos/videoPaginaInicio3.mp4",
] as const;

function safePlay(video: HTMLVideoElement) {
  video.play().catch(() => {
    // AbortError u otras interrupciones benignas (p. ej. cambio de src)
  });
}

export function HeroVideoBackground() {
  const { settings } = useSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const showVideo = settings.backgroundVideo;

  const handleCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    safePlay(video);
  }, []);

  const handleEnded = useCallback(() => {
    setIndex((current) => (current + 1) % HERO_VIDEOS.length);
  }, []);

  return (
    <>
      {showVideo ? (
        <video
          ref={videoRef}
          src={HERO_VIDEOS[index]}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-nfs-asphalt to-black"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-nfs-neon/10 via-transparent to-black/80" />
    </>
  );
}
