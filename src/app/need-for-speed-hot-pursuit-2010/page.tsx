import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_HOT_PURSUIT_2010 } from "@/content/games/need-for-speed-hot-pursuit-2010";

export const metadata: Metadata = {
  title: "Need for Speed™ Hot Pursuit (2010)",
  description:
    "Persigue o escapa en Seacrest County: carreras cinematográficas, armas tácticas y multijugador online.",
};

export default function NeedForSpeedHotPursuit2010Page() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_HOT_PURSUIT_2010} />;
}
