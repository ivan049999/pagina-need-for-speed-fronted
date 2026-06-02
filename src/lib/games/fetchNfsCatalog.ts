import { getApiV1BaseUrl } from "@/lib/games/api-base";
import { NFS_GAMES } from "@/config/nfs-games";
import type { NfsCatalogApiResponse, NfsCatalogEntry } from "@/types/nfs-catalog";

export function mapStaticGamesToCatalog(): NfsCatalogEntry[] {
  return NFS_GAMES.map((game) => ({
    label: game.label,
    href: game.href,
    releaseDate: "1970-01-01",
  }));
}

export async function fetchNfsCatalog(): Promise<NfsCatalogEntry[]> {
  try {
    const res = await fetch(`${getApiV1BaseUrl()}/games/catalog`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return mapStaticGamesToCatalog();
    }

    const json = (await res.json()) as NfsCatalogApiResponse;
    if (!Array.isArray(json.data) || json.data.length === 0) {
      return mapStaticGamesToCatalog();
    }

    return json.data;
  } catch {
    return mapStaticGamesToCatalog();
  }
}
