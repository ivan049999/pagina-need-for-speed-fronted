"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GameMediaItem } from "@/content/games/game-page-content";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  media: GameMediaItem[];
  videoSrc: string;
};

export function GameMediaHero({ title, media, videoSrc }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = media[activeIndex] ?? media[0];
  const canPlayVideo = Boolean(videoSrc) && activeIndex === 0;

  function stopVideo() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
  }

  function goPrev() {
    stopVideo();
    setActiveIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  }

  function goNext() {
    stopVideo();
    setActiveIndex((i) => (i === media.length - 1 ? 0 : i + 1));
  }

  function selectThumbnail(index: number) {
    stopVideo();
    setActiveIndex(index);
  }

  async function handlePlayClick() {
    if (!videoSrc || activeIndex !== 0) return;

    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(true);
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      video.load();
      const loaded = await new Promise<boolean>((resolve) => {
        const onReady = () => {
          cleanup();
          resolve(true);
        };
        const onError = () => {
          cleanup();
          resolve(false);
        };
        const cleanup = () => {
          video.removeEventListener("loadeddata", onReady);
          video.removeEventListener("error", onError);
        };
        video.addEventListener("loadeddata", onReady);
        video.addEventListener("error", onError);
      });

      if (!loaded) {
        setIsPlaying(false);
        return;
      }
    }

    try {
      await video.play();
    } catch {
      try {
        video.muted = true;
        await video.play();
        video.muted = false;
        video.volume = 1;
      } catch {
        setIsPlaying(false);
      }
    }
  }

  if (!active) return null;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h1>

      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            controls={isPlaying}
            playsInline
            preload="metadata"
            className={cn(
              "h-full w-full object-cover",
              isPlaying
                ? "relative z-10 bg-black"
                : "pointer-events-none absolute inset-0 opacity-0",
            )}
            onEnded={stopVideo}
          />
        ) : null}

        {!isPlaying ? (
          <>
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority
            />
            {canPlayVideo ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  type="button"
                  onClick={() => void handlePlayClick()}
                  aria-label="Reproducir vídeo"
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 text-white transition-transform hover:scale-105 hover:bg-black/55"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-8 w-8 fill-current"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10"
          aria-label="Imagen anterior"
        >
          ‹
        </button>

        <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
          {media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectThumbnail(index)}
              className={cn(
                "relative h-16 w-28 shrink-0 overflow-hidden border-2 transition-colors",
                index === activeIndex
                  ? "border-[#3d8bfd]"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
              aria-label={`Ver ${item.alt}`}
              aria-current={index === activeIndex}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10"
          aria-label="Imagen siguiente"
        >
          ›
        </button>
      </div>
    </div>
  );
}
