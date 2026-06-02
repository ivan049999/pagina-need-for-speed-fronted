import type { GamePageContent } from "@/content/games/game-page-content";
import { fetchGameDetails } from "@/lib/games/fetchGameDetails";

/**
 * Combina el contenido estático de la página con la ficha verificada del backend.
 * Si la API no responde, se usa solo el contenido local (fallback).
 */
export async function loadGamePageContent(
  base: GamePageContent,
): Promise<GamePageContent> {
  const details = await fetchGameDetails(base.slug);

  if (!details) {
    return base;
  }

  return {
    ...base,
    about: details.about,
    systemRequirements: details.systemRequirements,
    rating: details.rating
      ? {
          ...base.rating,
          ...details.rating,
        }
      : base.rating,
  };
}
