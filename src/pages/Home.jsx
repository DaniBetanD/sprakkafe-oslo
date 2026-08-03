import { useState } from "react";
import { Link } from "react-router-dom";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import CommunityInviteSection from "../components/CommunityInviteSection";
import DesktopDetailPanel from "../components/DesktopDetailPanel";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HorizontalCarousel from "../components/HorizontalCarousel";
import MissionSection from "../components/MissionSection";
import MobileDetailPanel from "../components/MobileDetailPanel";
import SearchBar from "../components/SearchBar";
import TodayActivities from "../components/TodayActivities";
import { scrollToId } from "../utils/scrollTo";
import {
  activityMatchesQuery,
  getActivityDays,
  isActivityAvailableOn,
  isActivityVisible,
} from "../utils/activityPresentation";
import { useLanguage } from "../i18n/LanguageContext";
import SeoMetadata from "../components/SeoMetadata";
import { getHomeSeo } from "../utils/seo";

const JS_DAY_TO_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Home() {
  const { activityContent, locale, organizationContent, pathFor, t } = useLanguage();
  const localizedActivities = activities.map(activityContent);
  const localizedOrganizations = organizations.map(organizationContent);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ category: "", district: "", day: "", level: "", organization: "" });
  const [selected, setSelected] = useState(null);

  function getOrganization(id) {
    return localizedOrganizations.find((organization) => organization.id === id);
  }

  const visibleActivities = localizedActivities.filter((activity) => isActivityVisible(activity));
  const todayEnglish = JS_DAY_TO_EN[new Date().getDay()];
  const todayActivities = visibleActivities.filter(
    (activity) => isActivityAvailableOn(activity) && getActivityDays(activity).includes(todayEnglish),
  );
  const showDiscoveryTools = visibleActivities.length >= 4;
  const hasDiscoveryCriteria = query.trim() !== "" || Object.values(filters).some(Boolean);

  const results = visibleActivities.filter((activity) => {
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
  const seo = getHomeSeo(visibleActivities, locale);

  function resetDiscovery() {
    setQuery("");
    setFilters({ category: "", district: "", day: "", level: "", organization: "" });
    scrollToId("actividades");
  }

  function updateFilters(nextFilters) {
    setFilters((currentFilters) => (
      typeof nextFilters === "function" ? nextFilters(currentFilters) : nextFilters
    ));
    setSelected(null);
  }

  function updateQuery(nextQuery) {
    setQuery(nextQuery);
    setSelected(null);
  }

  function toggleSelected(activity) {
    setSelected(selected?.id === activity.id ? null : activity);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <SeoMetadata {...seo} locale={locale} />
      <Header />

      <main id="main-content" className="flex-grow space-y-10 md:space-y-16 pb-12">
        <section
          id="hero"
          className={`bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 ${showDiscoveryTools ? "pb-20" : "pb-12"}`}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {t("heroTitle")}{" "}
              <br className="sm:hidden" />
              <span className="text-yellow-200">Språkkafé</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t("heroText")}
            </p>
          </div>
        </section>

        {showDiscoveryTools && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 relative z-10 w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <SearchBar query={query} onSearch={updateQuery} />
              <div className="mt-3">
                <Filters filters={filters} setFilters={updateFilters} activities={visibleActivities} />
              </div>
            </div>
          </section>
        )}

        {!hasDiscoveryCriteria && todayActivities.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
            <TodayActivities
              activities={todayActivities}
              getOrganization={getOrganization}
              setSelected={setSelected}
              selected={selected}
            />
          </section>
        )}

        <section id="actividades" className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-xl md:text-2xl text-gray-900">
              {t("findSprakkafe")}
            </h2>
            <span
              className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100"
              role="status"
              aria-live="polite"
            >
              {results.length} {results.length === 1 ? t("activitySingular") : t("activityPlural")}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-500">{t("noMatches")}</p>
              <button
                type="button"
                onClick={resetDiscovery}
                className="mt-3 text-xs font-bold text-blue-600 underline min-h-[44px]"
              >
                {t("viewAllActivities")}
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="block md:hidden w-full">
                {results.length === 1 ? (
                  <ActivityCard
                    activity={results[0]}
                    organization={getOrganization(results[0].organizationId)}
                    onClick={() => toggleSelected(results[0])}
                    isSelected={selected?.id === results[0].id}
                  />
                ) : (
                  <HorizontalCarousel>
                    {results.map((activity) => (
                      <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] max-w-[85vw] snap-center p-1">
                        <ActivityCard
                          activity={activity}
                          organization={getOrganization(activity.organizationId)}
                          onClick={() => toggleSelected(activity)}
                          isSelected={selected?.id === activity.id}
                        />
                      </div>
                    ))}
                  </HorizontalCarousel>
                )}
              </div>

              <div className="hidden md:flex gap-6">
                <div className={`grid gap-4 transition-all duration-300 ${selected ? "grid-cols-1 w-[45%] shrink-0" : "grid-cols-2 lg:grid-cols-3 w-full"}`}>
                  {results.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      organization={getOrganization(activity.organizationId)}
                      onClick={() => toggleSelected(activity)}
                      isSelected={selected?.id === activity.id}
                    />
                  ))}
                </div>

                <DesktopDetailPanel
                  selected={selected}
                  organization={selectedOrganization}
                  onClose={() => setSelected(null)}
                />
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to={pathFor("/activities")}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-blue-200 bg-white px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                {t("viewAllActivities")}
              </Link>
            </div>
          )}
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <MissionSection />
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <CommunityInviteSection />
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
