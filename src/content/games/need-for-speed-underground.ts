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

export const NEED_FOR_SPEED_UNDERGROUND: GamePageContent = {
  slug: "need-for-speed-underground",
  title: "Need for Speed™ Underground",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "En EA app desde",
  price: "$9.99",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/product-detail/?id=5030934036184",
      iconSrc:
        "/images/juegos-need-for-speed/Need-For-Speed-Underground/CeX_Logo.webp",
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/Need-for-Speed-Underground-Videojuegos/s?k=Need+for+Speed+Underground&rh=n%3A599382031",
      iconSrc:
        "/images/juegos-need-for-speed/Need-For-Speed-Underground/logoAmazon.png",
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/b/Need-for-Speed-Underground-EA-Video-Games/139973/bn_101708850",
      iconSrc:
        "/images/juegos-need-for-speed/Need-For-Speed-Underground/logoEbay.png",
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 3,
    ageBadgeSrc:
      "/images/juegos-need-for-speed/Need-For-Speed-Underground/Pegi-3-Icono.png",
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc:
          "/images/juegos-need-for-speed/Need-For-Speed-Underground/violence-Icono.png",
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Underground/nfsuVideo1.mp4",
  coverImage: {
    id: "cover",
    src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/portada-need-for-speed-unserground.webp",
    alt: "Carátula de Need for Speed Underground",
  },
  media: [
    {
      id: "hero-1",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/portada-need-for-speed-unserground.webp",
      alt: "Portada de Need for Speed Underground",
    },
    {
      id: "hero-2",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/nfsu-imagen1.jpg",
      alt: "Need for Speed Underground — captura 1",
    },
    {
      id: "hero-3",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/nfsu-imagen2.jpg",
      alt: "Need for Speed Underground — captura 2",
    },
    {
      id: "hero-4",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/nfsu-imagen3.jpg",
      alt: "Need for Speed Underground — captura 3",
    },
    {
      id: "hero-5",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/nfsu-imagen4.jpg",
      alt: "Need for Speed Underground — captura 4",
    },
    {
      id: "hero-6",
      src: "/images/juegos-need-for-speed/Need-For-Speed-Underground/nfsu-imagen5.webp",
      alt: "Need for Speed Underground — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Underground te lleva a las calles con un enfoque en la personalización extrema, carreras ilegales y la cultura del tuning. Compite en circuitos urbanos, desbloquea piezas visuales y mecánicas, y escala desde coches de calle hasta máquinas de leyenda mientras construyes tu reputación en la escena underground.",
    platforms: "PC, PlayStation 2, Xbox, GameCube",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "17 nov 2003",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 98 / ME / 2000 / XP" },
      { label: "Procesador", value: "Pentium III o Athlon equivalente a 500 MHz" },
      { label: "Memoria", value: "128 MB RAM" },
      { label: "Disco duro", value: "1,4 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "32 MB, compatible con DirectX 8.1 (GeForce 2 / Radeon)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP" },
      { label: "Procesador", value: "Pentium 4 o Athlon XP a 1,4 GHz" },
      { label: "Memoria", value: "256 MB RAM" },
      { label: "Disco duro", value: "1,4 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "64 MB o superior, compatible con DirectX 8.1",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX" },
    ],
  },
};
