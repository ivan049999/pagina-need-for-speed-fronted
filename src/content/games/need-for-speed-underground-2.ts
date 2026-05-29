import type { GamePageContent } from "@/content/games/game-page-content";

const ASSET_BASE = "/images/juegos-need-for-speed/Need-For-Speed-Underground-2";

export const NEED_FOR_SPEED_UNDERGROUND_2: GamePageContent = {
  slug: "need-for-speed-underground-2",
  title: "Need for Speed™ Underground 2",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?q=Need+for+Speed+Underground+2",
      iconSrc: `${ASSET_BASE}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=Need+for+Speed+Underground+2&rh=n%3A599382031",
      iconSrc: `${ASSET_BASE}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=Need+for+Speed+Underground+2",
      iconSrc: `${ASSET_BASE}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 3,
    ageBadgeSrc: `${ASSET_BASE}/Pegi-3-Icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${ASSET_BASE}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Underground/nfsuVideo1.mp4",
  coverImage: {
    id: "cover",
    src: `${ASSET_BASE}/portada-need-for-speed-unserground.webp`,
    alt: "Carátula de Need for Speed Underground 2",
  },
  media: [
    {
      id: "hero-1",
      src: `${ASSET_BASE}/portada-need-for-speed-unserground.webp`,
      alt: "Portada de Need for Speed Underground 2",
    },
    {
      id: "hero-2",
      src: `${ASSET_BASE}/nfsu-imagen1.jpg`,
      alt: "Need for Speed Underground 2 — captura 1",
    },
    {
      id: "hero-3",
      src: `${ASSET_BASE}/nfsu-imagen2.jpg`,
      alt: "Need for Speed Underground 2 — captura 2",
    },
    {
      id: "hero-4",
      src: `${ASSET_BASE}/nfsu-imagen3.jpg`,
      alt: "Need for Speed Underground 2 — captura 3",
    },
    {
      id: "hero-5",
      src: `${ASSET_BASE}/nfsu-imagen4.jpg`,
      alt: "Need for Speed Underground 2 — captura 4",
    },
    {
      id: "hero-6",
      src: `${ASSET_BASE}/nfsu-imagen5.webp`,
      alt: "Need for Speed Underground 2 — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Underground 2 amplía el mundo abierto de Bayview con carreras libres de día y de noche, nuevos modos y una personalización aún más profunda. Explora la ciudad, desafía a rivales y construye tu leyenda en la escena del tuning mientras descubres rutas secretas y eventos sorpresa.",
    platforms: "PC, PlayStation 2, Xbox, GameCube, Game Boy Advance, Nintendo DS",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "9 nov 2004",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 98 / ME / 2000 / XP" },
      { label: "Procesador", value: "Pentium 4 o Athlon XP a 1,4 GHz" },
      { label: "Memoria", value: "256 MB RAM" },
      { label: "Disco duro", value: "2 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "64 MB, compatible con DirectX 9.0c (GeForce 3 / Radeon 8500)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP" },
      { label: "Procesador", value: "Pentium 4 a 2,0 GHz o equivalente" },
      { label: "Memoria", value: "512 MB RAM" },
      { label: "Disco duro", value: "2 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "128 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
