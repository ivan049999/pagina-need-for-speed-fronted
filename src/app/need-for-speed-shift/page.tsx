import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_SHIFT } from "@/content/games/need-for-speed-shift";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Shift",
  description:
    "Simulador arcade de circuito con coches reales y carrera profesional.",
};

export default async function NeedForSpeedShiftPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_SHIFT);
  return <UndergroundGamePage game={game} />;
}
