import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nfs-asphalt/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl text-nfs-neon">
          <Image
            src="/images/logos/wp8300562.jpg"
            alt="Need for Speed"
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-sm object-cover"
            priority
          />
          <span>NFS</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-nfs-chrome hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
