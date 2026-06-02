import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_MOST_WANTED_2005 } from "@/content/games/need-for-speed-most-wanted-2005";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Most Wanted (2005)",
  description:
    "Escala la Blacklist en Rockport mientras la policía te persigue sin descanso.",
};

export default async function NeedForSpeedMostWanted2005Page() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_MOST_WANTED_2005);
  return <UndergroundGamePage game={game} />;
}
