"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

type LogoutPhase = "enter" | "progress" | "dissolve" | "success" | "exit";

type LogoutOverlayProps = {
  pilotName: string;
  onComplete: () => void;
};

const STATUS_LINES = [
  "Desconectando de servidores EA…",
  "Revocando credenciales locales…",
  "Cerrando garaje del piloto…",
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("nfs-reduced-motion")
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

export function LogoutOverlay({ pilotName, onComplete }: LogoutOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<LogoutPhase>("enter");
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion()) {
      completedRef.current = true;
      onCompleteRef.current();
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase("progress"), 380));
    timers.push(setTimeout(() => setPhase("dissolve"), 1280));
    timers.push(setTimeout(() => setPhase("success"), 1880));
    timers.push(setTimeout(() => setPhase("exit"), 2320));
    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        onCompleteRef.current();
      }, 2680)
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  useEffect(() => {
    if (phase !== "progress") return;

    const statusTimer = setInterval(() => {
      setStatusIndex((value) => (value + 1) % STATUS_LINES.length);
    }, 420);

    const start = performance.now();
    const duration = 900;

    let frame = 0;
    function tick(now: number) {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => {
      clearInterval(statusTimer);
      cancelAnimationFrame(frame);
    };
  }, [phase]);

  if (!mounted) return null;

  const displayName = pilotName || "Piloto";

  return createPortal(
    <div
      className={cn(
        "nfs-logout-overlay fixed inset-0 z-[250] flex items-center justify-center p-4",
        phase === "enter" && "nfs-logout-overlay--enter",
        phase === "exit" && "nfs-logout-overlay--exit"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nfs-logout-title"
      aria-busy={phase !== "success" && phase !== "exit"}
    >
      <div className="nfs-logout-backdrop absolute inset-0" aria-hidden />

      <div className="nfs-logout-scanlines pointer-events-none absolute inset-0" aria-hidden />

      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="nfs-logout-particle pointer-events-none absolute h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-nfs-neon)] to-transparent opacity-60"
          style={{
            top: `${22 + index * 24}%`,
            animationDelay: `${index * 0.35}s`,
          }}
          aria-hidden
        />
      ))}

      <div
        className={cn(
          "nfs-logout-panel relative w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-[#1e2129]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-md",
          phase === "enter" && "nfs-logout-panel--in",
          (phase === "dissolve" || phase === "success") && "nfs-logout-panel--pulse"
        )}
      >
        <div className="nfs-logout-panel-glow pointer-events-none absolute inset-0" aria-hidden />

        <p
          id="nfs-logout-title"
          className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8a909c]"
        >
          Electronic Arts
        </p>
        <h2 className="mb-6 text-center text-lg font-semibold text-white">
          {phase === "success" || phase === "exit" ? "Sesión cerrada" : "Cerrando sesión"}
        </h2>

        <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
          <div
            className={cn(
              "relative overflow-hidden rounded-sm",
              phase === "dissolve" && "nfs-logout-avatar--dissolve",
              phase === "success" && "opacity-30"
            )}
          >
            <EaAvatarIcon className="h-20 w-20" />
            {phase === "dissolve" ? (
              <span className="nfs-logout-avatar-scan absolute inset-0" aria-hidden />
            ) : null}
          </div>
          {phase === "success" || phase === "exit" ? (
            <span
              className="nfs-logout-check absolute inset-0 flex items-center justify-center text-3xl text-[var(--color-nfs-neon)]"
              aria-hidden
            >
              ✓
            </span>
          ) : null}
        </div>

        <p
          className={cn(
            "mb-4 truncate text-center text-base font-semibold text-white",
            (phase === "progress" || phase === "dissolve") && "nfs-logout-name--glitch"
          )}
          aria-live="polite"
        >
          {displayName}
        </p>

        {phase !== "success" && phase !== "exit" ? (
          <>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="nfs-logout-progress-bar h-full rounded-full bg-[var(--color-nfs-neon)] transition-[width] duration-150 ease-out"
                style={{
                  width: `${phase === "enter" ? 8 : phase === "dissolve" ? 100 : progress}%`,
                }}
              />
            </div>
            <p className="min-h-[1.25rem] text-center font-mono text-xs text-[#9aa0ad] transition-opacity duration-200">
              {STATUS_LINES[statusIndex]}
            </p>
          </>
        ) : (
          <p className="text-center text-sm text-[#b8bcc6]">
            Hasta la próxima carrera, piloto.
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
