import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_PROSTREET } from "@/content/games/need-for-speed-prostreet";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ ProStreet",
  description:
    "Competiciones legales de alto nivel: drag, grip, speed y drift en pistas reales.",
};

export default async function NeedForSpeedProStreetPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_PROSTREET);
  return <UndergroundGamePage game={game} />;
}
