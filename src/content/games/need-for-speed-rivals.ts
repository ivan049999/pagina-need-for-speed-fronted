import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const RIVALS_ASSETS = "/images/juegos-need-for-speed/Need-For-Speed-Rivals";

export const NEED_FOR_SPEED_RIVALS: GamePageContent = {
  slug: "need-for-speed-rivals",
  title: "Need for Speed™ Rivals",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+rivals",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+rivals",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+rivals",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${RIVALS_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${RIVALS_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Rivals/need-for-speed-rivals-video-1.webm",
  coverImage: {
    id: "cover",
    src: `${RIVALS_ASSETS}/need-for-speed-rivals-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Rivals",
  },
  media: [
    {
      id: "hero-1",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-1.jpg`,
      alt: "Portada de Need for Speed Rivals",
    },
    {
      id: "hero-2",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-2.avif`,
      alt: "Need for Speed Rivals — captura 1",
    },
    {
      id: "hero-3",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-3.jpg`,
      alt: "Need for Speed Rivals — captura 2",
    },
    {
      id: "hero-4",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-4.jpg`,
      alt: "Need for Speed Rivals — captura 3",
    },
    {
      id: "hero-5",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-5.webp`,
      alt: "Need for Speed Rivals — captura 4",
    },
    {
      id: "hero-6",
      src: `${RIVALS_ASSETS}/need-for-speed-rivals-imagen-6.jpg`,
      alt: "Need for Speed Rivals — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Rivals, desarrollado por Ghost Games, enfrenta a corredores y policías en Redview County: elige tu bando, compite en eventos AllDrive interconectados, usa armas tácticas y vive persecuciones en mundo abierto con progresión online entre sesiones para demostrar quién domina la carretera.",
    platforms:
      "PC, PlayStation 3, PlayStation 4, Xbox 360, Xbox One",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "19 nov 2013",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      {
        label: "Sistema operativo",
        value: "Windows Vista SP2 (64 bits) / Windows 7",
      },
      {
        label: "Procesador",
        value: "Core 2 Duo a 2,4 GHz o Athlon X2 a 2,8 GHz",
      },
      { label: "Memoria", value: "4 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "512 MB, compatible con DirectX 10 (GeForce 8800 GT / Radeon HD 3870)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 10" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 8 (64 bits)" },
      {
        label: "Procesador",
        value: "Core i5 a 2,0 GHz o AMD FX-6100 de seis núcleos",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "2 GB o superior, compatible con DirectX 11 (GeForce GTX 660 / Radeon HD 7870)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 11" },
    ],
  },
};
