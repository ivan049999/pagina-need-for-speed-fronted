"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  fetchNfsCatalog,
  mapStaticGamesToCatalog,
} from "@/lib/games/fetchNfsCatalog";
import { isInternalNfsGameHref } from "@/lib/nfs-game-link";
import type { NfsCatalogEntry } from "@/types/nfs-catalog";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-2 w-3 shrink-0 text-white transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function toMenuGames(entries: NfsCatalogEntry[]) {
  return entries.map((game) => ({
    label: game.label,
    href: game.href,
  }));
}

const FALLBACK_GAMES = toMenuGames(mapStaticGamesToCatalog());

export function NavGamesDropdown() {
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState(FALLBACK_GAMES);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    void fetchNfsCatalog().then((entries) => {
      if (cancelled || entries.length === 0) return;
      setGames(toMenuGames(entries));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-2 text-lg text-white transition-colors md:text-xl lg:text-2xl ${
          open
            ? "border-b-2 border-[#3d8bfd] pb-1"
            : "text-nfs-chrome hover:text-white"
        }`}
      >
        Juegos de Need for Speed
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[60] max-h-[70vh] min-w-[20rem] overflow-y-auto border border-[#3d8bfd]/70 bg-[#0f1a2e] py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          {games.map((game) => {
            const internal = isInternalNfsGameHref(game.href);
            return (
              <Link
                key={game.label}
                href={game.href}
                role="menuitem"
                {...(internal
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="block px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {game.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
