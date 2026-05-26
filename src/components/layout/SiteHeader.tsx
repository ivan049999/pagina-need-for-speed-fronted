import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nfs-asphalt/90 backdrop-blur">
      <div className="container mx-auto flex h-24 md:h-28 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-3xl md:text-4xl lg:text-5xl"
        >
          <Image
            src="/images/logos/wp8300562.jpg"
            alt="Need for Speed"
            width={56}
            height={56}
            className="h-12 w-12 md:h-14 md:w-14 rounded-sm object-cover"
            priority
          />
          <span className="text-neon-underground text-neon-underground--compact">
            NFS
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex md:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg md:text-xl lg:text-2xl text-nfs-chrome hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
