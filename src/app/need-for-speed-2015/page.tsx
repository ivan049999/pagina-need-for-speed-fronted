import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_2015 } from "@/content/games/need-for-speed-2015";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™",
  description:
    "Carreras nocturnas en Ventura Bay con personalización profunda, policía y mundo abierto.",
};

export default async function NeedForSpeed2015Page() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_2015);
  return <UndergroundGamePage game={game} />;
}
