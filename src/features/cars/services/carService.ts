import { MOCK_CARS } from "@/features/cars/data/mockCars";
import type { Car } from "@/types/car";

export async function getCars(): Promise<Car[]> {
  return MOCK_CARS;
}

export async function getFeaturedCars(): Promise<Car[]> {
  return MOCK_CARS.filter((c) => c.featured);
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  return MOCK_CARS.find((c) => c.slug === slug);
}
