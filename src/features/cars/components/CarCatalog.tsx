import { CarCard } from "@/features/cars/components/CarCard";
import { getCars } from "@/features/cars/services/carService";

export async function CarCatalog() {
  const cars = await getCars();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
