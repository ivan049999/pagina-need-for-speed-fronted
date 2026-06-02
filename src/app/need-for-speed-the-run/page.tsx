import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_THE_RUN } from "@/content/games/need-for-speed-the-run";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ The Run",
  description:
    "Carrera por la supervivencia de San Francisco a Nueva York en diez días, huyendo de la mafia y la ley.",
};

export default async function NeedForSpeedTheRunPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_THE_RUN);
  return <UndergroundGamePage game={game} />;
}
