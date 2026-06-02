import type { GamePageContent } from "@/content/games/game-page-content";

const ASSET_BASE =
  "/images/juegos-need-for-speed/Need-For-Speed-Most-Wanted-2005";

export const NEED_FOR_SPEED_MOST_WANTED_2005: GamePageContent = {
  slug: "need-for-speed-most-wanted-2005",
  title: "Need for Speed™ Most Wanted (2005)",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/product-detail/?id=5030934046091",
      iconSrc: `${ASSET_BASE}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/Need-Speed-Most-Wanted-Espa%C3%B1a/dp/B005DWH9KO/",
      iconSrc: `${ASSET_BASE}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+most+wanted+&_sacat=0&_from=R40&_trksid=p2334524.m570.l1313&_odkw=need+for+speed+most+wanted+ps2&_osacat=0",
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
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Most-Wanted-2005/nfsmw-video1.mp4",
  coverImage: {
    id: "cover",
    src: `${ASSET_BASE}/portada-most-wanted-2005.jpg`,
    alt: "Carátula de Need for Speed Most Wanted (2005)",
  },
  media: [
    {
      id: "hero-1",
      src: `${ASSET_BASE}/nfsmw-imagen0.jpg`,
      alt: "Portada de Need for Speed Most Wanted (2005)",
    },
    {
      id: "hero-2",
      src: `${ASSET_BASE}/nfsmw-imagen1.jpg`,
      alt: "Need for Speed Most Wanted (2005) — captura 1",
    },
    {
      id: "hero-3",
      src: `${ASSET_BASE}/nfsmw-imagen2.jpg`,
      alt: "Need for Speed Most Wanted (2005) — captura 2",
    },
    {
      id: "hero-4",
      src: `${ASSET_BASE}/nfsmw-imagen3.jpg`,
      alt: "Need for Speed Most Wanted (2005) — captura 3",
    },
    {
      id: "hero-5",
      src: `${ASSET_BASE}/nfsmw-imagen4.webp`,
      alt: "Need for Speed Most Wanted (2005) — captura 4",
    },
    {
      id: "hero-6",
      src: `${ASSET_BASE}/nfsmw-imagen5.jpg`,
      alt: "Need for Speed Most Wanted (2005) — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Most Wanted te sumerge en Rockport, donde la policía persigue sin descanso a los corredores más buscados. Escala la Blacklist, personaliza tu coche y demuestra que eres el piloto más temido de la ciudad en carreras callejeras, persecuciones y eventos de alto riesgo.",
    platforms:
      "PC, PlayStation 2, Xbox, Xbox 360, GameCube, Game Boy Advance, Nintendo DS",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "15 nov 2005",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows 2000 / XP" },
      { label: "Procesador", value: "Pentium 4 a 1,4 GHz o Athlon XP 1700+" },
      { label: "Memoria", value: "256 MB RAM" },
      { label: "Disco duro", value: "3 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "32 MB, compatible con DirectX 9.0c (GeForce 2 / Radeon 7500)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP" },
      { label: "Procesador", value: "Pentium 4 a 2,0 GHz o equivalente" },
      { label: "Memoria", value: "512 MB RAM" },
      { label: "Disco duro", value: "3 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "128 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
