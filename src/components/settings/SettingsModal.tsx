"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { useSettings } from "@/context/SettingsContext";
import {
  applyNeonColorToDocument,
  NEON_COLOR_PRESETS,
} from "@/lib/settings/neon-color";
import { DEFAULT_SETTINGS, type SettingsTab } from "@/lib/settings/types";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: "general", label: "General", icon: "⚙" },
  { id: "idioma", label: "Idioma", icon: "🌐" },
  { id: "pantalla", label: "Pantalla", icon: "◐" },
  { id: "audio", label: "Audio", icon: "♪" },
];

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="group flex cursor-pointer items-start justify-between gap-4 rounded-sm border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-nfs-neon/25 hover:bg-nfs-neon/[0.03]">
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-white">{label}</span>
        {description ? (
          <span className="mt-1 block text-xs leading-relaxed text-nfs-chrome/80">
            {description}
          </span>
        ) : null}
      </span>
      <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-200",
            "border-white/20 bg-[#1a1a22] peer-checked:border-nfs-neon/60 peer-checked:bg-nfs-neon/20",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-nfs-neon/50"
          )}
          aria-hidden
        />
        <span
          className={cn(
            "absolute left-0.5 h-5 w-5 rounded-full bg-nfs-chrome shadow transition-all duration-200",
            "peer-checked:translate-x-5 peer-checked:bg-nfs-neon peer-checked:shadow-nfs-glow-sm"
          )}
          aria-hidden
        />
      </span>
    </label>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-sm border border-white/5 bg-white/[0.02] px-4 py-3.5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="font-display text-sm tabular-nums text-nfs-neon">
          {value}
          {unit ?? "%"}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="nfs-range w-full"
      />
    </div>
  );
}

function NeonColorRow({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled?: boolean;
  onChange: (hex: string) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-white/5 bg-white/[0.02] px-4 py-3.5",
        disabled && "pointer-events-none opacity-45"
      )}
    >
      <div className="mb-3">
        <span className="block text-sm font-medium text-white">Color del neón</span>
        <span className="mt-1 block text-xs leading-relaxed text-nfs-chrome/80">
          Afecta títulos, botones, bordes y la animación en todo el sitio.
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {NEON_COLOR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            title={preset.label}
            aria-label={preset.label}
            onClick={() => onChange(preset.hex)}
            className={cn(
              "h-9 w-9 rounded-sm border-2 transition-transform hover:scale-105",
              value.toLowerCase() === preset.hex.toLowerCase()
                ? "border-white ring-2 ring-nfs-neon/50"
                : "border-white/20"
            )}
            style={{ backgroundColor: preset.hex }}
          />
        ))}
      </div>
      <label className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded border border-white/15 bg-transparent p-0.5"
        />
        <span className="font-display text-sm uppercase tracking-wider text-nfs-neon">
          {value}
        </span>
      </label>
    </div>
  );
}

function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2 rounded-sm border border-white/5 bg-white/[0.02] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-white">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-white/15 bg-[#121218] px-3 py-2 text-sm text-white outline-none transition focus:border-nfs-neon/50 focus:ring-1 focus:ring-nfs-neon/30 sm:max-w-[200px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TabPanel({
  activeTab,
  draft,
  onPatch,
}: {
  activeTab: SettingsTab;
  draft: ReturnType<typeof useSettings>["settings"];
  onPatch: (patch: Partial<typeof draft>) => void;
}) {
  if (activeTab === "general") {
    return (
      <div className="space-y-3">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-nfs-neon/90">
          Preferencias del juego
        </p>
        <Toggle
          label="Efectos de neón"
          description="Animaciones de brillo en títulos y elementos destacados."
          checked={draft.neonEffects}
          onChange={(neonEffects) => onPatch({ neonEffects })}
        />
        <NeonColorRow
          value={draft.neonColor}
          disabled={!draft.neonEffects}
          onChange={(neonColor) => onPatch({ neonColor })}
        />
        <Toggle
          label="Reducir movimiento"
          description="Desactiva parpadeos y transiciones intensas."
          checked={draft.reducedMotion}
          onChange={(reducedMotion) => onPatch({ reducedMotion })}
        />
      </div>
    );
  }

  if (activeTab === "idioma") {
    return (
      <div className="space-y-3">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-nfs-neon/90">
          Idioma
        </p>

        <SelectRow
          label="Idioma de la interfaz"
          value={draft.language}
          options={[
            { value: "es", label: "Español" },
            { value: "en", label: "Inglés" },
          ]}
          onChange={(v) => onPatch({ language: v as "es" | "en" })}
        />
      </div>
    );
  }

  if (activeTab === "pantalla") {
    return (
      <div className="space-y-3">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-nfs-neon/90">
          Pantalla y rendimiento
        </p>
        <Toggle
          label="Vídeo de fondo en inicio"
          description="Reproduce el carrusel de vídeos en la página principal."
          checked={draft.backgroundVideo}
          onChange={(backgroundVideo) => onPatch({ backgroundVideo })}
        />
        <Slider
          label="Brillo de la interfaz"
          value={draft.uiBrightness}
          min={70}
          max={130}
          onChange={(uiBrightness) => onPatch({ uiBrightness })}
        />
      </div>
    );
  }

  if (activeTab === "audio") {
    return (
      <div className="space-y-3">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-nfs-neon/90">
          Volumen
        </p>
        <Slider
          label="Volumen general"
          value={draft.masterVolume}
          min={0}
          max={100}
          onChange={(masterVolume) => onPatch({ masterVolume })}
        />
        <Slider
          label="Efectos de sonido"
          value={draft.sfxVolume}
          min={0}
          max={100}
          onChange={(sfxVolume) => onPatch({ sfxVolume })}
        />
        <Slider
          label="Música"
          value={draft.musicVolume}
          min={0}
          max={100}
          onChange={(musicVolume) => onPatch({ musicVolume })}
        />
      </div>
    );
  }

  return null;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [draft, setDraft] = useState(settings);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setDraft(settings);
  }, [open, settings]);

  useEffect(() => {
    if (!open) return;
    applyNeonColorToDocument(draft.neonColor);
    return () => {
      applyNeonColorToDocument(settings.neonColor);
    };
  }, [open, draft.neonColor, settings.neonColor]);

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

  const handleApply = useCallback(() => {
    updateSettings(draft);
    onClose();
  }, [draft, updateSettings, onClose]);

  const handleReset = useCallback(() => {
    resetSettings();
    setDraft(DEFAULT_SETTINGS);
    onClose();
  }, [resetSettings, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Cerrar ajustes"
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nfs-settings-title"
        className={cn(
          "relative flex w-full max-w-4xl flex-col overflow-hidden",
          "max-h-[min(90vh,720px)] rounded-sm border border-nfs-neon/30",
          "bg-[#0a0a0f] shadow-nfs-panel",
          "nfs-settings-panel animate-in"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)",
          }}
          aria-hidden
        />

        <header className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#12121a] to-[#0d0d14] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-nfs-neon/70">
              Need for Speed
            </p>
            <h2
              id="nfs-settings-title"
              className="font-display text-xl tracking-wide text-white sm:text-2xl"
            >
              Ajustes
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-nfs-chrome transition hover:border-nfs-neon/50 hover:text-white hover:shadow-nfs-glow-md"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="relative flex min-h-0 flex-1 flex-col sm:flex-row">
          <nav
            className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 bg-[#0c0c12] p-2 sm:w-48 sm:flex-col sm:border-b-0 sm:border-r sm:overflow-x-visible sm:p-3"
            aria-label="Secciones de ajustes"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-2.5 text-left text-sm transition",
                  activeTab === tab.id
                    ? "bg-nfs-neon/15 text-nfs-neon shadow-nfs-inset-tab"
                    : "text-nfs-chrome hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="font-display text-base opacity-80" aria-hidden>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            <TabPanel
              activeTab={activeTab}
              draft={draft}
              onPatch={(patch) => setDraft((d) => ({ ...d, ...patch }))}
            />
          </div>
        </div>

        <footer className="relative flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#08080c] px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs uppercase tracking-wider text-nfs-chrome transition hover:text-white"
          >
            Restaurar predeterminados
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-white/20 px-4 py-2 text-sm text-nfs-chrome transition hover:border-white/40 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-sm bg-nfs-neon px-5 py-2 text-sm font-semibold text-nfs-asphalt shadow-nfs-glow-lg transition hover:bg-white"
            >
              Aplicar
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
