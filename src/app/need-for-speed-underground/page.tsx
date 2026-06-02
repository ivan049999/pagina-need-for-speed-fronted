import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERGROUND } from "@/content/games/need-for-speed-underground";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Underground",
  description:
    "Personalización extrema, carreras urbanas y cultura del tuning en las calles.",
};

export default async function NeedForSpeedUndergroundPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_UNDERGROUND);
  return <UndergroundGamePage game={game} />;
}
