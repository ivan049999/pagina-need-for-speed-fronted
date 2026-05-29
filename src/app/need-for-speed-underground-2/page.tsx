import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_UNDERGROUND_2 } from "@/content/games/need-for-speed-underground-2";

export const metadata: Metadata = {
  title: "Need for Speed™ Underground 2",
  description:
    "Mundo abierto, tuning extremo y carreras urbanas de día y de noche en Bayview.",
};

export default function NeedForSpeedUnderground2Page() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_UNDERGROUND_2} />;
}
