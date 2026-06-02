import type { GamePageContent } from "@/content/games/game-page-content";

const CARBON_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-Carbon";
const NITRO_ASSETS = "/images/juegos-need-for-speed/Need-For-Speed-Nitro";

export const NEED_FOR_SPEED_NITRO: GamePageContent = {
  slug: "need-for-speed-nitro",
  title: "Need for Speed™ Nitro",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Desde",
  price: "9,99 €",
  priceNote: "Pueden aplicarse impuestos aplicables en la compra.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Comprar en CeX España",
      href: "https://es.webuy.com/search?stext=need+for+speed+nitro",
      iconSrc: `${CARBON_ASSETS}/CeX_Logo.webp`,
    },
    {
      id: "xbox",
      label: "Comprar en Amazon España",
      href: "https://www.amazon.es/s?k=need+for+speed+nitro",
      iconSrc: `${CARBON_ASSETS}/logoAmazon.png`,
    },
    {
      id: "steam",
      label: "Comprar en Ebay",
      href: "https://www.ebay.com/sch/i.html?_nkw=need+for+speed+nitro",
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
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Nitro/need-for-speed-nitro-video-1.mp4",
  coverImage: {
    id: "cover",
    src: `${NITRO_ASSETS}/need-for-speed-nitro-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed Nitro",
  },
  media: [
    {
      id: "hero-1",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-1.jpg`,
      alt: "Portada de Need for Speed Nitro",
    },
    {
      id: "hero-2",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-2.avif`,
      alt: "Need for Speed Nitro — captura 1",
    },
    {
      id: "hero-3",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-3.jpg`,
      alt: "Need for Speed Nitro — captura 2",
    },
    {
      id: "hero-4",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-4.jpg`,
      alt: "Need for Speed Nitro — captura 3",
    },
    {
      id: "hero-5",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-5.webp`,
      alt: "Need for Speed Nitro — captura 4",
    },
    {
      id: "hero-6",
      src: `${NITRO_ASSETS}/need-for-speed-nitro-imagen-6.jpg`,
      alt: "Need for Speed Nitro — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ Nitro lleva la saga a un ritmo arcade en Wii y Nintendo DS: carreras rápidas por ciudades del mundo, nitro a tope, personalización llamativa de coches y un estilo visual colorido pensado para jugar en familia o con amigos en multijugador local.",
    platforms: "Wii, Nintendo DS",
    languages:
      "Alemán, Inglés, Español, Francés, Italiano, Holandés, Sueco, Danés, Noruego, Finlandés, Polaco, Portugués, Ruso",
    publisher: "Electronic Arts",
    releaseDate: "3 nov 2009",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "Nintendo Wii / DS",
    minimum: [
      { label: "Plataforma", value: "Nintendo Wii o Nintendo DS" },
      { label: "Almacenamiento", value: "Espacio libre en tarjeta SD (DS) o en consola (Wii)" },
      { label: "Controles", value: "Mando de Wii o Nintendo DS" },
      { label: "Pantalla", value: "Televisor compatible con Wii o pantalla de Nintendo DS" },
      { label: "Multijugador", value: "Hasta 4 jugadores en Wii (local)" },
    ],
    recommended: [
      { label: "Plataforma", value: "Nintendo Wii" },
      { label: "Accesorios", value: "Nunchuk o Wii Remote Plus recomendado" },
      { label: "Pantalla", value: "Televisor con salida de vídeo componente o superior" },
      { label: "Audio", value: "Sistema de sonido estéreo o home cinema" },
      { label: "Multijugador", value: "Varios mandos Wii para carreras locales" },
    ],
  },
};
