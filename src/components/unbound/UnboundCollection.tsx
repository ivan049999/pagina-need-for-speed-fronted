import Image from "next/image";
import { UNBOUND_COLLECTION } from "@/content/unbound/unbound-landing";

export function UnboundCollection() {
  const data = UNBOUND_COLLECTION;

  return (
    <section
      id={data.id}
      className="border-b border-white/10 bg-[#111] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="max-w-4xl font-display text-2xl font-black leading-tight text-white md:text-4xl">
          {data.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
          {data.description}
        </p>
        <a
          href={data.buyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-sm border border-white px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          Comprar ahora
        </a>

        <div className="mt-12 grid overflow-hidden border border-white/10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[240px] lg:min-h-[360px]">
            <Image
              src={data.heroImage}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="55vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#1a1a1a] p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              {data.heroCard.title}
            </h3>
            <p className="mt-3 text-sm text-white/70">
              {data.heroCard.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {data.items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden border border-white/10 bg-[#1a1a1a]"
            >
              <div className="relative h-44">
                <Image
                  src={item.imageSrc}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-white/50">
                  Incluido con Colección definitiva
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/65">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
