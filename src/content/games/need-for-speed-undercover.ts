import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const UNDERCOVER_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Undercover";

export const NEED_FOR_SPEED_UNDERCOVER: GamePageContent = {
  slug: "need-for-speed-undercover",
  title: "Need for Speed™ Undercover",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+undercover",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+undercover",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+undercover",
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
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Undercover/need-for-speed-undercover-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Undercover",
  },
  media: [
    {
      id: "hero-1",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-1.jpg`,
      alt: "Portada de Need for Speed Undercover",
    },
    {
      id: "hero-2",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-2.jpg`,
      alt: "Need for Speed Undercover — captura 1",
    },
    {
      id: "hero-3",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-3.jpg`,
      alt: "Need for Speed Undercover — captura 2",
    },
    {
      id: "hero-4",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-4.jpg`,
      alt: "Need for Speed Undercover — captura 3",
    },
    {
      id: "hero-5",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-5.jpg`,
      alt: "Need for Speed Undercover — captura 4",
    },
    {
      id: "hero-6",
      src: `${UNDERCOVER_ASSETS}/need_for_speed_undercover-imagen-6.jpg`,
      alt: "Need for Speed Undercover — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Undercover te sumerge en Tri-City Bay como un agente encubierto. Infíltrate en el mundo de las carreras ilegales, gana la confianza de bandas criminales y desenmascara una conspiración mientras conduces coches exóticos en persecuciones, emboscadas y misiones de alto riesgo.",
    platforms:
      "PC, PlayStation 2, PlayStation 3, Xbox 360, Wii, PSP, Nintendo DS, móvil",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "18 nov 2008",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows XP SP2 / Vista" },
      {
        label: "Procesador",
        value: "Pentium 4 a 3,0 GHz o Athlon 64 3500+",
      },
      { label: "Memoria", value: "1 GB RAM (2 GB en Vista)" },
      { label: "Disco duro", value: "6 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "256 MB, compatible con DirectX 9.0c (GeForce 7600 / Radeon X1800)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP / Vista" },
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
