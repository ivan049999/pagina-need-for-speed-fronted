import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <HeroVideoBackground />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-5xl md:text-7xl text-glow-neon text-nfs-neon mb-4">
          Need for Speed
        </h1>
        <p className="text-nfs-chrome max-w-xl mx-auto mb-8">
          Vive la adrenalina. Explora coches, compite en clasificaciones y construye tu garaje.
        </p>
        <Link href="/cars">
          <Button size="lg">Ver catálogo</Button>
        </Link>
      </div>
    </section>
  );
}
