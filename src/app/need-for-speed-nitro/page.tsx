import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_NITRO } from "@/content/games/need-for-speed-nitro";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Nitro",
  description:
    "Carreras arcade a toda velocidad en Wii y Nintendo DS con nitro, personalización y multijugador local.",
};

export default async function NeedForSpeedNitroPage() {
  const game = await loadGamePageContent(NEED_FOR_SPEED_NITRO);
  return <UndergroundGamePage game={game} />;
}
