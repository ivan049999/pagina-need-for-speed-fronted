import { GameAboutSection } from "@/components/games/GameAboutSection";
import { GameMediaHero } from "@/components/games/GameMediaHero";
import { GamePurchasePanel } from "@/components/games/GamePurchasePanel";
import { GameSystemRequirements } from "@/components/games/GameSystemRequirements";
import type { GamePageContent } from "@/content/games/need-for-speed-underground";

type Props = {
  game: GamePageContent;
};

export function UndergroundGamePage({ game }: Props) {
  return (
    <div className="bg-[#0b0e13] text-white">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <GameMediaHero
            title={game.title}
            media={game.media}
            videoSrc={game.heroVideoSrc}
          />

          <div className="mt-8 lg:mt-0">
            <GamePurchasePanel
              slug={game.slug}
              coverImage={game.coverImage}
              tags={game.tags}
              priceLabel={game.priceLabel}
              price={game.price}
              priceNote={game.priceNote}
              ctaLabel={game.ctaLabel}
              storePlatforms={game.storePlatforms}
              legalNote={game.legalNote}
              rating={game.rating}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2 lg:gap-12">
          <GameAboutSection about={game.about} />
          <GameSystemRequirements requirements={game.systemRequirements} />
        </div>
      </div>
    </div>
  );
}
