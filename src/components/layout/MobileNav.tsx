"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/config/navigation";
import { NFS_GAMES } from "@/config/nfs-games";
import { isInternalNfsGameHref } from "@/lib/nfs-game-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

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
          <button
            type="button"
            aria-expanded={gamesOpen}
            onClick={() => setGamesOpen(!gamesOpen)}
            className="flex w-full items-center justify-between py-2 text-left"
          >
            Juegos de Need for Speed
            <span aria-hidden>{gamesOpen ? "▲" : "▼"}</span>
          </button>
          {gamesOpen && (
            <div className="mb-2 max-h-[50vh] overflow-y-auto border border-[#3d8bfd]/70 bg-[#0f1a2e] py-1">
              {NFS_GAMES.map((game) => {
                const internal = isInternalNfsGameHref(game.href);
                return (
                  <Link
                    key={game.label}
                    href={game.href}
                    {...(internal
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="block px-4 py-2 text-sm text-white hover:bg-white/5"
                    onClick={() => {
                      setOpen(false);
                      setGamesOpen(false);
                    }}
                  >
                    {game.label}
                  </Link>
                );
              })}
            </div>
          )}
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
