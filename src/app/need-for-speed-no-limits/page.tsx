import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_NO_LIMITS } from "@/content/games/need-for-speed-no-limits";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ No Limits",
  description:
    "Carreras callejeras free-to-play en iOS y Android con personalización y eventos en Blackridge.",
};

export default async function NeedForSpeedNoLimitsPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_NO_LIMITS);
  return <UndergroundGamePage game={game} />;
}
