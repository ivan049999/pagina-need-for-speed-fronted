import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_SHIFT_2_UNLEASHED } from "@/content/games/need-for-speed-shift-2-unleashed";

export const metadata: Metadata = {
  title: "Need for Speed™ Shift 2 Unleashed",
  description:
    "Secuela simuladora con clima dinámico, daños avanzados y carrera profesional en pistas oficiales.",
};

export default function NeedForSpeedShift2UnleashedPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_SHIFT_2_UNLEASHED} />;
}
