import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_PROSTREET } from "@/content/games/need-for-speed-prostreet";

export const metadata: Metadata = {
  title: "Need for Speed™ ProStreet",
  description:
    "Compite en carreras legales de drag, grip, speed y drift y conviértete en el piloto profesional definitivo.",
};

export default function NeedForSpeedProStreetPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_PROSTREET} />;
}
