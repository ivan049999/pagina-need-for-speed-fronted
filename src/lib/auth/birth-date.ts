export function buildBirthDateIso(day: string, month: string, year: string): string {
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function parseBirthDateIso(isoDate: string | null): {
  year: string;
  month: string;
  day: string;
} {
  if (!isoDate) return { year: "", month: "", day: "" };
  const [year, month, day] = isoDate.slice(0, 10).split("-");
  return {
    year: year ?? "",
    month: month ? String(Number(month)) : "",
    day: day ? String(Number(day)) : "",
  };
}

/** Formato DD/MM/YYYY para la UI estilo EA */
export function formatBirthDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}
