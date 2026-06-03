import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const PROSTREET_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Pro-Street";

export const NEED_FOR_SPEED_PROSTREET: GamePageContent = {
  slug: "need-for-speed-prostreet",
  title: "Need for Speed™ ProStreet",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "—",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+prostreet",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+prostreet",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+prostreet",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 7,
    ageBadgeSrc: `${PROSTREET_ASSETS}/Pegi-7-Icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${PROSTREET_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Pro-Street/need-for-speed-proStreet-video1.webm",
  coverImage: {
    id: "cover",
    src: `${PROSTREET_ASSETS}/portada-need-for-speed-proStreet.webp`,
    alt: "Carátula de Need for Speed ProStreet",
  },
  media: [
    {
      id: "hero-1",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen1.jpg`,
      alt: "Portada de Need for Speed ProStreet",
    },
    {
      id: "hero-2",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen2.jpg`,
      alt: "Need for Speed ProStreet — captura 1",
    },
    {
      id: "hero-3",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen3.jpg`,
      alt: "Need for Speed ProStreet — captura 2",
    },
    {
      id: "hero-4",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen4.jpg`,
      alt: "Need for Speed ProStreet — captura 3",
    },
    {
      id: "hero-5",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen6.png`,
      alt: "Need for Speed ProStreet — captura 4",
    },
    {
      id: "hero-6",
      src: `${PROSTREET_ASSETS}/need-for-speed-proStreet-imagen5.webp`,
      alt: "Need for Speed ProStreet — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ ProStreet abandona las carreras callejeras para centrarse en competiciones legales de alto nivel. Compite en cuatro disciplinas — drag, grip, speed y drift — en pistas reales y desafíos de daño total, construye tu reputación como piloto profesional y demuestra que dominas cada estilo de conducción.",
    platforms:
      "PC, PlayStation 2, PlayStation 3, Xbox 360, Wii, PSP, Nintendo DS",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "14 nov 2007",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows XP SP2" },
      {
        label: "Procesador",
        value: "Pentium 4 a 2,8 GHz o Athlon 64 3000+",
      },
      { label: "Memoria", value: "1 GB RAM" },
      { label: "Disco duro", value: "8 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "128 MB con Pixel Shader 3.0, compatible con DirectX 9.0c (GeForce 6800 / Radeon X1300)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows XP / Vista" },
      { label: "Procesador", value: "Pentium 4 a 3,0 GHz o equivalente" },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "8 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value: "256 MB o superior, compatible con DirectX 9.0c",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 9.0c" },
    ],
  },
};
