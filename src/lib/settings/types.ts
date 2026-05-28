export type SettingsTab = "general" | "idioma" | "pantalla" | "audio";

export type AppSettings = {
  language: "es" | "en";
  neonEffects: boolean;
  neonColor: string;
  backgroundVideo: boolean;
  uiBrightness: number;
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  reducedMotion: boolean;
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: "es",
  neonEffects: true,
  neonColor: "#00f0ff",
  backgroundVideo: true,
  uiBrightness: 100,
  masterVolume: 75,
  sfxVolume: 80,
  musicVolume: 65,
  reducedMotion: false,
};

export const SETTINGS_STORAGE_KEY = "nfs-web-settings";
