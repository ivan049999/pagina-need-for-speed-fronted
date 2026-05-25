import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Car } from "@/types/car";

type CarDetailProps = { car: Car };

export function CarDetail({ car }: CarDetailProps) {
  return (
    <article className="container mx-auto px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image src={car.imageUrl} alt={car.name} fill className="object-cover" />
        </div>
        <div>
          <Badge variant="heat">{car.tier}</Badge>
          <h1 className="font-display text-4xl mt-4 mb-4">{car.name}</h1>
          <p className="text-nfs-chrome">{car.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-nfs-chrome">Velocidad máx.</dt>
              <dd className="text-xl font-display">{car.stats.topSpeed} km/h</dd>
            </div>
            <div>
              <dt className="text-nfs-chrome">Aceleración</dt>
              <dd className="text-xl font-display">{car.stats.acceleration}/10</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
