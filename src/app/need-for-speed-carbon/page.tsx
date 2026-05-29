import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_CARBON } from "@/content/games/need-for-speed-carbon";

export const metadata: Metadata = {
  title: "Need for Speed™ Carbon",
  description:
    "Domina Palmont, forma tu crew y conquista territorios en carreras callejeras de alto riesgo.",
};

export default function NeedForSpeedCarbonPage() {
  return <UndergroundGamePage game={NEED_FOR_SPEED_CARBON} />;
}
