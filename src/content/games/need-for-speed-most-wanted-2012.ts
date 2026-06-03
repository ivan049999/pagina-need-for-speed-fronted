import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const MW2012_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Most-Wanted-2012";

export const NEED_FOR_SPEED_MOST_WANTED_2012: GamePageContent = {
  slug: "need-for-speed-most-wanted-2012",
  title: "Need for Speed™ Most Wanted (2012)",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+most+wanted+2012",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+most+wanted+2012",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+most+wanted+2012",
      iconSrc: `${CARBON_ASSETS}/logoEbay.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${MW2012_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${MW2012_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Most-Wanted-2012/need-for-speed-most-wanted-2012-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Most Wanted (2012)",
  },
  media: [
    {
      id: "hero-1",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-1.jpg`,
      alt: "Portada de Need for Speed Most Wanted (2012)",
    },
    {
      id: "hero-2",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-2.avif`,
      alt: "Need for Speed Most Wanted (2012) — captura 1",
    },
    {
      id: "hero-3",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-3.jpg`,
      alt: "Need for Speed Most Wanted (2012) — captura 2",
    },
    {
      id: "hero-4",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-4.jpg`,
      alt: "Need for Speed Most Wanted (2012) — captura 3",
    },
    {
      id: "hero-5",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-5.webp`,
      alt: "Need for Speed Most Wanted (2012) — captura 4",
    },
    {
      id: "hero-6",
      src: `${MW2012_ASSETS}/need-for-speed-most-wanted-2012-imagen-6.jpg`,
      alt: "Need for Speed Most Wanted (2012) — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Most Wanted (2012), desarrollado por Criterion Games, reinventa la persecución en Fairhaven City: elige tu coche, evita a la policía con el sistema Autolog y compite por ser el piloto más buscado. Mundo abierto, carreras callejeras, power-ups y multijugador online para demostrar quién manda en la ciudad.",
    platforms:
      "PC, PlayStation 3, Xbox 360, PlayStation Vita, Wii U",
    languages:
      "Checo, Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso, Japonés",
    publisher: "Electronic Arts",
    releaseDate: "30 oct 2012",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Windows",
    minimum: [
      { label: "Sistema operativo", value: "Windows Vista SP2 (64 bits) / Windows 7" },
      {
        label: "Procesador",
        value: "Core 2 Duo a 2,0 GHz o Athlon X2 a 2,4 GHz",
      },
      { label: "Memoria", value: "2 GB RAM" },
      { label: "Disco duro", value: "10 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "512 MB, compatible con DirectX 10 (GeForce 8800 GT / Radeon HD 3870)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 10" },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Windows 7 (64 bits)" },
      { label: "Procesador", value: "Core 2 Quad a 2,4 GHz o equivalente" },
      { label: "Memoria", value: "4 GB RAM" },
      { label: "Disco duro", value: "10 GB de espacio libre" },
      {
        label: "Tarjeta gráfica",
        value:
          "1 GB o superior, compatible con DirectX 11 (GeForce GTX 560 / Radeon HD 6950)",
      },
      { label: "Tarjeta de sonido", value: "Compatible con DirectX 11" },
    ],
  },
};
