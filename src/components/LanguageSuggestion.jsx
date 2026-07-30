import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LOCALE_STORAGE_KEY, getPreferredLocale } from "../i18n/locale";

export default function LanguageSuggestion() {
  const { locale, setLocale, t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  const hasPreference = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  const visible = !dismissed && !hasPreference && locale === "es" && getPreferredLocale() === "en";

  if (!visible) return null;

  function continueInSpanish() {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "es");
    setDismissed(true);
  }

  return (
    <aside className="border-b border-blue-200 bg-blue-50" aria-label={t("languageLabel")}>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="font-medium text-gray-800">{t("englishSuggestion")}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className="min-h-[44px] rounded-lg bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {t("viewEnglish")}
          </button>
          <button
            type="button"
            onClick={continueInSpanish}
            className="min-h-[44px] rounded-lg px-3 font-semibold text-gray-600 transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {t("continueSpanish")}
          </button>
        </div>
      </div>
    </aside>
  );
}
