import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERGROUND } from "@/content/games/need-for-speed-underground";

export const metadata: Metadata = {
  title: "Need for Speed™ Underground",
  description:
    "Personalización extrema, carreras urbanas y cultura del tuning en las calles.",
};

export default function NeedForSpeedUndergroundPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_UNDERGROUND} />;
}
