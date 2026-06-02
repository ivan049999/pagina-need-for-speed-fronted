import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERGROUND_2 } from "@/content/games/need-for-speed-underground-2";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Underground 2",
  description:
    "Explora Bayview de día y de noche con tuning profundo y carreras en mundo abierto.",
};

export default async function NeedForSpeedUnderground2Page() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_UNDERGROUND_2);
  return <UndergroundGamePage game={game} />;
}
