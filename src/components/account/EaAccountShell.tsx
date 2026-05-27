"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  EaAccountAvatar,
  EaCircleLogo,
  EaRainbowAvatarRing,
  IconLogout,
} from "@/components/account/ea-account-icons";
import { LogoutOverlay } from "@/components/auth/LogoutOverlay";
import { ACCOUNT_MENU_LINKS, ACCOUNT_SIDEBAR_ITEMS } from "@/lib/account/account-nav";
import { EaAccountProvider, useEaAccountContext } from "@/lib/account/useEaAccountSession";
import { cn } from "@/lib/utils/cn";

type EaAccountShellProps = {
  children: React.ReactNode;
};

export function EaAccountShell({ children }: EaAccountShellProps) {
  return (
    <EaAccountProvider>
      <EaAccountShellInner>{children}</EaAccountShellInner>
    </EaAccountProvider>
  );
}

function EaAccountShellInner({ children }: EaAccountShellProps) {
  const pathname = usePathname();
  const {
    loading,
    account,
    menuOpen,
    setMenuOpen,
    menuRef,
    isLoggingOut,
    handleLogout,
    handleLogoutComplete,
  } = useEaAccountContext();

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1628]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  if (!account) return null;

  return (
    <>
      {isLoggingOut ? (
        <LogoutOverlay pilotName={account.pilotName} onComplete={handleLogoutComplete} />
      ) : null}

      <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0a1628] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(60,100,180,0.35),transparent_55%)]"
          aria-hidden
        />

        <header className="relative border-b border-white/10 bg-[#0a1628]/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <EaCircleLogo className="h-8 w-8" />
              <span className="text-lg font-normal text-white">Cuenta</span>
            </Link>

            <div className="flex items-center gap-6">
              <a
                href="https://help.ea.com/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm text-white/90 hover:text-white sm:inline"
              >
                Ayuda de EA
              </a>

              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-full outline-none ring-white/40 focus-visible:ring-2"
                >
                  <EaRainbowAvatarRing>
                    <EaAccountAvatar size="sm" />
                  </EaRainbowAvatarRing>
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-10 mt-2 w-[280px] overflow-hidden rounded-md border border-white/10 bg-white text-[#1d2033] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-4 py-3">
                      <EaAccountAvatar size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{account.pilotName}</p>
                        <p className="text-xs text-[#6b7280]">
                          Miembro desde {account.memberSinceYear}
                        </p>
                      </div>
                    </div>
                    <nav className="py-1">
                      {ACCOUNT_MENU_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#1d2033] hover:bg-[#f3f4f6]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="border-t border-[#e5e7eb] py-1">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#1d2033] hover:bg-[#f3f4f6]"
                      >
                        <IconLogout />
                        Cierra sesión con tu Cuenta EA
                      </button>
                    </div>
                    <div className="flex gap-4 border-t border-[#e5e7eb] px-4 py-2.5 text-xs text-[#2766ec]">
                      <a href="#" className="hover:underline">
                        Mis incidencias
                      </a>
                      <a
                        href="https://help.ea.com/es/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Ayuda de EA
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-[1200px] px-4 pb-6 pt-8 md:px-8">
          <div className="flex items-center gap-5">
            <EaRainbowAvatarRing>
              <EaAccountAvatar size="lg" />
            </EaRainbowAvatarRing>
            <div>
              <h1 className="text-3xl font-normal tracking-tight md:text-4xl">
                {account.pilotName}
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Miembro desde {account.memberSinceYear}
              </p>
            </div>
          </div>
        </section>

        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-0 px-4 pb-16 md:flex-row md:px-8">
          <aside className="mb-6 w-full shrink-0 md:mb-0 md:w-[260px]">
            <nav className="overflow-hidden rounded-sm bg-white/[0.06] backdrop-blur-sm">
              {ACCOUNT_SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.href !== "#" && pathname === item.href;
                const isLink = item.href !== "#";
                const className = cn(
                  "relative flex items-center gap-3 border-b border-white/5 px-4 py-3.5 text-sm transition-colors last:border-b-0",
                  isActive
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                );

                if (isLink) {
                  return (
                    <Link key={item.id} href={item.href} className={className}>
                      {isActive ? (
                        <span
                          className="absolute left-0 top-0 h-full w-[3px] bg-[#2766ec]"
                          aria-hidden
                        />
                      ) : null}
                      <Icon />
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <span key={item.id} className={cn(className, "cursor-default opacity-60")}>
                    <Icon />
                    {item.label}
                  </span>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 md:pl-6">{children}</main>
        </div>
      </div>
    </>
  );
}
