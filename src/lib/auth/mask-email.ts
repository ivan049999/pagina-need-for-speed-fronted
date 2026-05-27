export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const head = user.slice(0, 2);
  const tail = user.length > 3 ? user.slice(-1) : "";
  return `${head}*****${tail}@${domain}`;
}
