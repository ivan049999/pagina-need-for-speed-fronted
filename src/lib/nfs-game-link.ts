export function isInternalNfsGameHref(href: string): boolean {
  return href.startsWith("/");
}
