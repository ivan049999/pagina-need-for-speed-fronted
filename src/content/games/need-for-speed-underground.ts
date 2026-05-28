export type GameMediaItem = {
  id: string;
  src: string;
  alt: string;
};

export type GameSpecRow = {
  label: string;
  value: string;
};

export type GamePageContent = {
  slug: string;
  title: string;
  tags: string[];
  priceLabel: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  legalNote: string;
  rating: { label: string; descriptor: string };
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
  ctaLabel: "Descargar ahora",
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    label: "TEEN",
    descriptor: "Violencia, lenguaje moderado",
  },
  coverImage: {
    id: "cover",
    src: "https://upload.wikimedia.org/wikipedia/en/1/12/Need_for_Speed_Underground_cover.jpg",
    alt: "Carátula de Need for Speed Underground",
  },
  media: [
    {
      id: "hero-1",
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      alt: "Coches de carreras nocturnos en la ciudad",
    },
    {
      id: "hero-2",
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      alt: "Deportivo en calle urbana de noche",
    },
    {
      id: "hero-3",
      src: "https://images.unsplash.com/photo-1494976388531-d1058498ceb8?w=1200&q=80",
      alt: "Coche deportivo en carretera",
    },
    {
      id: "hero-4",
      src: "https://images.unsplash.com/photo-1583121274602-3e2820abc89e?w=1200&q=80",
      alt: "Detalle de vehículo de competición",
    },
    {
      id: "hero-5",
      src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
      alt: "Coche clásico deportivo",
    },
    {
      id: "hero-6",
      src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      alt: "Superdeportivo en entorno urbano",
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
