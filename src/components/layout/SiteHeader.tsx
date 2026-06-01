import Link from "next/link";
import { HeaderLogo } from "@/components/layout/HeaderLogo";
import { NAV_LINKS } from "@/config/navigation";
import { NavGamesDropdown } from "@/components/layout/NavGamesDropdown";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-nfs-asphalt/90 backdrop-blur">
      <div className="container mx-auto flex h-28 md:h-32 lg:h-36 items-center px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10 lg:gap-12">
          <HeaderLogo />
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
