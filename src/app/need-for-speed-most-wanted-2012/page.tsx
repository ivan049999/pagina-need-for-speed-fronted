import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_MOST_WANTED_2012 } from "@/content/games/need-for-speed-most-wanted-2012";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Most Wanted (2012)",
  description:
    "Conviértete en el piloto más buscado de Fairhaven City con Autolog, mundo abierto y persecuciones.",
};

export default async function NeedForSpeedMostWanted2012Page() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_MOST_WANTED_2012);
  return <UndergroundGamePage game={game} />;
}
