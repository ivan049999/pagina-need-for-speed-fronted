import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";
import { NavGamesDropdown } from "@/components/layout/NavGamesDropdown";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-nfs-asphalt/90 backdrop-blur">
      <div className="container mx-auto flex h-28 md:h-32 lg:h-36 items-center px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10 lg:gap-12">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logos/wp8300562.jpg"
              alt="Need for Speed"
              width={160}
              height={80}
              className="h-16 w-auto md:h-20 lg:h-24 rounded-sm object-contain"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-6 md:flex md:gap-8 lg:gap-10">
            <NavGamesDropdown />
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
      </div>
    </header>
  );
}
