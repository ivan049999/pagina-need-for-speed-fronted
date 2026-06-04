"use client";

import Image from "next/image";
import { useState } from "react";
import { UNBOUND_FEATURES } from "@/content/unbound/unbound-landing";
import { cn } from "@/lib/utils/cn";

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-lg text-white transition-colors hover:bg-white/10"
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}

export function UnboundFeatures() {
  const [index, setIndex] = useState(0);
  const slides = UNBOUND_FEATURES.slides;
  const slide = slides[index] ?? slides[0];
  const count = slides.length;

  function goPrev() {
    setIndex((i) => (i === 0 ? count - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === count - 1 ? 0 : i + 1));
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

        <div className="mt-10 overflow-hidden rounded-sm bg-[#252525] px-4 py-10 md:px-10 md:py-14">
          {/* Carrusel: slide activo centrado + asomos laterales */}
          <div className="relative mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3 md:gap-5">
              {slides.map((s, i) => {
                const offset = (i - index + count) % count;
                const isActive = offset === 0;
                const isSide = offset === 1 || offset === count - 1;

                if (!isActive && !isSide) {
                  return null;
                }

                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver ${s.title}`}
                    aria-current={isActive}
                    className={cn(
                      "relative shrink-0 overflow-hidden rounded-xl transition-all duration-500",
                      isActive
                        ? "h-[200px] w-[min(100%,520px)] opacity-100 md:h-[320px] md:w-[min(72%,640px)]"
                        : "hidden h-[160px] w-[120px] cursor-pointer opacity-40 hover:opacity-55 sm:block md:h-[240px] md:w-[180px]",
                      offset === count - 1 &&
                        !isActive &&
                        "order-first",
                    )}
                  >
                    <Image
                      src={s.imageSrc}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes={isActive ? "640px" : "180px"}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Diapositiva ${i + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === index ? "bg-white" : "bg-white/35",
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Texto centrado + flechas a los lados (estilo EA) */}
          <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-4 md:gap-8">
            <NavArrow direction="prev" onClick={goPrev} label="Anterior" />

            <div className="min-w-0 flex-1 text-center">
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                {slide.title}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                {slide.description}
              </p>
            </div>

            <NavArrow direction="next" onClick={goNext} label="Siguiente" />
          </div>
        </div>
      </div>
    </section>
  );
}
