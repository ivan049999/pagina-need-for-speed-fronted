import Link from "next/link";
import { UNBOUND_EA_URL } from "@/content/unbound/unbound-landing";

export function UnboundFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 text-center text-xs text-white/45 md:flex-row md:px-8 md:text-left">
        <p>© Electronic Arts Inc. Need for Speed es una marca de EA.</p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          <a
            href={UNBOUND_EA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Página oficial EA
          </a>
          <Link href="/news" className="hover:text-white">
            Noticias del sitio
          </Link>
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
        </div>
      </div>
    </footer>
  );
}
