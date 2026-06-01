import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_WORLD } from "@/content/games/need-for-speed-world";

export const metadata: Metadata = {
  title: "Need for Speed™ World",
  description:
    "Explora un MMO de carreras en mundo abierto, personaliza tu coche y compite en línea.",
};

export default function NeedForSpeedWorldPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_WORLD} />;
}
