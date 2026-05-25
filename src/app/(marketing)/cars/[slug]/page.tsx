import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetail } from "@/features/cars/components/CarDetail";
import { getCarBySlug } from "@/features/cars/services/carService";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Coche no encontrado" };
  return { title: car.name, description: car.description };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();
  return <CarDetail car={car} />;
}
