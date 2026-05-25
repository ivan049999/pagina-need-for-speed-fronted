import type { Metadata } from "next";
import { GarageGrid } from "@/features/garage/components/GarageGrid";

export const metadata: Metadata = {
  title: "Garaje",
  description: "Personaliza y guarda tus coches favoritos.",
};

export default function GaragePage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl mb-8">Mi garaje</h1>
      <GarageGrid />
    </section>
  );
}
