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
  }, [locale]);

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
