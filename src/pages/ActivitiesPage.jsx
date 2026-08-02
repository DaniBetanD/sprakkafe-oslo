import { useState } from "react";
import { Link } from "react-router-dom";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileDetailPanel from "../components/MobileDetailPanel";
import SearchBar from "../components/SearchBar";
import SeoMetadata from "../components/SeoMetadata";
import { useLanguage } from "../i18n/LanguageContext";
import { activityMatchesQuery, getActivityDays, isActivityVisible } from "../utils/activityPresentation";
import { getActivitiesSeo } from "../utils/seo";

export default function ActivitiesPage() {
  const { activityContent, locale, organizationContent, pathFor, t } = useLanguage();
  const localizedActivities = activities.map(activityContent).filter((activity) => isActivityVisible(activity));
  const localizedOrganizations = organizations.map(organizationContent);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ category: "", district: "", day: "", level: "", organization: "" });
  const [selected, setSelected] = useState(null);

  function getOrganization(id) {
    return localizedOrganizations.find((organization) => organization.id === id);
  }

  const results = localizedActivities.filter((activity) => {
    const organization = getOrganization(activity.organizationId);
    const matchesSearch = activityMatchesQuery(activity, organization, query, locale);
    const matchesCategory = !filters.category || activity.category === filters.category;
    const matchesDistrict = !filters.district || activity.district === filters.district;
    const matchesDay = !filters.day || getActivityDays(activity).includes(filters.day);
    const matchesLevel = !filters.level || activity.level === filters.level;
    const matchesOrganization = !filters.organization || activity.organizationId === filters.organization;

    return matchesSearch && matchesCategory && matchesDistrict && matchesDay && matchesLevel && matchesOrganization;
  });

  const selectedOrganization = selected ? getOrganization(selected.organizationId) : null;
  const seo = getActivitiesSeo(localizedActivities, locale);

  function resetDiscovery() {
    setQuery("");
    setFilters({ category: "", district: "", day: "", level: "", organization: "" });
    setSelected(null);
  }

  function updateFilters(nextFilters) {
    setFilters((currentFilters) => (
      typeof nextFilters === "function" ? nextFilters(currentFilters) : nextFilters
    ));
    setSelected(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <SeoMetadata {...seo} locale={locale} />
      <Header />

      <main id="main-content" className="flex-grow pb-12">
        <section className="border-b border-blue-100 bg-blue-50">
          <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
            <Link
              to={pathFor("/")}
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {t("backHome")}
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {t("allActivitiesTitle")}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              {t("allActivitiesIntro")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <SearchBar query={query} onSearch={(nextQuery) => {
              setQuery(nextQuery);
              setSelected(null);
            }} />
            <div className="mt-3">
              <Filters
                filters={filters}
                setFilters={updateFilters}
                activities={localizedActivities}
              />
            </div>
          </div>

          <div className="mb-5 mt-8 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              {t("availableActivities")}
            </h2>
            <span
              className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
              role="status"
              aria-live="polite"
            >
              {results.length} {results.length === 1 ? t("activitySingular") : t("activityPlural")}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 py-12 text-center">
              <p className="text-sm text-gray-500">{t("noMatches")}</p>
              <button
                type="button"
                onClick={resetDiscovery}
                className="mt-3 min-h-[44px] text-sm font-bold text-blue-600 underline"
              >
                {t("viewAllActivities")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  organization={getOrganization(activity.organizationId)}
                  onClick={() => setSelected(activity)}
                  searchContext={{ query, filters }}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <MobileDetailPanel
        selected={selected}
        selectedOrg={selectedOrganization}
        onClose={() => setSelected(null)}
      />
      <Footer />
    </div>
  );
}
