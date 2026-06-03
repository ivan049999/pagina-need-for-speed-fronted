import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const THE_RUN_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-The-Run";

export const NEED_FOR_SPEED_THE_RUN: GamePageContent = {
  slug: "need-for-speed-the-run",
  title: "Need for Speed™ The Run",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+the+run",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+the+run",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+the+run",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 7,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${CARBON_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-The-Run/need-for-speed-the-run-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${THE_RUN_ASSETS}/need-for-speed-the-run-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed The Run",
  },
  media: [
    {
      id: "hero-1",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-1.jpg`,
      alt: "Portada de Need for Speed The Run",
    },
    {
      id: "hero-2",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-2.avif`,
      alt: "Need for Speed The Run — captura 1",
    },
    {
      id: "hero-3",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-3.jpg`,
      alt: "Need for Speed The Run — captura 2",
    },
    {
      id: "hero-4",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-4.jpg`,
      alt: "Need for Speed The Run — captura 3",
    },
    {
      id: "hero-5",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-5.webp`,
      alt: "Need for Speed The Run — captura 4",
    },
    {
      id: "hero-6",
      src: `${THE_RUN_ASSETS}/need-for-speed-the-run-imagen-6.jpg`,
      alt: "Need for Speed The Run — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ The Run, desarrollado por EA Black Box, es una carrera por la supervivencia a través de Estados Unidos: de San Francisco a Nueva York en diez días, huyendo de la mafia y de la ley. Combina secuencias de conducción arcade, persecuciones cinematográficas y momentos QTE en un viaje trepidante por autopistas, desiertos y ciudades.",
    platforms:
      "PC, PlayStation 3, Xbox 360, Wii, Nintendo 3DS",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "18 nov 2011",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows Vista SP2 (32 bits)" },
      {
        label: "Procesador",
        value: "Core 2 Duo a 2,0 GHz o Athlon X2 a 2,4 GHz",
      },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "18 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "512 MB, compatible con DirectX 9.0c (GeForce 8800 / Radeon HD 3850)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 7" },
      { label: "Procesador", value: "Core 2 Quad a 2,4 GHz o equivalente" },
      { label: "Memoria", value: "4 GB RAM" },
      { label: "Disco duro", value: "18 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "1 GB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
