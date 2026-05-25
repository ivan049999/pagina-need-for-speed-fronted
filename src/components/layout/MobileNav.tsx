"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="p-2 text-nfs-chrome"
      >
        Menú
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-16 border-b border-white/10 bg-nfs-asphalt p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
