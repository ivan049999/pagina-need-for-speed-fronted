import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_PAYBACK } from "@/content/games/need-for-speed-payback";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Payback",
  description:
    "Venganza, personalización y mundo abierto en Fortune Valley.",
};

export default async function NeedForSpeedPaybackPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_PAYBACK);
  return <UndergroundGamePage game={game} />;
}
