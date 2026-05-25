import type { Car } from "@/types/car";

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    slug: "porsche-911-gt3",
    name: "Porsche 911 GT3",
    description: "Icono de pista con equilibrio perfecto entre grip y potencia.",
    tier: "S+",
    featured: true,
    imageUrl: "/images/cars/porsche-911-gt3.webp",
    stats: { topSpeed: 318, acceleration: 9 },
  },
  {
    id: "2",
    slug: "nissan-skyline-gtr",
    name: "Nissan Skyline GT-R",
    description: "Leyenda JDM preparada para dominio urbano.",
    tier: "S",
    featured: true,
    imageUrl: "/images/cars/nissan-skyline-gtr.webp",
    stats: { topSpeed: 305, acceleration: 8 },
  },
  {
    id: "3",
    slug: "mclaren-p1",
    name: "McLaren P1",
    description: "Hiperdeportivo híbrido con tecnología de F1.",
    tier: "X",
    featured: false,
    imageUrl: "/images/cars/mclaren-p1.webp",
    stats: { topSpeed: 350, acceleration: 10 },
  },
];
