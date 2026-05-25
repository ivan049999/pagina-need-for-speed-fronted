import { Card } from "@/components/ui/Card";

const PLACEHOLDER_SLOTS = 6;

export function GarageGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
        <Card key={i} className="flex aspect-video items-center justify-center text-nfs-chrome">
          Slot vacío #{i + 1}
        </Card>
      ))}
    </div>
  );
}
