import type { GamePageContent } from "@/content/games/game-page-content";

export type GameDetailsApiResponse = {
  data: {
    slug: string;
    source: string;
    about: GamePageContent["about"];
    systemRequirements: GamePageContent["systemRequirements"];
    rating?: GamePageContent["rating"];
  };
};
