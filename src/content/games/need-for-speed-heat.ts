import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const HEAT_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Heat";

export const NEED_FOR_SPEED_HEAT: GamePageContent = {
  slug: "need-for-speed-heat",
  title: "Need for Speed™ Heat",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+heat",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+heat",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+heat",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${HEAT_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${HEAT_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Heat/need-for-speed-heat-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${HEAT_ASSETS}/need-for-speed-heat-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Heat",
  },
  media: [
    {
      id: "hero-1",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-1.jpg`,
      alt: "Portada de Need for Speed Heat",
    },
    {
      id: "hero-2",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-2.avif`,
      alt: "Need for Speed Heat — captura 1",
    },
    {
      id: "hero-3",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-3.jpg`,
      alt: "Need for Speed Heat — captura 2",
    },
    {
      id: "hero-4",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-4.jpg`,
      alt: "Need for Speed Heat — captura 3",
    },
    {
      id: "hero-5",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-5.webp`,
      alt: "Need for Speed Heat — captura 4",
    },
    {
      id: "hero-6",
      src: `${HEAT_ASSETS}/need-for-speed-heat-imagen-6.jpg`,
      alt: "Need for Speed Heat — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Heat, desarrollado por Ghost Games, te lleva a Palm City: alterna carreras legales de día con persecuciones y eventos callejeros de noche, personaliza tu garaje, forma equipo con otros pilotos y escala en la lucha contra la policía corrupta y las bandas rivales en un mundo abierto lleno de adrenalina.",
    platforms: "PC, PlayStation 4, Xbox One",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés, Chino simplificado",
    publisher: "Electronic Arts",
    releaseDate: "8 nov 2019",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 10 de 64 bits" },
      {
        label: "Procesador",
        value: "Intel Core i5-4690 o AMD FX-8350 de ocho núcleos",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "50 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "Nvidia GeForce GTX 970 o AMD Radeon RX 480 (compatible con DirectX 12)",
      },
      { label: "DirectX", value: "Versión 12" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 10 de 64 bits" },
      {
        label: "Procesador",
        value: "Intel Core i7-4790 o AMD Ryzen 3 1300X",
      },
      { label: "Memoria", value: "16 GB RAM" },
      { label: "Disco duro", value: "50 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "Nvidia GeForce GTX 1660 o AMD Radeon RX 590 (compatible con DirectX 12)",
      },
      { label: "DirectX", value: "Versión 12" },
    ],
  },
};
