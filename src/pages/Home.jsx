import { useState } from "react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import CategorySection from "../components/CategorySection";
import DesktopDetailPanel from "../components/DesktopDetailPanel";
import Filters from "../components/Filters";
import FirstVisitConfidence from "../components/FirstVisitConfidence";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HorizontalCarousel from "../components/HorizontalCarousel";
import MissionSection from "../components/MissionSection";
import MobileDetailPanel from "../components/MobileDetailPanel";
import RecommendedActivities from "../components/RecommendedActivities";
import SearchBar from "../components/SearchBar";
import { scrollToId } from "../utils/scrollTo";

const JS_DAY_TO_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function isFamilyActivity(activity) {
  const searchableText = `${activity.name} ${activity.description || ""}`.toLowerCase();
  return searchableText.includes("famil") || searchableText.includes("niño") || searchableText.includes("barn");
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({ district: "", day: "", level: "", organization: "" });
  const [selected, setSelected] = useState(null);

  function getOrganization(id) {
    return organizations.find((organization) => organization.id === id);
  }

  const todayEnglish = JS_DAY_TO_EN[new Date().getDay()];
  const todayCount = activities.filter((activity) => activity.day === todayEnglish).length;
  const familyCount = activities.filter(isFamilyActivity).length;
  const showCategories = todayCount > 0 || familyCount > 0;
  const showRecommendations = activities.length >= 4;
  const showDiscoveryTools = activities.length >= 4;

  const results = activities.filter((activity) => {
    const organization = getOrganization(activity.organizationId);
    const searchableText = `${activity.name}${organization?.name || ""}${activity.district}${activity.level}`.toLowerCase();
    const matchesSearch = searchableText.includes(query.toLowerCase());
    const matchesDistrict = !filters.district || activity.district === filters.district;
    const matchesDay = !filters.day || activity.day === filters.day;
    const matchesLevel = !filters.level || activity.level === filters.level;
    const matchesOrganization = !filters.organization || activity.organizationId === filters.organization;

    let matchesCategory = true;
    if (activeCategory === "today") matchesCategory = activity.day === todayEnglish;
    if (activeCategory === "families") matchesCategory = isFamilyActivity(activity);

    return matchesSearch && matchesDistrict && matchesDay && matchesLevel && matchesOrganization && matchesCategory;
  });

  const selectedOrganization = selected ? getOrganization(selected.organizationId) : null;

  function handleSelectCategory(categoryId) {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setFilters({ district: "", day: "", level: "", organization: "" });
    }
    scrollToId("actividades");
  }

  function toggleSelected(activity) {
    setSelected(selected?.id === activity.id ? null : activity);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow space-y-10 md:space-y-16 pb-12">
        <section
          id="hero"
          className={`bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 ${showDiscoveryTools ? "pb-20" : "pb-12"}`}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Encuentra tu{" "}
              <br className="sm:hidden" />
              <span className="text-yellow-200">Språkkafé</span>
            </h1>
            <p className="mt-4 text-sm md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Practica noruego en un entorno real, conoce gente y descubre la cultura de Oslo.
            </p>
          </div>
        </section>

        {showDiscoveryTools && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 relative z-10 w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <SearchBar onSearch={setQuery} />
              <div className="mt-3">
                <Filters filters={filters} setFilters={setFilters} activities={activities} />
              </div>
            </div>
          </section>
        )}

        <section className="max-w-5xl mx-auto px-4 md:px-6 w-full" aria-labelledby="first-visit-title">
          <FirstVisitConfidence />
        </section>

        {showCategories && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
            <CategorySection
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              todayCount={todayCount}
              familyCount={familyCount}
            />
          </section>
        )}

        {showRecommendations && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
            <RecommendedActivities
              activities={activities}
              getOrganization={getOrganization}
              setSelected={setSelected}
              selected={selected}
            />
          </section>
        )}

        <section id="actividades" className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-xl md:text-2xl text-gray-900">
              {activeCategory === "today"
                ? "Språkkafé para hoy"
                : activities.length === 1
                  ? "Actividad disponible"
                  : "Todos los Språkkafé"}
            </h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              {results.length} {results.length === 1 ? "actividad" : "actividades"}
            </span>
          </div>

          {activities.length <= 1 && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
              <p className="font-semibold">Programación especial de verano</p>
              <p className="mt-1">
                Muchas organizaciones hacen una pausa durante julio y retomarán sus actividades en agosto.
                Por ahora tenemos una actividad confirmada y actualizamos la información cada semana.
              </p>
            </div>
          )}

          {results.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-500">No hay actividades que coincidan.</p>
              <button
                type="button"
                onClick={() => handleSelectCategory("all")}
                className="mt-3 text-xs font-bold text-blue-600 underline min-h-[44px]"
              >
                Ver todas las actividades
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
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <MissionSection activityCount={activities.length} />
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
