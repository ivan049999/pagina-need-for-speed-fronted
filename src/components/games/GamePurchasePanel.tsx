"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PegiRatingBadges } from "@/components/games/PegiRatingBadges";
import { useGameLivePrice } from "@/hooks/useGameLivePrice";
import { PlatformSelectModal } from "@/components/games/PlatformSelectModal";
import type { GamePageContent } from "@/content/games/game-page-content";

type Props = Pick<
  GamePageContent,
  | "coverImage"
  | "tags"
  | "priceLabel"
  | "price"
  | "priceNote"
  | "ctaLabel"
  | "storePlatforms"
  | "legalNote"
  | "rating"
  | "slug"
>;

export function GamePurchasePanel({
  coverImage,
  tags,
  priceLabel,
  price,
  priceNote,
  ctaLabel,
  storePlatforms,
  legalNote,
  rating,
  slug,
}: Props) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { price: livePrice, priceLabel: livePriceLabel } = useGameLivePrice({
    slug,
    fallbackPrice: price,
    fallbackPriceLabel: priceLabel,
  });

  return (
    <>
      <aside className="border border-white/10 bg-[#111820] p-5 lg:sticky lg:top-40 lg:self-start">
        <div className="relative mx-auto mb-4 aspect-[3/4] w-full max-w-[220px] overflow-hidden bg-black">
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            unoptimized={coverImage.src.startsWith("/images/")}
            className="object-cover"
            sizes="220px"
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) =>
            tag === "Carreras" ? (
              <Link
                key={tag}
                href="https://www.ea.com/es-es/games/library/racing"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {tag}
              </Link>
            ) : (
              <span
                key={tag}
                className={
                  tag === "Juego básico"
                    ? "rounded-full bg-[#0768f8] px-3 py-1 text-xs font-medium text-white"
                    : "rounded-full border border-white/30 px-3 py-1 text-xs text-white/90"
                }
              >
                {tag}
              </span>
            )
          )}
        </div>

        <p className="text-sm text-white/70">{livePriceLabel}</p>
        <p className="mb-1 text-3xl font-semibold text-white">{livePrice}</p>
        <p className="mb-5 text-xs text-white/50">{priceNote}</p>

        <button
          type="button"
          onClick={() => setPlatformModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded bg-[#0768f8] py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#1a75ff]"
        >
          {ctaLabel}
          <span aria-hidden>▾</span>
        </button>

        <p className="mt-5 text-[10px] leading-relaxed text-white/45">{legalNote}</p>

        <PegiRatingBadges rating={rating} />
      </aside>

      <PlatformSelectModal
        open={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        platforms={storePlatforms}
      />
    </>
  );
}
