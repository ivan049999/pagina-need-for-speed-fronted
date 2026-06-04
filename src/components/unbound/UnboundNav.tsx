"use client";

import Link from "next/link";
import { useState } from "react";
import { UNBOUND_EA_URL, UNBOUND_NAV } from "@/content/unbound/unbound-landing";
import { cn } from "@/lib/utils/cn";

export function UnboundNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
        <Link href="/need-for-speed-unbound" className="shrink-0">
          <span className="font-display text-xl font-black tracking-tight text-nfs-unbound md:text-2xl">
            NFS
            <span className="ml-1 text-white">UNBOUND</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {UNBOUND_NAV.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 transition-colors hover:text-nfs-unbound"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/80 transition-colors hover:text-nfs-unbound"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={UNBOUND_EA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-nfs-unbound px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Comprar ya ›
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#0a0a0a] px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {UNBOUND_NAV.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="block text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href={UNBOUND_EA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex rounded-sm bg-nfs-unbound px-4 py-2 text-sm font-semibold text-black",
                )}
              >
                Comprar ya ›
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
