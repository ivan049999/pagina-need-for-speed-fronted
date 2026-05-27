export type PhoneCountryOption = {
  dialCode: string;
  label: string;
  iso: string;
};

export const PHONE_COUNTRY_OPTIONS: PhoneCountryOption[] = [
  { iso: "ES", dialCode: "+34", label: "España (+34)" },
  { iso: "US", dialCode: "+1", label: "Estados Unidos (+1)" },
  { iso: "MX", dialCode: "+52", label: "México (+52)" },
  { iso: "AR", dialCode: "+54", label: "Argentina (+54)" },
  { iso: "CO", dialCode: "+57", label: "Colombia (+57)" },
  { iso: "CL", dialCode: "+56", label: "Chile (+56)" },
  { iso: "PE", dialCode: "+51", label: "Perú (+51)" },
  { iso: "VE", dialCode: "+58", label: "Venezuela (+58)" },
  { iso: "EC", dialCode: "+593", label: "Ecuador (+593)" },
  { iso: "GB", dialCode: "+44", label: "Reino Unido (+44)" },
  { iso: "FR", dialCode: "+33", label: "Francia (+33)" },
  { iso: "DE", dialCode: "+49", label: "Alemania (+49)" },
  { iso: "IT", dialCode: "+39", label: "Italia (+39)" },
  { iso: "PT", dialCode: "+351", label: "Portugal (+351)" },
  { iso: "BR", dialCode: "+55", label: "Brasil (+55)" },
];

export const DEFAULT_PHONE_DIAL_CODE = "+34";
