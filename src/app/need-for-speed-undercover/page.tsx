import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERCOVER } from "@/content/games/need-for-speed-undercover";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Undercover",
  description:
    "Infíltrate en Tri-City Bay como agente encubierto en carreras y persecuciones.",
};

export default async function NeedForSpeedUndercoverPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_UNDERCOVER);
  return <UndergroundGamePage game={game} />;
}
