"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEFAULT_LOGO = "/images/logos/wp8300562.jpg";
const PAGE_LOGOS: Record<string, string> = {
  "/need-for-speed-underground":
    "/images/logos/logo-need-for-speed-underground.jpg",
  "/need-for-speed-underground-2":
    "/images/logos/logo-need-for-speed-underground-2.png",
  "/need-for-speed-most-wanted-2005":
    "/images/logos/logo-need-for-speed-most-wanted.jpg",
  "/need-for-speed-carbon":
    "/images/logos/logo-need-for-speed-carbon.jpg",
  "/need-for-speed-prostreet":
    "/images/logos/logo-need-for-speed-pro-street.jpg",
  "/need-for-speed-world": "/images/logos/logo-need-for-speed-world.jpg",
  "/need-for-speed-nitro": "/images/logos/logo-need-for-speed-nitro.png",
  "/need-for-speed-hot-pursuit-2010":
    "/images/logos/logo-need-for-speed-hot-pursuit-2010.png",
  "/need-for-speed-undercover":
    "/images/logos/logo-need-for-speed-undercover.jpg",
};

export function HeaderLogo() {
  const pathname = usePathname();
  const src = PAGE_LOGOS[pathname] ?? DEFAULT_LOGO;

  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={src}
        alt="Need for Speed"
        width={160}
        height={80}
        className="h-16 w-auto rounded-sm object-contain md:h-20 lg:h-24"
        priority
      />
    </Link>
  );
}
