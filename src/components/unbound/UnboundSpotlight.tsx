import Image from "next/image";
import { UNBOUND_SPOTLIGHT } from "@/content/unbound/unbound-landing";

export function UnboundSpotlight() {
  const { card, description, heading, id } = UNBOUND_SPOTLIGHT;

  return (
    <section id={id} className="border-b border-white/10 bg-[#0d0d0d] py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>

        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 grid overflow-hidden border border-nfs-unbound/40 transition-colors hover:border-nfs-unbound md:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative min-h-[220px] md:min-h-[320px]">
            <Image
              src={card.imageSrc}
              alt={card.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#1a1a1a] p-8 md:p-12">
            <span className="text-xs uppercase tracking-wider text-white/50">
              {card.tag}
            </span>
            <span className="mt-2 text-sm text-white/60">{card.date}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
              {card.title}
            </h3>
          </div>
        </a>
      </div>
    </section>
  );
}
