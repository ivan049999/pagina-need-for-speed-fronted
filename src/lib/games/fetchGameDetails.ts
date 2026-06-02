import { getApiV1BaseUrl } from "@/lib/games/api-base";
import type { GamePageContent } from "@/content/games/game-page-content";
import type { GameDetailsApiResponse } from "@/types/game-details";

export async function fetchGameDetails(
  slug: string,
): Promise<Pick<GamePageContent, "about" | "systemRequirements" | "rating"> | null> {
  try {
    const res = await fetch(`${getApiV1BaseUrl()}/games/${slug}/details`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as GameDetailsApiResponse;
    const { about, systemRequirements, rating } = json.data;

    return {
      about,
      systemRequirements,
      ...(rating ? { rating } : {}),
    };
  } catch {
    return null;
  }
}
