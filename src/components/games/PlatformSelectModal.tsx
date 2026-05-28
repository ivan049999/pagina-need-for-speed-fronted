"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactElement } from "react";
import { createPortal } from "react-dom";
import type { StorePlatform } from "@/content/games/need-for-speed-underground";

type PlatformSelectModalProps = {
  open: boolean;
  onClose: () => void;
  platforms: StorePlatform[];
};

function EaAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="white" />
      <circle cx="12" cy="12" r="9" fill="#0768f8" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        EA
      </text>
    </svg>
  );
}

function XboxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="white" />
      <path
        fill="#0768f8"
        d="M4.5 6.5c2.2 1.8 4.2 4.5 5.5 7.2 1.3-2.7 3.3-5.4 5.5-7.2C12.8 5.2 10.5 4.5 8 4.5S3.2 5.2 4.5 6.5zm15 0C17.3 5.2 15 4.5 12.5 4.5S7.7 5.2 6.5 6.5c2.2 1.8 4.2 4.5 5.5 7.2 1.3-2.7 3.3-5.4 5.5-7.2zM8 19.5c2.5 0 4.8-.7 7-2-2.2-1.3-4.2-3.2-5.5-5.5C8.2 14.3 6.2 16.2 4 17.5c1.2 1.3 2.5 2 4 2zm8 0c1.5 0 2.8-.7 4-2-2.2-1.3-4.2-3.2-5.5-5.5-1.3 2.3-3.3 4.2-5.5 5.5 2.2 1.3 4.5 2 7 2z"
      />
    </svg>
  );
}

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="white" />
      <circle cx="15.5" cy="9" r="3" fill="#0768f8" stroke="white" strokeWidth="0.5" />
      <circle cx="8.5" cy="14.5" r="3.5" fill="none" stroke="#0768f8" strokeWidth="1.5" />
      <line x1="11.5" y1="12" x2="13.5" y2="10.5" stroke="#0768f8" strokeWidth="1.2" />
    </svg>
  );
}

function PlayStationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="white" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="#0768f8"
        fontSize="11"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        PS
      </text>
    </svg>
  );
}

const PLATFORM_ICONS: Record<StorePlatform["id"], () => ReactElement> = {
  ea: EaAppIcon,
  xbox: XboxIcon,
  steam: SteamIcon,
  playstation: PlayStationIcon,
};

export function PlatformSelectModal({
  open,
  onClose,
  platforms,
}: PlatformSelectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Cerrar selección de plataforma"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="platform-select-title"
        className="relative w-full max-w-[420px] rounded-lg bg-[#1a1d24] px-6 pb-6 pt-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="platform-select-title" className="sr-only">
          Seleccionar plataforma
        </h2>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-2xl leading-none text-white/80 transition-colors hover:text-white"
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="flex flex-col gap-3">
          {platforms.map((platform) => {
            const Icon = PLATFORM_ICONS[platform.id];
            return (
              <a
                key={platform.id}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded bg-[#0768f8] px-4 py-3.5 text-left text-sm font-normal leading-snug text-white transition-colors hover:bg-[#1a75ff]"
              >
                {platform.iconSrc ? (
                  <Image
                    src={platform.iconSrc}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 rounded-full object-contain"
                  />
                ) : Icon ? (
                  <Icon />
                ) : null}
                <span>{platform.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
