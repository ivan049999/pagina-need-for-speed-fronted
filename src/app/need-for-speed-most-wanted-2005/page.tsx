import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_MOST_WANTED_2005 } from "@/content/games/need-for-speed-most-wanted-2005";

export const metadata: Metadata = {
  title: "Need for Speed™ Most Wanted (2005)",
  description:
    "Huye de la policía, escala la Blacklist y conviértete en el más buscado de Rockport.",
};

export default function NeedForSpeedMostWanted2005Page() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_MOST_WANTED_2005} />;
}
