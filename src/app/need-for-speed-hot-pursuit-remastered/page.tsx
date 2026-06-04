import type { Metadata } from "next";
import { UndergroundGamePage } from "@/components/games/UndergroundGamePage";
import { NEED_FOR_SPEED_HOT_PURSUIT_REMASTERED } from "@/content/games/need-for-speed-hot-pursuit-remastered";
import { loadGamePageContent } from "@/lib/games/loadGamePageContent";

export const metadata: Metadata = {
  title: "Need for Speed™ Hot Pursuit Remastered",
  description:
    "El clásico de persecución policial y carreras, remasterizado.",
};

export default async function NeedForSpeedHotPursuitRemasteredPage() {
  const game = await loadGamePageContent(
    NEED_FOR_SPEED_HOT_PURSUIT_REMASTERED,
  );
  return <UndergroundGamePage game={game} />;
}
