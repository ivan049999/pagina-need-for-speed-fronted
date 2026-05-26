"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfileAccountDropdown } from "@/components/layout/ProfileAccountDropdown";
import { SettingsModal } from "@/components/settings/SettingsModal";

const iconButtonClass =
  "flex h-7 w-7 items-center justify-center rounded border border-white/70 text-white transition-colors hover:border-white hover:bg-white/10";

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 4.25v1.5M12 18.25v1.5M6.61 6.61l1.06 1.06M16.33 16.33l1.06 1.06M4.25 12h1.5M18.25 12h1.5M6.61 17.39l1.06-1.06M16.33 7.67l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ElectronicArtsBar() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-white/10 bg-[#161616]">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 md:px-6">
          <Link
            href="https://www.ea.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-normal tracking-wide text-white transition-opacity hover:opacity-80"
          >
            Electronic Arts
          </Link>
          <div className="flex items-center gap-2">
            <ProfileAccountDropdown />
            <button
              type="button"
              aria-label="Ajustes"
              aria-expanded={settingsOpen}
              aria-haspopup="dialog"
              className={iconButtonClass}
              onClick={() => setSettingsOpen(true)}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </div>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
