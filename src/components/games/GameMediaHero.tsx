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

function isLocalGameAsset(src: string) {
  return src.startsWith("/images/");
}

function waitForVideoReady(
  video: HTMLVideoElement,
  timeoutMs = 20000,
): Promise<boolean> {
  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    return Promise.resolve(true);
  }

  video.load();

  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      cleanup();
      resolve(false);
    }, timeoutMs);

    const onReady = () => {
      cleanup();
      resolve(true);
    };

    const onError = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      window.clearTimeout(timer);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", onError);
  });
}

export function GameMediaHero({ title, media, videoSrc }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
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
    setIsLoadingVideo(false);
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

    setIsLoadingVideo(true);
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;

    const loaded = await waitForVideoReady(video);
    setIsLoadingVideo(false);

    if (!loaded) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

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
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            controls={isPlaying}
            playsInline
            preload="auto"
            className={cn(
              "h-full w-full object-cover",
              isPlaying
                ? "relative z-20 bg-black"
                : "pointer-events-none absolute inset-0 z-0 opacity-0",
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
              unoptimized={isLocalGameAsset(active.src)}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority
            />
            {canPlayVideo ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                <button
                  type="button"
                  onClick={() => void handlePlayClick()}
                  disabled={isLoadingVideo}
                  aria-label="Reproducir vídeo"
                  aria-busy={isLoadingVideo}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 text-white transition-transform hover:scale-105 hover:bg-black/55 disabled:cursor-wait disabled:opacity-70"
                >
                  {isLoadingVideo ? (
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-8 w-8 fill-current"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
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
                unoptimized={isLocalGameAsset(item.src)}
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
