import Link from "next/link";

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
  return (
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
          <button type="button" aria-label="Cuenta" className={iconButtonClass}>
            <ProfileIcon />
          </button>
          <button type="button" aria-label="Ajustes" className={iconButtonClass}>
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
