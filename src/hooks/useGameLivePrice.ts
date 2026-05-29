"use client";

import { useCallback, useEffect, useState } from "react";
import { getApiV1BaseUrl } from "@/lib/games/api-base";
import type { GameLivePrice } from "@/types/game-price";

const REFRESH_MS = 60 * 60 * 1000;

type Options = {
  slug: string;
  fallbackPrice: string;
  fallbackPriceLabel: string;
};

export function useGameLivePrice({
  slug,
  fallbackPrice,
  fallbackPriceLabel,
}: Options) {
  const [price, setPrice] = useState(fallbackPrice);
  const [priceLabel, setPriceLabel] = useState(fallbackPriceLabel);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${getApiV1BaseUrl()}/games/${slug}/price`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = (await res.json()) as { data: GameLivePrice };
      setPrice(json.data.formatted);
      setPriceLabel(json.data.priceLabel);
    } catch {
      /* keep fallback */
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
    const interval = window.setInterval(load, REFRESH_MS);
    return () => window.clearInterval(interval);
  }, [load]);

  return { price, priceLabel, loading, refresh: load };
}
