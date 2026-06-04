export const UNBOUND_EA_URL =
  "https://www.ea.com/es-es/games/need-for-speed/need-for-speed-unbound";

const IMG =
  "/images/juegos-need-for-speed/Need-For-Speed-Unbound";

export type UnboundNavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const UNBOUND_NAV: UnboundNavItem[] = [
  { label: "Acerca de", href: "#acerca" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Pase de velocidad", href: "#pase-velocidad" },
  { label: "Noticias", href: "#noticias" },
  {
    label: "Foros",
    href: "https://forums.ea.com/category/nfs-unbound",
    external: true,
  },
];

export const UNBOUND_HERO = {
  title: "NEED FOR SPEED™ UNBOUND",
  subtitle:
    "Da rienda suelta a la experiencia definitiva de Need for Speed Unbound.",
  buyHref: UNBOUND_EA_URL,
  trailerSrc:
    "/videos/Juegos-Need-For-Speed/Need-For-Speed-Unbound/need-for-speed-unbound-trailer.mp4",
  collageSrc: `${IMG}/need-for-speed-unbound-imagen-1.jpg`,
  platforms: ["PC", "EA app", "PlayStation", "Xbox", "Steam", "Epic Games"],
};

export const UNBOUND_SPOTLIGHT = {
  id: "pase-velocidad",
  heading: "CENTRO DE ATENCIÓN",
  description:
    "El pase de velocidad prémium del Vol. 9 ya está disponible. Desbloquea recompensas como el Honda Integra TYPE R (1998), kits de carrocería y contenido que celebra los 30 años de la franquicia Need for Speed.",
  card: {
    tag: "Campaña",
    date: "26 de noviembre de 2024",
    title: "PASE DE VELOCIDAD DEL VOL. 9",
    imageSrc: `${IMG}/need-for-speed-unbound-imagen-2.avif`,
    href: UNBOUND_EA_URL,
  },
};

export const UNBOUND_COLLECTION = {
  id: "acerca",
  heading: "COLECCIÓN DEFINITIVA DE NEED FOR SPEED™ UNBOUND",
  description:
    "Da rienda suelta a la experiencia definitiva de Need for Speed Unbound en un solo paquete con la colección definitiva.",
  buyHref: UNBOUND_EA_URL,
  heroImage: `${IMG}/need-for-speed-unbound-imagen-3.jpg`,
  heroCard: {
    title: "Juego base",
    description:
      "Empieza desde abajo y corre hasta lo más alto en Need for Speed Unbound.",
  },
  items: [
    {
      title: "Contenido posterior al lanzamiento",
      description:
        "Acceso instantáneo a todo el contenido prémium postlanzamiento.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-4.jpg`,
    },
    {
      title: "Pase de velocidad prémium del Vol. 9",
      description:
        "Obtén acceso instantáneo al último pase de velocidad prémium.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-5.webp`,
    },
    {
      title: "Contenido adicional",
      description:
        "Consigue acceso a 9 coches totalmente personalizables, más de 45 personalizaciones y cientos de artículos estéticos adicionales.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-6.jpg`,
    },
  ],
};

export const UNBOUND_FEATURES = {
  id: "caracteristicas",
  heading: "CARACTERÍSTICAS",
  slides: [
    {
      title: "Recintos y cochazos",
      description:
        "Desbloquea coches legendarios como el BMW M3 GTR escapando de zonas de confinamiento en distintos modos de juego y demuestra tu estilo en Lakeshore.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-4.jpg`,
    },
    {
      title: "Graffiti y personalización",
      description:
        "Expresa tu identidad con efectos de graffiti, piezas únicas y un garaje profundo para dejar tu marca en cada carrera.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-5.webp`,
    },
    {
      title: "Multijugador y rivales",
      description:
        "Compite contra la comunidad, forma equipos y sube en el ranking en eventos online llenos de acción.",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-3.jpg`,
    },
  ],
};

export const UNBOUND_NEWS = {
  id: "noticias",
  heading: "NOTICIAS",
  featured: {
    tag: "Artículo de noticias",
    date: "3 de febrero de 2025",
    title: "REVISIÓN DEL FINAL DE KAIZEN",
    excerpt:
      "Repasamos un año de actualizaciones de NFS Unbound y anunciamos que no habrá más actualizaciones.",
    imageSrc: `${IMG}/need-for-speed-unbound-imagen-1.jpg`,
    href: UNBOUND_EA_URL,
  },
  latest: [
    {
      title: "Pase de velocidad del Vol. 9",
      date: "26 nov 2024",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-2.avif`,
      href: UNBOUND_EA_URL,
    },
    {
      title: "Colección definitiva",
      date: "15 oct 2024",
      imageSrc: `${IMG}/need-for-speed-unbound-imagen-3.jpg`,
      href: UNBOUND_EA_URL,
    },
    {
      title: "30 años de Need for Speed",
      date: "1 sep 2024",
      imageSrc: `${IMG}/need-for-speed-unbound-portada-oficial.jpg`,
      href: UNBOUND_EA_URL,
    },
  ],
};
