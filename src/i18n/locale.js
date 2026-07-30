export const SUPPORTED_LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";
export const LOCALE_STORAGE_KEY = "sprakkafe-locale";

export function isSupportedLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

export function getLocaleFromPath(pathname) {
  const [, candidate] = pathname.split("/");
  return isSupportedLocale(candidate) ? candidate : null;
}

export function getPreferredLocale() {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isSupportedLocale(storedLocale)) return storedLocale;

  const browserLocale = window.navigator.languages?.[0] || window.navigator.language || "";
  return browserLocale.toLowerCase().startsWith("es") ? "es" : "en";
}

export function localizePath(pathname, locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (isSupportedLocale(segments[0])) segments.shift();
  const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";
  return `/${locale}${suffix}`;
}
