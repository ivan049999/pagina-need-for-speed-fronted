import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_SHIFT_2_UNLEASHED } from "@/content/games/need-for-speed-shift-2-unleashed";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Shift 2 Unleashed",
  description:
    "Simulación exigente en pistas reales con daños, clima dinámico y modo carrera ampliado.",
};

export default async function NeedForSpeedShift2UnleashedPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_SHIFT_2_UNLEASHED);
  return <UndergroundGamePage game={game} />;
}
