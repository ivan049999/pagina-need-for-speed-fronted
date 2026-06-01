import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERCOVER } from "@/content/games/need-for-speed-undercover";

export const metadata: Metadata = {
  title: "Need for Speed™ Undercover",
  description:
    "Infíltrate en Tri-City Bay como agente encubierto y desenmascara una conspiración bajo presión.",
};

export default function NeedForSpeedUndercoverPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_UNDERCOVER} />;
}
