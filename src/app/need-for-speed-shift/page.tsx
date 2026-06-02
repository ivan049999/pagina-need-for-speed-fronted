import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_SHIFT } from "@/content/games/need-for-speed-shift";

export const metadata: Metadata = {
  title: "Need for Speed™ Shift",
  description:
    "Simulador de circuito con coches reales, carrera profesional y física mejorada en pistas oficiales.",
};

export default function NeedForSpeedShiftPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_SHIFT} />;
}
