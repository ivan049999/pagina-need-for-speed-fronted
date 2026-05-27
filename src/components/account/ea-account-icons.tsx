import type { ReactNode } from "react";

export function EaCircleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#fff" />
      <circle cx="16" cy="16" r="14" fill="#000" />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        EA
      </text>
    </svg>
  );
}

export function EaAccountAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-[#6b6f7a] ${sizes[size]}`}
    >
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%] text-[#2a2d35]" aria-hidden>
        <circle cx="12" cy="9" r="3.5" fill="currentColor" />
        <path
          d="M6 19c1-2.8 2.8-4.5 6-4.5s5 1.7 6 4.5"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function EaRainbowAvatarRing({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full p-[3px] ${className ?? ""}`}
      style={{
        background:
          "conic-gradient(from 180deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #9b59b6, #ff6b6b)",
      }}
    >
      <div className="rounded-full bg-[#0c1220] p-[3px]">{children}</div>
    </div>
  );
}

function SidebarIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#5c6370]">
      {children}
    </span>
  );
}

export function IconUser() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 1.75c-3.1 0-5.75 1.55-6.9 3.85a.75.75 0 0 0 1.35.65C5.4 14.2 7.5 13 10 13s4.6 1.2 5.55 3.25a.75.75 0 1 0 1.35-.65C15.75 13.3 13.1 11.75 10 11.75Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconLink() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M8.5 6.5a3 3 0 0 1 4.24 0l1.06 1.06a3 3 0 0 1 0 4.24.75.75 0 0 0 1.06 1.06 4.5 4.5 0 0 0 0-6.36l-1.06-1.06a4.5 4.5 0 0 0-6.36 6.36.75.75 0 1 0 1.06-1.06 3 3 0 0 1 0-4.24Z" />
        <path d="M11.5 13.5a3 3 0 0 1-4.24 0L6.2 12.44a3 3 0 0 1 0-4.24.75.75 0 0 0-1.06-1.06 4.5 4.5 0 0 0 0 6.36l1.06 1.06a4.5 4.5 0 0 0 6.36-6.36.75.75 0 0 0-1.06 1.06 3 3 0 0 1 0 4.24Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconShield() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M10 2.5 4 5v5c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V5l-6-2.5Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconMail() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M3 5.5A2 2 0 0 1 5 3.5h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Zm2-.5 6 4.25L15 5H5Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconWallet() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5V7H6.5A2.5 2.5 0 0 0 4 9.5v5A2.5 2.5 0 0 0 6.5 17h8a2.5 2.5 0 0 0 2.5-2.5v-1H8.75a.75.75 0 0 1 0-1.5H17V9.5A2.5 2.5 0 0 0 14.5 7H4V5.5Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconFamily() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M7 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 16.5c0-2.2 1.8-3.5 3-3.5s3 1.3 3 3.5H4Zm6 0c0-1.8 1.2-3 2.5-3.5 1 .3 2.5 1.4 2.5 3.5h-5Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconStar() {
  return (
    <SidebarIcon>
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M10 2.5 12.2 7.5l5.3.8-3.8 3.7.9 5.3L10 14.8l-4.6 2.5.9-5.3-3.8-3.7 5.3-.8L10 2.5Z" />
      </svg>
    </SidebarIcon>
  );
}

export function IconInfo() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[#6b7280]" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" strokeWidth="1.25" />
      <path fill="currentColor" d="M8 7.25a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 7.25ZM8 5.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
    </svg>
  );
}

export function IconCheckVerified() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="#1a9e32" />
      <path
        fill="#fff"
        d="M6.8 10.6 4.5 8.3l.9-.9 1.4 1.4 3.7-3.7.9.9-4.6 4.6Z"
      />
    </svg>
  );
}

export function IconLogout() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M7.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v10a1.5 1.5 0 0 0 1.5 1.5h2.5a.75.75 0 0 0 0-1.5H5V5h2.5a.75.75 0 0 0 0-1.5Zm7.28 3.22-2.5-2.5a.75.75 0 0 0-1.06 1.06l1.22 1.22H9.25a.75.75 0 0 0 0 1.5h3.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06Z" />
    </svg>
  );
}
