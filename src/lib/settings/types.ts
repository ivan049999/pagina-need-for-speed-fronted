export type SettingsTab = "general" | "pantalla" | "audio" | "privacidad";

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
  analyticsCookies: boolean;
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
  analyticsCookies: false,
};

export const SETTINGS_STORAGE_KEY = "nfs-web-settings";
