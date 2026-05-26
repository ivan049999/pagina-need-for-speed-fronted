import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils/cn";

export function EaLogo() {
  return (
    <Image
      src="/images/auth/ea-logo.svg"
      alt="Electronic Arts"
      width={64}
      height={64}
      className="mx-auto mb-6 h-16 w-16"
      priority
    />
  );
}

export function EaAuthSeparator() {
  return (
    <div className="relative mb-6 flex items-center">
      <div className="h-px flex-1 bg-white/15" />
      <div className="mx-3 h-2 w-2 rounded-full bg-white/25" />
      <div className="h-px flex-1 bg-white/15" />
    </div>
  );
}

export function EaGoogleSocialButton() {
  return (
    <button
      type="button"
      aria-label="Continuar con Google"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white transition-opacity hover:bg-white/90"
    >
      <FcGoogle className="h-6 w-6" aria-hidden />
    </button>
  );
}

export const eaFieldClass =
  "w-full rounded-md border border-white/20 bg-[#0f141c] px-4 py-3 text-sm text-white outline-none transition focus:border-[#3d8bfd] focus:ring-1 focus:ring-[#3d8bfd]/40";

export const eaLabelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-wide text-[#9aa4b2]";

export function EaAuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[420px] rounded-lg bg-[#151c28] px-8 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {children}
    </div>
  );
}
