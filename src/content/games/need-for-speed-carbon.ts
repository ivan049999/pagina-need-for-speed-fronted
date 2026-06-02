import type { GamePageContent } from "@/content/games/game-page-content";

const ASSET_BASE = "/images/juegos-need-for-speed/Need-For-Speed-Carbon";

export const NEED_FOR_SPEED_CARBON: GamePageContent = {
  slug: "need-for-speed-carbon",
  title: "Need for Speed™ Carbon",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/product-detail/?id=5030930052348",
      iconSrc: `${ASSET_BASE}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+carbon&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=9M7GG87XQAFC&sprefix=need+for+speed+carbon%2Caps%2C103&ref=nb_sb_noss_1",
      iconSrc: `${ASSET_BASE}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+carbon&_sacat=0&_from=R40&_trksid=p4439441.m570.l1313",
      iconSrc: `${ASSET_BASE}/logoEbay.png`,
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
        iconSrc: `${ASSET_BASE}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Carbon/nfsc-video1.webm",
  coverImage: {
    id: "cover",
    src: `${ASSET_BASE}/portada-carbon.jpg`,
    alt: "Carátula de Need for Speed Carbon",
  },
  media: [
    {
      id: "hero-1",
      src: `${ASSET_BASE}/nfsc-imagen0.jpg`,
      alt: "Portada de Need for Speed Carbon",
    },
    {
      id: "hero-2",
      src: `${ASSET_BASE}/nfsc-imagen1.jpg`,
      alt: "Need for Speed Carbon — captura 1",
    },
    {
      id: "hero-3",
      src: `${ASSET_BASE}/nfsc-imagen2.jpg`,
      alt: "Need for Speed Carbon — captura 2",
    },
    {
      id: "hero-4",
      src: `${ASSET_BASE}/nfsc-imagen3.jpg`,
      alt: "Need for Speed Carbon — captura 3",
    },
    {
      id: "hero-5",
      src: `${ASSET_BASE}/nfsc-imagen4.webp`,
      alt: "Need for Speed Carbon — captura 4",
    },
    {
      id: "hero-6",
      src: `${ASSET_BASE}/nfsc-imagen5.jpg`,
      alt: "Need for Speed Carbon — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Carbon te lleva a Palmont, una ciudad dividida en territorios controlados por crews rivales. Forma tu propia banda, personaliza coches con Autosculpt y conquista zonas en carreras callejeras, canyon duels y persecuciones bajo la amenaza del misterioso Darius.",
    platforms:
      "PC, PlayStation 2, Xbox, Xbox 360, GameCube, Wii, Nintendo DS, Mac",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "31 oct 2006",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 2000 / XP" },
      { label: "Procesador", value: "Pentium 4 a 2,0 GHz o Athlon XP 2200+" },
      { label: "Memoria", value: "512 MB RAM" },
      { label: "Disco duro", value: "5,1 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "128 MB, compatible con DirectX 9.0c (GeForce 6600 / Radeon X1300)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP" },
      { label: "Procesador", value: "Pentium 4 a 2,8 GHz o equivalente" },
      { label: "Memoria", value: "1 GB RAM" },
      { label: "Disco duro", value: "5,1 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "256 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
