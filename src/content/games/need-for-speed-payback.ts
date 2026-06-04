import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const PAYBACK_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Payback";

export const NEED_FOR_SPEED_PAYBACK: GamePageContent = {
  slug: "need-for-speed-payback",
  title: "Need for Speed™ Payback",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+payback",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+payback",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+payback",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${PAYBACK_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${PAYBACK_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Payback/need-for-speed-payback-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${PAYBACK_ASSETS}/need-for-speed-payback-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Payback",
  },
  media: [
    {
      id: "hero-1",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-1.jpg`,
      alt: "Portada de Need for Speed Payback",
    },
    {
      id: "hero-2",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-2.avif`,
      alt: "Need for Speed Payback — captura 1",
    },
    {
      id: "hero-3",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-3.jpg`,
      alt: "Need for Speed Payback — captura 2",
    },
    {
      id: "hero-4",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-4.jpg`,
      alt: "Need for Speed Payback — captura 3",
    },
    {
      id: "hero-5",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-5.webp`,
      alt: "Need for Speed Payback — captura 4",
    },
    {
      id: "hero-6",
      src: `${PAYBACK_ASSETS}/need-for-speed-payback-imagen-6.jpg`,
      alt: "Need for Speed Payback — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Payback, desarrollado por Ghost Games, te sumerge en Fortune Valley: vive una historia de venganza entre bandas rivales, personaliza coches al detalle, compite en carreras callejeras y desafíos off-road, y explora un mundo abierto lleno de eventos, coleccionables y persecuciones policiales.",
    platforms: "PC, PlayStation 4, Xbox One",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés, Chino simplificado",
    publisher: "Electronic Arts",
    releaseDate: "10 nov 2017",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      {
        label: "Sistema operativo",
        value: "Windows 7 de 64 bits o posterior",
      },
      {
        label: "Procesador",
        value:
          "Intel Core i3-6300 a 3,8 GHz o AMD FX-8150 a 3,6 GHz con 4 hilos",
      },
      { label: "Memoria", value: "6 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "Nvidia GeForce GTX 750 Ti o AMD Radeon HD 7850 (2 GB, compatible con DirectX 11)",
      },
      { label: "DirectX", value: "Versión 11" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 10 de 64 bits" },
      {
        label: "Procesador",
        value: "Intel Core i5-4690 o AMD FX-8350 de ocho núcleos",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "Nvidia GeForce GTX 1060 o AMD Radeon RX 480 (compatible con DirectX 11)",
      },
      { label: "DirectX", value: "Versión 11" },
    ],
  },
};
