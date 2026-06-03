import Image from "next/image";
import type { ReactElement } from "react";
import type {
  GameRating,
  PegiDescriptor,
} from "@/content/games/game-page-content";

const PEGI_BADGE_WIDTH = 50;
const PEGI_BADGE_HEIGHT = 58;

function PegiBadgeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: PEGI_BADGE_WIDTH, height: PEGI_BADGE_HEIGHT }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${PEGI_BADGE_WIDTH}px`}
        className="object-cover object-center"
        draggable={false}
      />
    </div>
  );
}

function ViolenceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="white"
        d="M8 4c-.5 1.2-.2 2.5.8 3.2L7 9.5 5.5 8.2 4 10l2.8 2.1-1.2 3.5 2.3-1.5.5 2.4h2.1l.5-2.4 2.3 1.5-1.2-3.5L18 10l-1.5-1.8L15 9.5l-1.8-2.3c1-.7 1.3-2 .8-3.2-.8 0-1.6.3-2.2.8L12 3l-1.8.8C9.6 3.3 8.8 3 8 4zm4 14.5c-2.8 0-5 1.1-5 2.5h10c0-1.4-2.2-2.5-5-2.5z"
      />
    </svg>
  );
}

function BadLanguageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="white"
        d="M4 4h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v2h8V8H6zm0 4v2h5v-2H6z"
      />
    </svg>
  );
}

function FearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="white"
        d="M12 3c-3.5 2.5-6 6-6 10a6 6 0 1 0 12 0c0-4-2.5-7.5-6-10zm0 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2.5 6.5h5l-1 2h-3l-1-2z"
      />
    </svg>
  );
}

const DESCRIPTOR_ICONS: Record<PegiDescriptor["id"], () => ReactElement> = {
  violence: ViolenceIcon,
  "bad-language": BadLanguageIcon,
  fear: FearIcon,
};

function PegiAgeBadge({
  age,
  src,
  combined,
}: {
  age: number;
  src?: string;
  combined?: boolean;
}) {
  if (src) {
    if (combined) {
      return (
        <Image
          src={src}
          alt={`PEGI ${age}`}
          width={106}
          height={58}
          className="h-[58px] w-auto shrink-0 object-contain object-left"
          draggable={false}
        />
      );
    }
    return <PegiBadgeImage src={src} alt={`PEGI ${age}`} />;
  }

  return (
    <div
      className="flex h-[58px] w-[50px] shrink-0 flex-col items-center justify-between bg-[#00a651] py-1.5 text-white"
      role="img"
      aria-label={`PEGI ${age}`}
    >
      <span className="flex flex-1 items-center text-[30px] font-bold leading-none">
        {age}
      </span>
      <span className="px-0.5 text-center text-[5.5px] leading-tight tracking-tight">
        www.pegi.info
      </span>
    </div>
  );
}

function PegiDescriptorBadge({ descriptor }: { descriptor: PegiDescriptor }) {
  if (descriptor.iconSrc) {
    return (
      <PegiBadgeImage
        src={descriptor.iconSrc}
        alt={descriptor.label || "Descriptor PEGI"}
      />
    );
  }

  const Icon = DESCRIPTOR_ICONS[descriptor.id];
  return (
    <div
      className="flex h-[58px] w-[50px] shrink-0 flex-col items-center justify-between bg-black py-1.5 text-white"
      role="img"
      aria-label={descriptor.label}
    >
      <span className="flex flex-1 items-center justify-center">
        {Icon ? <Icon /> : null}
      </span>
      <span className="px-0.5 text-center text-[7px] leading-tight">
        {descriptor.label}
      </span>
    </div>
  );
}

type PegiRatingBadgesProps = {
  rating: GameRating;
};

export function PegiRatingBadges({ rating }: PegiRatingBadgesProps) {
  if (rating.system === "esrb") {
    return (
      <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-lg font-bold text-black"
          role="img"
          aria-label={`ESRB ${rating.label}`}
        >
          {rating.label}
        </div>
        <p className="text-xs leading-relaxed text-white/60">{rating.descriptor}</p>
      </div>
    );
  }

  const descriptors = rating.descriptors ?? [];
  const combinedPegi =
    Boolean(rating.ageBadgeSrc) && descriptors.length === 0;
  const ariaParts = [`PEGI ${rating.age}`, ...descriptors.map((d) => d.label)];

  return (
    <div
      className="mt-4 flex items-end gap-0.5 border-t border-white/10 pt-4"
      role="group"
      aria-label={ariaParts.join(", ")}
    >
      <PegiAgeBadge
        age={rating.age}
        src={rating.ageBadgeSrc}
        combined={combinedPegi}
      />
      {descriptors.map((descriptor) => (
        <PegiDescriptorBadge key={descriptor.id} descriptor={descriptor} />
      ))}
    </div>
  );
}
