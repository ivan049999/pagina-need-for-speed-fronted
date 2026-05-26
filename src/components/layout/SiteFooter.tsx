import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/config/site";
import { NAV_LINKS } from "@/config/navigation";

const EXPLORE_LINKS = [{ href: "/", label: "Inicio" }, ...NAV_LINKS];

const OFFICIAL_LINKS = [
  {
    href: "https://www.ea.com/games/need-for-speed",
    label: "EA — Need for Speed",
    external: true,
  },
  {
    href: "https://www.ea.com/es-es/legal",
    label: "Aviso legal EA",
    external: true,
  },
];

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-nfs-chrome transition-all hover:border-nfs-neon/50 hover:bg-nfs-neon/10 hover:text-nfs-neon"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#06060a]">
      {/* Acento superior tipo pista */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nfs-neon to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(var(--nfs-neon-rgb),0.04)_0%,transparent_35%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)",
        }}
        aria-hidden
      />

      <div className="container relative mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-display text-2xl text-nfs-neon transition-opacity hover:opacity-90"
            >
              <Image
                src="/images/logos/wp8300562.jpg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-sm object-cover ring-1 ring-nfs-neon/30"
              />
              <span className="text-glow-neon">NFS</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-nfs-chrome/90">
              Tu punto de encuentro con el universo{" "}
              <span className="text-white">Need for Speed</span>. Noticias,
              juegos de la saga y todo lo que mueve la cultura del street racing.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href="https://www.youtube.com/@EASports" label="YouTube EA">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://x.com/EASPORTS" label="X (Twitter) EA">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/easports/" label="Instagram EA">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.2c2.7 0 3 .01 4.04.06 1.02.05 1.56.22 1.93.37.48.19.82.41 1.18.77.36.36.58.7.77 1.18.15.37.32.91.37 1.93.05 1.04.06 1.34.06 4.04s-.01 3-.06 4.04c-.05 1.02-.22 1.56-.37 1.93-.19.48-.41.82-.77 1.18-.36.36-.7.58-1.18.77-.37.15-.91.32-1.93.37-1.04.05-1.34.06-4.04.06s-3-.01-4.04-.06c-1.02-.05-1.56-.22-1.93-.37a3.2 3.2 0 0 1-1.18-.77 3.2 3.2 0 0 1-.77-1.18c-.15-.37-.32-.91-.37-1.93C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.04c.05-1.02.22-1.56.37-1.93.19-.48.41-.82.77-1.18.36-.36.7-.58 1.18-.77.37-.15.91-.32 1.93-.37C9 2.21 9.3 2.2 12 2.2zm0 1.8c-2.65 0-2.96.01-4 .06-.96.04-1.48.2-1.83.33-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.13.35-.29.87-.33 1.83-.04 1.04-.06 1.35-.06 4s.02 2.96.06 4c.04.96.2 1.48.33 1.83.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.13.87.29 1.83.33 1.04.04 1.35.06 4 .06s2.96-.02 4-.06c.96-.04 1.48-.2 1.83-.33.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.13-.35.29-.87.33-1.83.04-1.04.06-1.35.06-4s-.02-2.96-.06-4c-.04-.96-.2-1.48-.33-1.83a3.1 3.1 0 0 0-.75-1.14 3.1 3.1 0 0 0-1.14-.75c-.35-.13-.87-.29-1.83-.33-1.04-.04-1.35-.06-4-.06zm0 3.2a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6zm0 1.8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.4-5.2a1.36 1.36 0 1 1 0 2.72 1.36 1.36 0 0 1 0-2.72z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Explorar */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-nfs-neon">
              Explorar
            </h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-nfs-chrome transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Franquicia */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-nfs-neon">
              Franquicia
            </h3>
            <ul className="mt-4 space-y-2.5">
              {OFFICIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-nfs-chrome transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="text-nfs-neon/60" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-nfs-neon">
              Únete a la carrera
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-nfs-chrome/90">
              Descubre los títulos de la saga y mantente al día con las últimas
              noticias del mundo NFS.
            </p>
            <Link
              href="/cars"
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-nfs-neon px-5 py-2.5 text-sm font-semibold text-nfs-asphalt shadow-nfs-glow-lg transition-all hover:bg-white"
            >
              Ver juegos
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-nfs-chrome/80">
              © {year} {APP_NAME}. Todos los derechos de las marcas pertenecen a sus
              respectivos titulares.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-nfs-chrome/60 md:text-right">
              Sitio fan no oficial. No afiliado a Electronic Arts Inc. ni a sus
              licenciantes. Need for Speed es una marca registrada de EA.
            </p>
          </div>
          <div
            className="mt-6 flex h-1 w-full overflow-hidden rounded-full bg-white/5"
            aria-hidden
          >
            <div className="h-full w-1/3 bg-nfs-neon" />
            <div className="h-full w-1/3 bg-nfs-heat" />
            <div className="h-full flex-1 bg-white/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
