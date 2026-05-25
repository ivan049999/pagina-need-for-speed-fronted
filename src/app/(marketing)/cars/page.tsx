import type { Metadata } from "next";
import { CarCatalog } from "@/features/cars/components/CarCatalog";

export const metadata: Metadata = {
  title: "Coches",
  description: "Catálogo completo de vehículos Need for Speed.",
};

export default function CarsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl text-glow-neon text-nfs-neon mb-8">
        Catálogo de coches
      </h1>
      <CarCatalog />
    </section>
  );
}
