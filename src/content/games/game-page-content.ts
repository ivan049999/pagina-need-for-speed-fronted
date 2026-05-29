export type GameMediaItem = {
  id: string;
  src: string;
  alt: string;
};

export type GameSpecRow = {
  label: string;
  value: string;
};

export type StorePlatform = {
  id: "ea" | "xbox" | "steam";
  label: string;
  href: string;
  iconSrc?: string;
};

export type PegiDescriptorId = "violence" | "bad-language" | "fear";

export type PegiDescriptor = {
  id: PegiDescriptorId;
  label: string;
  iconSrc?: string;
};

export type GameRating =
  | {
      system: "pegi";
      age: number;
      ageBadgeSrc?: string;
      descriptors?: PegiDescriptor[];
    }
  | {
      system: "esrb";
      label: string;
      descriptor: string;
    };

export type GamePageContent = {
  slug: string;
  title: string;
  tags: string[];
  priceLabel: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  storePlatforms: StorePlatform[];
  legalNote: string;
  rating: GameRating;
  heroVideoSrc: string;
  media: GameMediaItem[];
  coverImage: GameMediaItem;
  about: {
    title: string;
    description: string;
    platforms: string;
    languages: string;
    publisher: string;
    releaseDate: string;
  };
  systemRequirements: {
    title: string;
    osLabel: string;
    minimum: GameSpecRow[];
    recommended: GameSpecRow[];
  };
};
