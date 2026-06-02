import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_HOT_PURSUIT_2010 } from "@/content/games/need-for-speed-hot-pursuit-2010";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Hot Pursuit (2010)",
  description:
    "Persecuciones en Seacrest County como corredor o policía con nitro y multijugador online.",
};

export default async function NeedForSpeedHotPursuit2010Page() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_HOT_PURSUIT_2010);
  return <UndergroundGamePage game={game} />;
}
