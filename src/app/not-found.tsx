import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <h1 className="font-display text-6xl text-nfs-neon">404</h1>
      <p className="text-nfs-chrome">Esta ruta no existe en el mapa.</p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </section>
  );
}
