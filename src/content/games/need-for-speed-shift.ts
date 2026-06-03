import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const SHIFT_ASSETS = "/images/juegos-need-for-speed/Need-For-Speed-Shift";

export const NEED_FOR_SPEED_SHIFT: GamePageContent = {
  slug: "need-for-speed-shift",
  title: "Need for Speed™ Shift",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+shift",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+shift",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+shift",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 7,
    ageBadgeSrc: `${SHIFT_ASSETS}/Pegi-7-Icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${CARBON_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Shift/need-for-speed-shift-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${SHIFT_ASSETS}/need-for-speed-shift-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Shift",
  },
  media: [
    {
      id: "hero-1",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-1.jpg`,
      alt: "Portada de Need for Speed Shift",
    },
    {
      id: "hero-2",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-2.avif`,
      alt: "Need for Speed Shift — captura 1",
    },
    {
      id: "hero-3",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-3.jpg`,
      alt: "Need for Speed Shift — captura 2",
    },
    {
      id: "hero-4",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-4.jpg`,
      alt: "Need for Speed Shift — captura 3",
    },
    {
      id: "hero-5",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-5.webp`,
      alt: "Need for Speed Shift — captura 4",
    },
    {
      id: "hero-6",
      src: `${SHIFT_ASSETS}/need-for-speed-shift-imagen-6.jpg`,
      alt: "Need for Speed Shift — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Shift, desarrollado por Slightly Mad Studios, aleja la saga del street racing para ofrecer un simulador arcade de circuito: conduce coches reales en pistas oficiales, progresa en la carrera profesional y vive un enfoque más técnico con daños, física mejorada y carreras nocturnas bajo los focos.",
    platforms: "PC, PlayStation 3, Xbox 360, PSP",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "15 sep 2009",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows XP SP2 / Vista" },
      {
        label: "Procesador",
        value: "Pentium 4 a 3,2 GHz o Athlon 64 3500+",
      },
      { label: "Memoria", value: "1 GB RAM (2 GB en Vista)" },
      { label: "Disco duro", value: "6 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "256 MB, compatible con DirectX 9.0c (GeForce 7600 / Radeon X1600)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows Vista / 7" },
      { label: "Procesador", value: "Core 2 Duo a 2,0 GHz o equivalente" },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "6 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "512 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
