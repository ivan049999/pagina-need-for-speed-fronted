import Image from "next/image";
import type { GamePageContent } from "@/content/games/need-for-speed-underground";

type Props = Pick<
  GamePageContent,
  | "coverImage"
  | "tags"
  | "priceLabel"
  | "price"
  | "priceNote"
  | "ctaLabel"
  | "legalNote"
  | "rating"
>;

const PLATFORM_LABELS = ["EA app", "Steam", "Epic", "PlayStation", "Xbox", "PC"];

export function GamePurchasePanel({
  coverImage,
  tags,
  priceLabel,
  price,
  priceNote,
  ctaLabel,
  legalNote,
  rating,
}: Props) {
  return (
    <aside className="border border-white/10 bg-[#111820] p-5 lg:sticky lg:top-40 lg:self-start">
      <div className="relative mx-auto mb-4 aspect-[3/4] w-full max-w-[220px] overflow-hidden bg-black">
        <Image
          src={coverImage.src}
          alt={coverImage.alt}
          fill
          className="object-cover"
          sizes="220px"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
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
        ))}
      </div>

      <p className="mb-2 text-sm text-white/70">Disponible en</p>
      <ul className="mb-5 flex flex-wrap gap-2 text-xs text-white/80">
        {PLATFORM_LABELS.map((platform) => (
          <li
            key={platform}
            className="rounded border border-white/15 px-2 py-1"
          >
            {platform}
          </li>
        ))}
      </ul>

      <p className="text-sm text-white/70">{priceLabel}</p>
      <p className="mb-1 text-3xl font-semibold text-white">{price}</p>
      <p className="mb-5 text-xs text-white/50">{priceNote}</p>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded bg-[#0768f8] py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1a75ff]"
      >
        {ctaLabel}
        <span aria-hidden>▾</span>
      </button>

      <p className="mt-5 text-[10px] leading-relaxed text-white/45">{legalNote}</p>

      <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-white text-xs font-bold text-black"
          aria-hidden
        >
          {rating.label}
        </div>
        <p className="text-xs text-white/60">{rating.descriptor}</p>
      </div>
    </aside>
  );
}
