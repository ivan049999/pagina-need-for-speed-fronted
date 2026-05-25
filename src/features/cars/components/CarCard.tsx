import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Car } from "@/types/car";

type CarCardProps = { car: Car };

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.slug}`}>
      <Card className="group overflow-hidden transition hover:border-nfs-neon/50">
        <div className="relative aspect-video mb-3 overflow-hidden rounded">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
        <h3 className="font-display text-lg">{car.name}</h3>
        <Badge className="mt-2">{car.tier}</Badge>
      </Card>
    </Link>
  );
}
