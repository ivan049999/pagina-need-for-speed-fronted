import type { GamePageContent } from "@/content/games/game-page-content";

const NO_LIMITS_ASSETS =
  "/images/juegos-need-for-speed/Need-For-Speed-No-Limits";

export const NEED_FOR_SPEED_NO_LIMITS: GamePageContent = {
  slug: "need-for-speed-no-limits",
  title: "Need for Speed™ No Limits",
  tags: ["Juego básico", "Carreras"],
  priceLabel: "Gratis",
  price: "—",
  priceNote: "Compras dentro de la aplicación opcionales.",
  ctaLabel: "Seleccionar Plataforma",
  storePlatforms: [
    {
      id: "ea",
      label: "Descargar en App Store",
      href: "https://apps.apple.com/us/app/need-for-speed-no-limits-game/id883393043",
      iconSrc: `${NO_LIMITS_ASSETS}/logo_app_store.png`,
    },
    {
      id: "xbox",
      label: "Descargar en Google Play",
      href: "https://play.google.com/store/apps/details?id=com.ea.game.nfs14_row&utm_source=emea_Med",
      iconSrc: `${NO_LIMITS_ASSETS}/logo_google_play.png`,
    },
  ],
  legalNote:
    "Need for Speed es una marca registrada de Electronic Arts Inc. Las marcas de terceros son propiedad de sus respectivos titulares.",
  rating: {
    system: "pegi",
    age: 12,
    ageBadgeSrc: `${NO_LIMITS_ASSETS}/pegi12-icono.png`,
    descriptors: [
      {
        id: "violence",
        label: "Violence",
        iconSrc: `${NO_LIMITS_ASSETS}/violence-Icono.png`,
      },
    ],
  },
  heroVideoSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-No-Limits/need-for-speed-no-limits-video-1.webm",
  coverImage: {
    id: "cover",
    src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-portada-oficial.jpg`,
    alt: "Carátula de Need for Speed No Limits",
  },
  media: [
    {
      id: "hero-1",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-1.jpg`,
      alt: "Portada de Need for Speed No Limits",
    },
    {
      id: "hero-2",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-2.avif`,
      alt: "Need for Speed No Limits — captura 1",
    },
    {
      id: "hero-3",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-3.jpg`,
      alt: "Need for Speed No Limits — captura 2",
    },
    {
      id: "hero-4",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-4.jpg`,
      alt: "Need for Speed No Limits — captura 3",
    },
    {
      id: "hero-5",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-5.webp`,
      alt: "Need for Speed No Limits — captura 4",
    },
    {
      id: "hero-6",
      src: `${NO_LIMITS_ASSETS}/need-for-speed-no-limits-imagen-6.jpg`,
      alt: "Need for Speed No Limits — captura 5",
    },
  ],
  about: {
    title: "Acerca del juego",
    description:
      "Need for Speed™ No Limits, desarrollado por Firemonkeys Studios, lleva la saga a iOS y Android con carreras callejeras en Blackridge: personaliza coches legendarios, compite en eventos, desafía a rivales y progresa en una experiencia free-to-play con gráficos móviles de alto nivel y la esencia arcade de Need for Speed.",
    platforms: "iOS, Android",
    languages:
      "Alemán, Inglés, Español, Francés, Italiano, Portugués, Ruso, Japonés, Coreano, Chino simplificado y otros",
    publisher: "Electronic Arts",
    releaseDate: "30 abr 2015",
  },
  systemRequirements: {
    title: "Requisitos del sistema",
    osLabel: "iOS",
    minimum: [
      { label: "Sistema operativo", value: "iOS 10.0 o posterior" },
      { label: "Dispositivo", value: "iPhone, iPad o iPod touch compatibles" },
      { label: "Conexión", value: "Conexión a Internet obligatoria" },
      { label: "Almacenamiento", value: "Espacio libre según versión en App Store" },
      {
        label: "Notas",
        value: "Compras dentro de la aplicación opcionales",
      },
    ],
    recommended: [
      { label: "Sistema operativo", value: "Android 4.4 o posterior" },
      { label: "Dispositivo", value: "Smartphone o tablet ARM compatible" },
      { label: "Conexión", value: "Conexión a Internet obligatoria" },
      { label: "Almacenamiento", value: "Espacio libre según versión en Google Play" },
      {
        label: "Notas",
        value: "Compras dentro de la aplicación opcionales",
      },
    ],
  },
};
