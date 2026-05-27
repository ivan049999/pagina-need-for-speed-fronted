export function maskPhone(dialCode: string, phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  if (digits.length < 4) return `${dialCode} ••••`;
  const tail = digits.slice(-2);
  const hidden = "•".repeat(Math.max(4, digits.length - 2));
  return `${dialCode} ${hidden}${tail}`;
}
