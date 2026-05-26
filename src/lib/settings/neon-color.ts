export const DEFAULT_NEON_COLOR = "#00f0ff";

export const NEON_COLOR_PRESETS = [
  { id: "cyan", label: "Cyan NFS", hex: "#00f0ff" },
  { id: "magenta", label: "Magenta UG2", hex: "#ff2bd6" },
  { id: "orange", label: "Naranja", hex: "#ff8c00" },
  { id: "lime", label: "Verde lima", hex: "#b8ff00" },
  { id: "purple", label: "Púrpura", hex: "#a855f7" },
  { id: "red", label: "Rojo", hex: "#ff3d00" },
] as const;

export type NeonColorPresetId = (typeof NEON_COLOR_PRESETS)[number]["id"];

export function normalizeHexColor(hex: string): string {
  const raw = hex.trim().replace(/^#/, "");
  if (raw.length === 3) {
    return `#${raw
      .split("")
      .map((c) => c + c)
      .join("")
      .toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) {
    return `#${raw.toLowerCase()}`;
  }
  return DEFAULT_NEON_COLOR;
}

export function hexToRgbString(hex: string): string {
  const normalized = normalizeHexColor(hex).replace("#", "");
  const n = parseInt(normalized, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `${r} ${g} ${b}`;
}

export function applyNeonColorToDocument(hex: string) {
  const color = normalizeHexColor(hex);
  const root = document.documentElement;
  root.style.setProperty("--color-nfs-neon", color);
  root.style.setProperty("--nfs-neon-rgb", hexToRgbString(color));
}
