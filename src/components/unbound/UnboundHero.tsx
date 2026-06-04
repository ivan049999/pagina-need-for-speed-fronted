"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { UNBOUND_HERO } from "@/content/unbound/unbound-landing";

export function UnboundHero() {
  const [showTrailer, setShowTrailer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleTrailer() {
    setShowTrailer(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  }

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-white/10 bg-[#111]"
    >
      <div className="mx-auto grid max-w-[1400px] gap-0 lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[520px]">
          {showTrailer ? (
            <video
              ref={videoRef}
              src={UNBOUND_HERO.trailerSrc}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={UNBOUND_HERO.collageSrc}
              alt="Need for Speed Unbound"
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:py-16">
          <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            {UNBOUND_HERO.title}
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
            {UNBOUND_HERO.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={UNBOUND_HERO.buyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-nfs-unbound px-6 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
            >
              Comprar ahora ›
            </a>
            <button
              type="button"
              onClick={handleTrailer}
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60"
                aria-hidden
              >
                ▶
              </span>
              Ver tráiler
            </button>
          </div>
          <div className="mt-10">
            <p className="text-xs uppercase tracking-wider text-white/50">
              Disponible para
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {UNBOUND_HERO.platforms.map((p) => (
                <li
                  key={p}
                  className="rounded border border-white/20 px-2 py-1 text-xs text-white/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
