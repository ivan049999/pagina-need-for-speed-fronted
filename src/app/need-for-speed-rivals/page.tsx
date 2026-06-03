import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_RIVALS } from "@/content/games/need-for-speed-rivals";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Rivals",
  description:
    "Corredores contra policías en Redview County con AllDrive, armas tácticas y mundo abierto.",
};

export default async function NeedForSpeedRivalsPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_RIVALS);
  return <UndergroundGamePage game={game} />;
}
