import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_HEAT } from "@/content/games/need-for-speed-heat";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Heat",
  description:
    "Día legal, noche callejera y personalización en Palm City.",
};

export default async function NeedForSpeedHeatPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_HEAT);
  return <UndergroundGamePage game={game} />;
}
