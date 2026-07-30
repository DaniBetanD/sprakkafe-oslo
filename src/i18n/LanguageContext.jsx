import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getLocaleFromPath,
  localizePath,
} from "./locale";
import { getMessage } from "./messages";
import { localizeActivity, localizeOrganization } from "./contentTranslations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = getLocaleFromPath(location.pathname) || DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "en"
      ? "Språkkafé Oslo — Practise Norwegian and connect"
      : "Språkkafé Oslo — Practica noruego y conecta";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      locale === "en"
        ? "Find free activities in Oslo where you can practise Norwegian, meet people and connect with local life."
        : "Encuentra actividades gratuitas para practicar noruego, conocer personas y sentirte parte de Oslo.",
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", `${window.location.origin}${location.pathname}`);

    for (const language of ["es", "en"]) {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${language}"]`);
      if (!alternate) {
        alternate = document.createElement("link");
        alternate.rel = "alternate";
        alternate.hreflang = language;
        document.head.appendChild(alternate);
      }
      alternate.href = `${window.location.origin}${localizePath(location.pathname, language)}`;
    }
  }, [locale, location.pathname]);

  const value = useMemo(() => ({
    locale,
    setLocale(nextLocale) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      navigate({
        pathname: localizePath(location.pathname, nextLocale),
        search: location.search,
        hash: location.hash,
      });
    },
    pathFor(pathname) {
      return localizePath(pathname, locale);
    },
    t(key, variables) {
      return getMessage(locale, key, variables);
    },
    activityContent(activity) {
      return localizeActivity(activity, locale);
    },
    organizationContent(organization) {
      return localizeOrganization(organization, locale);
    },
  }), [locale, location.hash, location.pathname, location.search, navigate]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
