import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const SHIFT2_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Shift-2-Unleashed";

export const NEED_FOR_SPEED_SHIFT_2_UNLEASHED: GamePageContent = {
  slug: "need-for-speed-shift-2-unleashed",
  title: "Need for Speed™ Shift 2 Unleashed",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+shift+2",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+shift+2+unleashed",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+shift+2+unleashed",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${CARBON_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Shift-2-Unleashed/need-for-speed-shift-2-unleashed-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Shift 2 Unleashed",
  },
  media: [
    {
      id: "hero-1",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-1.jpg`,
      alt: "Portada de Need for Speed Shift 2 Unleashed",
    },
    {
      id: "hero-2",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-2.avif`,
      alt: "Need for Speed Shift 2 Unleashed — captura 1",
    },
    {
      id: "hero-3",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-3.jpg`,
      alt: "Need for Speed Shift 2 Unleashed — captura 2",
    },
    {
      id: "hero-4",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-4.jpg`,
      alt: "Need for Speed Shift 2 Unleashed — captura 3",
    },
    {
      id: "hero-5",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-5.webp`,
      alt: "Need for Speed Shift 2 Unleashed — captura 4",
    },
    {
      id: "hero-6",
      src: `${SHIFT2_ASSETS}/need-for-speed-shift-2-unleashed-imagen-6.jpg`,
      alt: "Need for Speed Shift 2 Unleashed — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Shift 2 Unleashed continúa la apuesta simuladora de Slightly Mad Studios con un enfoque más exigente: carreras en pistas reales, daños avanzados, clima dinámico, desafíos de precisión y un modo carrera ampliado para dominar categorías desde GT hasta prototipos de competición.",
    platforms: "PC, PlayStation 3, Xbox 360",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "18 mar 2011",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows XP SP3" },
      {
        label: "Procesador",
        value: "Core 2 Duo a 2,0 GHz o Athlon X2 a 2,4 GHz",
      },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "10 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "512 MB, compatible con DirectX 9.0c (GeForce 8800 / Radeon HD 3870)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 7" },
      { label: "Procesador", value: "Core 2 Quad a 2,4 GHz o equivalente" },
      { label: "Memoria", value: "4 GB RAM" },
      { label: "Disco duro", value: "10 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "1 GB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
