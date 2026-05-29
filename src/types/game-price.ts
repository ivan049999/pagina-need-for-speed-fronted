export type GamePriceSourceId = "ea" | "cex" | "fallback";

export type GamePriceSourceDetail = {
  source: GamePriceSourceId;
  amount: number;
  currency: "EUR";
  formatted: string;
  available: boolean;
};

export type GameLivePrice = {
  slug: string;
  amount: number;
  currency: "EUR";
  formatted: string;
  source: GamePriceSourceId;
  priceLabel: string;
  sources: GamePriceSourceDetail[];
  fetchedAt: string;
  stale: boolean;
};

export type GamePriceApiResponse = {
  data: GameLivePrice;
};
