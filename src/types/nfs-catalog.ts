export type NfsCatalogEntry = {
  label: string;
  href: string;
  slug?: string;
  releaseDate: string;
};

export type NfsCatalogApiResponse = {
  data: NfsCatalogEntry[];
  meta: {
    count: number;
    updatedAt: string;
    source: string;
  };
};
