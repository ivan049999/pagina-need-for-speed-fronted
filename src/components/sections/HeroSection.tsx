import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <HeroVideoBackground />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-neon-underground text-neon-underground--hero mb-6">
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
