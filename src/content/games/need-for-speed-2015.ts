import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const NFS2015_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-2015";

export const NEED_FOR_SPEED_2015: GamePageContent = {
  slug: "need-for-speed-2015",
  title: "Need for Speed™",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+2015",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+2015",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+2015",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${NFS2015_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${NFS2015_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-2015/need-for-speed-2015-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${NFS2015_ASSETS}/need-for-speed-2015-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed (2015)",
  },
  media: [
    {
      id: "hero-1",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-1.jpg`,
      alt: "Portada de Need for Speed (2015)",
    },
    {
      id: "hero-2",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-2.avif`,
      alt: "Need for Speed (2015) — captura 1",
    },
    {
      id: "hero-3",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-3.jpg`,
      alt: "Need for Speed (2015) — captura 2",
    },
    {
      id: "hero-4",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-4.jpg`,
      alt: "Need for Speed (2015) — captura 3",
    },
    {
      id: "hero-5",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-5.webp`,
      alt: "Need for Speed (2015) — captura 4",
    },
    {
      id: "hero-6",
      src: `${NFS2015_ASSETS}/need-for-speed-2015-imagen-6.jpg`,
      alt: "Need for Speed (2015) — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ (2015), desarrollado por Ghost Games, reinventa la saga con carreras nocturnas en Ventura Bay: personaliza coches al detalle, compite en eventos callejeros, huye de la policía y conecta con amigos en un mundo abierto pensado para el estilo urbano y las persecuciones cinematográficas.",
    platforms: "PC, PlayStation 4, Xbox One",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "3 mar 2015",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 7 (64 bits)" },
      {
        label: "Procesador",
        value: "Core i5-4690 o AMD FX-8320",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "2 GB, compatible con DirectX 11 (GeForce GTX 760 / Radeon R7 265)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 11" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 10 (64 bits)" },
      {
        label: "Procesador",
        value: "Core i5-4690 o AMD FX-8350 de ocho núcleos",
      },
      { label: "Memoria", value: "8 GB RAM" },
      { label: "Disco duro", value: "30 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "4 GB o superior, compatible con DirectX 11 (GeForce GTX 970 / Radeon R9 290)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 11" },
    ],
  },
};
