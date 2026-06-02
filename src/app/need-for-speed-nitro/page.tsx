import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_NITRO } from "@/content/games/need-for-speed-nitro";

export const metadata: Metadata = {
  title: "Need for Speed™ Nitro",
  description:
    "Carreras arcade a toda velocidad en Wii y Nintendo DS con nitro, personalización y multijugador local.",
};

export default function NeedForSpeedNitroPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_NITRO} />;
}
