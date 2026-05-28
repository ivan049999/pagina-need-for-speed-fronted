"use client";

import Image from "next/image";
import { useState } from "react";
import type { GameMediaItem } from "@/content/games/need-for-speed-underground";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  media: GameMediaItem[];
};

export function GameMediaHero({ title, media }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] ?? media[0];

  function goPrev() {
    setActiveIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  }

  function goNext() {
    setActiveIndex((i) => (i === media.length - 1 ? 0 : i + 1));
  }

  if (!active) return null;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h1>

      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20"
          aria-hidden
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 text-white">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
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
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-28 shrink-0 overflow-hidden border-2 transition-colors",
                index === activeIndex
                  ? "border-[#3d8bfd]"
                  : "border-transparent opacity-70 hover:opacity-100"
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
