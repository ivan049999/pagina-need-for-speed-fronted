"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

const iconButtonClass =
  "flex h-7 w-7 items-center justify-center rounded border border-white/70 text-white transition-colors hover:border-white hover:bg-white/10";

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      aria-hidden
    >
      <circle cx="12" cy="9" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 18.5c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileAccountDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        aria-label="Cuenta"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          iconButtonClass,
          open && "border-white bg-white/10"
        )}
      >
        <ProfileIcon />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[60] mt-1 min-w-[14.5rem] rounded-sm border border-white/10 bg-[#1a1a22] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <Link
            href="/login"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mb-2 block w-full rounded-sm bg-[#6b2cd6] py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#7a3de0]"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block w-full rounded-sm border border-white py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Crear una cuenta
          </Link>
        </div>
      )}
    </div>
  );
}
