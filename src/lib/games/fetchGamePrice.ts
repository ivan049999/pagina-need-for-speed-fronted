import { getApiV1BaseUrl } from "@/lib/games/api-base";
import type { GamePriceApiResponse } from "@/types/game-price";

export async function fetchGamePrice(slug: string): Promise<GamePriceApiResponse["data"]> {
  const res = await fetch(`${getApiV1BaseUrl()}/games/${slug}/price`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`No se pudo cargar el precio (${res.status})`);
  }

  const json = (await res.json()) as GamePriceApiResponse;
  return json.data;
}
