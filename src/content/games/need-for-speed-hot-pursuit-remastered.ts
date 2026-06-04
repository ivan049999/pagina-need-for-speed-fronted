import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const HP_REMASTERED_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Hot-Pursuit-Remastered";

export const NEED_FOR_SPEED_HOT_PURSUIT_REMASTERED: GamePageContent = {
  slug: "need-for-speed-hot-pursuit-remastered",
  title: "Need for Speed™ Hot Pursuit Remastered",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+hot+pursuit+remastered",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+hot+pursuit+remastered",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+hot+pursuit+remastered",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 7,
    ageBadgeSrc: `${HP_REMASTERED_ASSETS}/Pegi-7-Icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${HP_REMASTERED_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Hot-Pursuit-Remastered/need-for-speed-hot-pursuit-remastered-video-1.webm",
  coverImage: {
    id: "cover",
    src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Hot Pursuit Remastered",
  },
  media: [
    {
      id: "hero-1",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-1.jpg`,
      alt: "Portada de Need for Speed Hot Pursuit Remastered",
    },
    {
      id: "hero-2",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-2.avif`,
      alt: "Need for Speed Hot Pursuit Remastered — captura 1",
    },
    {
      id: "hero-3",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-3.jpg`,
      alt: "Need for Speed Hot Pursuit Remastered — captura 2",
    },
    {
      id: "hero-4",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-4.jpg`,
      alt: "Need for Speed Hot Pursuit Remastered — captura 3",
    },
    {
      id: "hero-5",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-5.webp`,
      alt: "Need for Speed Hot Pursuit Remastered — captura 4",
    },
    {
      id: "hero-6",
      src: `${HP_REMASTERED_ASSETS}/need-for-speed-hot-pursuit-remastered-imagen-6.jpg`,
      alt: "Need for Speed Hot Pursuit Remastered — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Hot Pursuit Remastered, desarrollado por Stellar Entertainment, revive el clásico de Criterion con gráficos mejorados: persigue o escapa como policía o corredor en carreras de alto riesgo por carreteras costeras, desbloquea armas y vehículos exclusivos, y compite en modo individual o multijugador con toda la adrenalina del original.",
    platforms:
      "PC, PlayStation 4, Xbox One, Nintendo Switch",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés, Chino simplificado",
    publisher: "Electronic Arts",
    releaseDate: "6 nov 2020",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 10 de 64 bits" },
      {
        label: "Procesador",
        value: "Intel Core i5-3570 o AMD FX-6350",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "Nvidia GeForce GTX 760 o AMD Radeon HD 7970 (compatible con DirectX 11)",
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
          "Nvidia GeForce GTX 970 o AMD Radeon RX 480 (compatible con DirectX 11)",
      },
      { label: "DirectX", value: "Versión 11" },
    ],
  },
};
