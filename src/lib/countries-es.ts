import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";

countries.registerLocale(es);

export type CountryOption = {
  value: string;
  label: string;
};

export const ALL_COUNTRIES_ES: CountryOption[] = Object.entries(
  countries.getNames("es", { select: "official" })
)
  .map(([code, name]) => ({
    value: code,
    label: name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label, "es"));

export const DEFAULT_COUNTRY_CODE = "ES";
