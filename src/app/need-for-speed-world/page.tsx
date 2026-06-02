import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_WORLD } from "@/content/games/need-for-speed-world";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ World",
  description:
    "El MMO gratuito de la saga: mundo persistente, carreras online y personalización.",
};

export default async function NeedForSpeedWorldPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_WORLD);
  return <UndergroundGamePage game={game} />;
}
