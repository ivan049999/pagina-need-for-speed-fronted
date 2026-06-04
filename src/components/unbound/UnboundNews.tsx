import Image from "next/image";
import Link from "next/link";
import { UNBOUND_EA_URL, UNBOUND_NEWS } from "@/content/unbound/unbound-landing";

export function UnboundNews() {
  const { featured, heading, id, latest } = UNBOUND_NEWS;

  return (
    <section id={id} className="bg-[#111] py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-black text-white md:text-4xl">
            {heading}
          </h2>
          <a
            href={UNBOUND_EA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-nfs-unbound hover:underline"
          >
            Ver todo
          </a>
        </div>

        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 grid overflow-hidden border border-white/10 transition-colors hover:border-nfs-unbound/50 lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative min-h-[220px] md:min-h-[340px]">
            <Image
              src={featured.imageSrc}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="60vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#1a1a1a] p-8 md:p-12">
            <span className="text-xs text-white/50">{featured.tag}</span>
            <span className="mt-2 text-sm text-white/60">{featured.date}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 text-sm text-white/70">{featured.excerpt}</p>
          </div>
        </a>

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Últimas noticias
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden border border-white/10 bg-[#1a1a1a] transition-colors hover:border-nfs-unbound/40"
              >
                <div className="relative h-36">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-white/50">{item.date}</p>
                  <p className="mt-2 font-medium text-white group-hover:text-nfs-unbound">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-white/40">
          <Link href="/" className="hover:text-nfs-unbound">
            ← Volver al sitio Need for Speed
          </Link>
        </p>
      </div>
    </section>
  );
}
