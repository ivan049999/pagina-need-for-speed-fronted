"use client";

import Image from "next/image";
import { useState } from "react";
import { UNBOUND_FEATURES } from "@/content/unbound/unbound-landing";
import { cn } from "@/lib/utils/cn";

export function UnboundFeatures() {
  const [index, setIndex] = useState(0);
  const slides = UNBOUND_FEATURES.slides;
  const slide = slides[index] ?? slides[0];

  function goPrev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  return (
    <section
      id={UNBOUND_FEATURES.id}
      className="border-b border-white/10 bg-[#0d0d0d] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="font-display text-3xl font-black text-white md:text-4xl">
          {UNBOUND_FEATURES.heading}
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[400px]">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={s.imageSrc}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="70vw"
                />
              </div>
            ))}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Diapositiva ${i + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    i === index ? "bg-white" : "bg-white/30",
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
              {slide.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              {slide.description}
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
