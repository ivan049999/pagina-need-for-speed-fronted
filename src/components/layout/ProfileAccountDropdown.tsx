"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AUTH_SESSION_CHANGE_EVENT,
  clearAuthSession,
  getAuthSession,
  updatePilotName,
} from "@/lib/auth-session";
import { cn } from "@/lib/utils/cn";

const API_BASE_URL = "http://localhost:4000/api/v1";

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

function EaAvatarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="2" fill="#6b6f7a" />
      <circle cx="16" cy="13" r="4" fill="#2a2d35" />
      <path
        d="M9 24c1.2-3.5 3.8-5.5 7-5.5s5.8 2 7 5.5"
        stroke="#2a2d35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileAccountDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pilotName, setPilotName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const syncSession = useCallback(async () => {
    const session = getAuthSession();
    if (!session) {
      setIsLoggedIn(false);
      setPilotName("");
      return;
    }

    setIsLoggedIn(true);

    if (session.pilotName) {
      setPilotName(session.pilotName);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const data = (await res.json().catch(() => ({}))) as {
        pilotName?: string;
      };
      if (res.ok && data.pilotName) {
        setPilotName(data.pilotName);
        updatePilotName(data.pilotName);
      }
    } catch {
      setPilotName("Piloto");
    }
  }, []);

  useEffect(() => {
    void syncSession();

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

    function onAuthChange() {
      void syncSession();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
    };
  }, [syncSession]);

  function handleLogout() {
    clearAuthSession();
    setOpen(false);
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={isLoggedIn ? "Menú de cuenta" : "Cuenta"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          isLoggedIn
            ? "flex h-7 w-7 items-center justify-center overflow-hidden rounded transition-opacity hover:opacity-90"
            : iconButtonClass,
          open && !isLoggedIn && "border-white bg-white/10"
        )}
      >
        {isLoggedIn ? <EaAvatarIcon className="h-7 w-7" /> : <ProfileIcon />}
      </button>

      {open && !isLoggedIn ? (
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
      ) : null}

      {open && isLoggedIn ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-[60] mt-1 w-[17.5rem] overflow-hidden rounded-sm border border-white/10 bg-[#3a3f4a] shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <EaAvatarIcon className="h-10 w-10 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{pilotName}</p>
              <Link
                href="#"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="text-xs text-[#b8bcc6] transition-colors hover:text-white"
              >
                Ver perfil
              </Link>
            </div>
          </div>

          <div className="py-1">
            <a
              href="https://help.ea.com/es/"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              Ayuda de EA
            </a>
            <a
              href="https://forums.ea.com/"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              Foros de EA
            </a>
          </div>

          <div className="border-t border-white/10 py-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="block w-full px-4 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/5"
            >
              Cierra sesión
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
