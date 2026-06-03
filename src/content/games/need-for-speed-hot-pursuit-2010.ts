import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const HOT_PURSUIT_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Hot-Pursuit-2010";

export const NEED_FOR_SPEED_HOT_PURSUIT_2010: GamePageContent = {
  slug: "need-for-speed-hot-pursuit-2010",
  title: "Need for Speed™ Hot Pursuit (2010)",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+hot+pursuit+2010",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+hot+pursuit+2010",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+hot+pursuit+2010",
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
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Hot-Pursuit-2010/need-for-speed-hot-pursuit-2010-video-1.webm",
  coverImage: {
    id: "cover",
    src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Hot Pursuit (2010)",
  },
  media: [
    {
      id: "hero-1",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-1.jpg`,
      alt: "Portada de Need for Speed Hot Pursuit (2010)",
    },
    {
      id: "hero-2",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-2.avif`,
      alt: "Need for Speed Hot Pursuit (2010) — captura 1",
    },
    {
      id: "hero-3",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-3.jpg`,
      alt: "Need for Speed Hot Pursuit (2010) — captura 2",
    },
    {
      id: "hero-4",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-4.jpg`,
      alt: "Need for Speed Hot Pursuit (2010) — captura 3",
    },
    {
      id: "hero-5",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-5.webp`,
      alt: "Need for Speed Hot Pursuit (2010) — captura 4",
    },
    {
      id: "hero-6",
      src: `${HOT_PURSUIT_ASSETS}/need-for-speed-hot-pursuit-2010-imagen-6.jpg`,
      alt: "Need for Speed Hot Pursuit (2010) — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Hot Pursuit (2010), desarrollado por Criterion Games, reinventa la persecución en Seacrest County: elige bando como corredor o policía, usa armas tácticas y nitro en carreras cinematográficas, compite en modo carrera y disfruta de multijugador online para cazar o escapar a toda velocidad.",
    platforms: "PC, PlayStation 3, Xbox 360, Wii",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso",
    publisher: "Electronic Arts",
    releaseDate: "16 nov 2010",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows XP SP3 (solo 32 bits)" },
      {
        label: "Procesador",
        value: "Core 2 Duo a 2,0 GHz o Athlon X2 a 2,4 GHz",
      },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "6,5 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "256 MB, compatible con DirectX 9.0c (GeForce 7950 / Radeon X1900)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 7" },
      { label: "Procesador", value: "Core 2 Duo a 2,4 GHz o equivalente" },
      { label: "Memoria", value: "4 GB RAM" },
      { label: "Disco duro", value: "6,5 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "512 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
