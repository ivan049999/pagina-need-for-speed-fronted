import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nfs-asphalt/90 backdrop-blur">
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-2xl md:text-3xl text-nfs-neon"
        >
          <Image
            src="/images/logos/wp8300562.jpg"
            alt="Need for Speed"
            width={44}
            height={44}
            className="h-10 w-10 md:h-11 md:w-11 rounded-sm object-cover"
            priority
          />
          <span>NFS</span>
        </Link>
        <nav className="hidden gap-8 md:flex md:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base md:text-lg text-nfs-chrome hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
