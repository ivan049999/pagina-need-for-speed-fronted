import { CarCard } from "@/features/cars/components/CarCard";
import { getFeaturedCars } from "@/features/cars/services/carService";

export async function FeaturedCars() {
  const cars = await getFeaturedCars();
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="font-display text-3xl mb-8">Coches destacados</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
