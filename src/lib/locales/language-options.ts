export type LanguageOption = {
  value: string;
  label: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
];

export const DEFAULT_LANGUAGE_CODE = "es";

export function getLanguageLabel(languageCode: string | null) {
  if (!languageCode) return "Español";
  return LANGUAGE_OPTIONS.find((l) => l.value === languageCode)?.label ?? languageCode;
}
