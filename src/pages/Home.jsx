import { useState, useEffect, useRef } from "react";
import {
  X, ArrowRight, Globe, MapPin, Calendar,
  ChevronLeft, ChevronRight,
  CalendarDays, Coffee, Users, MessageCircle
} from "lucide-react";

import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileDetailPanel from "../components/MobileDetailPanel";
import { DAYS, LEVELS } from "../utils/translations";
import { scrollToId } from "../utils/scrollTo";

// Detectar día actual en inglés (coincide con activities.json)
const JS_DAY_TO_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const LEVEL_COLORS = {
  "A1": "bg-green-100 text-green-700",
  "A2": "bg-blue-100 text-blue-700",
  "B1": "bg-purple-100 text-purple-700",
  "B2": "bg-orange-100 text-orange-700",
};

function isFamilyActivity(activity) {
  const searchableText = `${activity.name} ${activity.description || ""}`.toLowerCase();
  return searchableText.includes("famil") || searchableText.includes("niño") || searchableText.includes("barn");
}

// ─── Carrusel horizontal ─────────────────────────────────────────────────────
function HorizontalCarousel({ children }) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scrollBy = (amount) => {
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative group w-full">
      {showLeft && (
        <button
          type="button"
          aria-label="Ver actividades anteriores"
          onClick={() => scrollBy(-260)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {showRight && (
        <button
          type="button"
          aria-label="Ver actividades siguientes"
          onClick={() => scrollBy(260)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Categorías ──────────────────────────────────────────────────────────────
function CategorySection({ activeCategory, onSelectCategory, todayCount, familyCount }) {
  const categories = [
    {
      id: "today",
      icon: <CalendarDays size={22} />,
      title: "Para hoy",
      description: "Actividades que se celebran hoy mismo.",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      available: todayCount > 0,
    },
    {
      id: "families",
      icon: <Users size={22} />,
      title: "Familias",
      description: "Ambientes adaptados para niños y padres.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      available: familyCount > 0,
    },
    {
      id: "all",
      icon: <Coffee size={22} />,
      title: "Todos",
      description: "Listado completo de actividades en Oslo.",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      available: true,
    },
  ].filter((category) => category.available);

  const renderCard = (category) => {
    const isSelected = activeCategory === category.id;
    return (
      <button
        key={category.id}
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelectCategory(category.id)}
        className={`w-full rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 min-h-[130px] flex flex-col justify-between
          bg-white hover:shadow-md cursor-pointer active:scale-[0.98]
          ${isSelected ? "ring-2 ring-blue-600 border-transparent" : "border-gray-100"}`}
      >
        <div>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border ${category.color}`}>
            {category.icon}
          </div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            {category.title}
            {category.id === "today" && todayCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                {todayCount}
              </span>
            )}
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{category.description}</p>
        </div>
      </button>
    );
  };

  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Explora por intereses</h2>
        <p className="mt-1 text-gray-500 text-xs md:text-sm">Selecciona una categoría para filtrar las actividades.</p>
      </div>
      {/* Móvil: carrusel */}
      <div className="block sm:hidden mt-4">
        <HorizontalCarousel>
          {categories.map((cat) => (
            <div key={cat.id} className="min-w-[190px] max-w-[210px] snap-center p-1">
              {renderCard(cat)}
            </div>
          ))}
        </HorizontalCarousel>
      </div>
      {/* Desktop: grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {categories.map((cat) => renderCard(cat))}
      </div>
    </div>
  );
}

// ─── Actividades recomendadas ─────────────────────────────────────────────────
function RecommendedActivities({ activities, getOrganization, setSelected, selected }) {
  const todayIndex = new Date().getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;

  const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const sorted = [...activities].sort((a, b) => {
    const iA = dayOrder.indexOf(a.day);
    const iB = dayOrder.indexOf(b.day);
    const dA = (iA - tomorrowIndex + 7) % 7;
    const dB = (iB - tomorrowIndex + 7) % 7;
    if (dA === dB) return a.time.localeCompare(b.time);
    return dA - dB;
  });

  const featured = sorted.slice(0, 5);

  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Actividades recomendadas</h2>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Las más próximas esta semana.</p>
      </div>
      <HorizontalCarousel>
        {featured.map((activity) => (
          <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] snap-center p-1">
            <ActivityCard
              activity={activity}
              organization={getOrganization(activity.organizationId)}
              onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
              isSelected={selected?.id === activity.id}
            />
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
}

// ─── Sección misión ───────────────────────────────────────────────────────────
function MissionSection() {
  const cards = [
    {
      icon: <Users size={22} />,
      title: "Practica con confianza",
      description: "Aprender puede imponer respeto. Practicar en un entorno seguro y relajado ayuda a soltarte hasta que hablar sea algo natural.",
    },
    {
      icon: <Globe size={22} />,
      title: "Descubre la cultura",
      description: "Cada conversación es una ventana directa a las costumbres locales, el humor noruego y los modismos de uso diario.",
    },
    {
      icon: <MessageCircle size={22} />,
      title: "Conecta con personas",
      description: "Supera el aislamiento inicial. Genera una red genuina de personas de múltiples orígenes compartiendo un café caliente.",
    },
  ];

  return (
    <div id="proyecto" className="py-2">
      <div className="mx-auto max-w-3xl text-center mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Sentirse parte de Noruega
        </h2>
        <p className="mt-2 text-xs md:text-base leading-relaxed text-gray-500">
          Dominar un idioma es mucho más que memorizar palabras. Es conversar, reír con otros y
          comprender la vida cotidiana de verdad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 border border-blue-100">
              {card.icon}
            </div>
            <h3 className="font-semibold text-base text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>

    <div id="proyecto" className="py-2"></div>
      <div className="mx-auto max-w-3xl text-center mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Nuestra misión
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 p-5 md:p-6 shadow-sm">
          <p className="text-sm md:text-base font-semibold leading-relaxed text-gray-800">
            Ayudamos a las personas a sentirse parte de Noruega a través del idioma, la comunidad y la cultura.
          </p>
          <p className="mt-2 text-xs md:text-base leading-relaxed text-gray-500">
            Reunimos en un solo lugar actividades gratuitas organizadas por bibliotecas, organizaciones y
            centros comunitarios — Språkkafé, Norsktrening, cafés de conversación, grupos de mujeres y
            otras iniciativas donde practicar noruego en un entorno seguro y acogedor.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 text-center shadow-md">
        <h3 className="text-xl md:text-2xl font-bold text-white">¿Listo para empezar?</h3>
        <p className="mt-2 text-blue-100 text-xs md:text-sm max-w-md mx-auto">
          Encuentra tu próximo grupo de conversación hoy mismo, de forma totalmente gratuita.
        </p>
        <button
          type="button"
          onClick={() => scrollToId("actividades")}
          className="mt-4 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition min-h-[44px] text-sm"
        >
          Ver todos los Språkkafé →
        </button>
      </div>
    </div>
  );
}

// ─── Home principal ───────────────────────────────────────────────────────────
export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({ district: "", day: "", level: "", organization: "" });
  const [selected, setSelected] = useState(null);

  function getOrganization(id) {
    return organizations.find((org) => org.id === id);
  }

  const todayEnglish = JS_DAY_TO_EN[new Date().getDay()];
  const todayCount = activities.filter((a) => a.day === todayEnglish).length;
  const familyCount = activities.filter(isFamilyActivity).length;
  const showCategories = todayCount > 0 || familyCount > 0;
  const showRecommendations = activities.length >= 4;

  const results = activities.filter((activity) => {
    const org = getOrganization(activity.organizationId);
    const text = (activity.name + (org?.name || "") + activity.district + activity.level).toLowerCase();

    const matchesSearch = text.includes(query.toLowerCase());
    const matchesDistrict = !filters.district || activity.district === filters.district;
    const matchesDay = !filters.day || activity.day === filters.day;
    const matchesLevel = !filters.level || activity.level === filters.level;
    const matchesOrg = !filters.organization || activity.organizationId === filters.organization;

    let matchesCategory = true;
    if (activeCategory === "today") matchesCategory = activity.day === todayEnglish;
    if (activeCategory === "families") matchesCategory = isFamilyActivity(activity);

    return matchesSearch && matchesDistrict && matchesDay && matchesLevel && matchesOrg && matchesCategory;
  });

  const selectedOrg = selected ? getOrganization(selected.organizationId) : null;

  function handleSelectCategory(categoryId) {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setFilters({ district: "", day: "", level: "", organization: "" });
    }
    scrollToId("actividades");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow space-y-10 md:space-y-16 pb-12">

        {/* Hero */}
        <section id="hero" className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 pb-20">
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

        {/* Buscador flotante */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 relative z-10 w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
            <SearchBar onSearch={setQuery} />
            <div className="mt-3">
              <Filters filters={filters} setFilters={setFilters} activities={activities} />
            </div>
          </div>
        </section>

        {/* Categorías */}
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

        {/* Actividades recomendadas */}
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

        {/* Directorio completo */}
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
              {/* Móvil: carrusel */}
              <div className="block md:hidden w-full">
                <HorizontalCarousel>
                  {results.map((activity) => (
                    <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] max-w-[85vw] snap-center p-1">
                      <ActivityCard
                        activity={activity}
                        organization={getOrganization(activity.organizationId)}
                        onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
                        isSelected={selected?.id === activity.id}
                      />
                    </div>
                  ))}
                </HorizontalCarousel>
              </div>

              {/* Desktop: grid + panel lateral */}
              <div className="hidden md:flex gap-6">
                <div className={`grid gap-4 transition-all duration-300 ${
                  selected ? "grid-cols-1 w-[45%] shrink-0" : "grid-cols-2 lg:grid-cols-3 w-full"
                }`}>
                  {results.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      organization={getOrganization(activity.organizationId)}
                      onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
                      isSelected={selected?.id === activity.id}
                    />
                  ))}
                </div>

                {/* Panel lateral desktop */}
                {selected && (
                  <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit sticky top-20 gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                          {selectedOrg?.logoImg ? (
                            <img
                              src={new URL(`../assets/logos/${selectedOrg.logoImg}`, import.meta.url).href}
                              alt={selectedOrg.name}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-xl">{selectedOrg?.logo}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{selected.name}</h3>
                          <p className="text-sm text-gray-500">{selectedOrg?.name}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        aria-label="Cerrar detalles de la actividad"
                        className="text-gray-400 hover:text-gray-600 transition min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="space-y-3">
                      {selected.description && (
                        <div className="rounded-xl bg-blue-50/40 p-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={15} className="text-blue-500 shrink-0" />
                          <span>{DAYS[selected.day]}, {selected.time}</span>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${LEVEL_COLORS[selected.level] || "bg-gray-100 text-gray-600"}`}>
                          {LEVELS[selected.level]}
                        </span>
                      </div>

                      {selected.address && (
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(selected.address + ', Oslo')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group"
                        >
                          <MapPin size={15} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
                          <span className="truncate">{selected.address}</span>
                        </a>
                      )}

                      {selectedOrg?.description && (
                        <>
                          <hr className="border-gray-100" />
                          <div>
                            <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-1">
                              🏛️ Sobre la organización
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{selectedOrg.description}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href={`/activity/${selected.id}`}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700 transition min-h-[44px]"
                      >
                        Ver página completa <ArrowRight size={15} />
                      </a>
                      <a
                        href={`/organization/${selectedOrg?.id}`}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition min-h-[44px]"
                      >
                        Ver organización
                      </a>
                      {selectedOrg?.website && (
                        <a
                          href={selectedOrg.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-gray-500 text-sm px-4 py-2 rounded-xl hover:text-gray-700 transition"
                        >
                          <Globe size={14} /> Sitio web oficial
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Misión */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 w-full">
          <MissionSection />
        </section>

      </main>

      <MobileDetailPanel
        selected={selected}
        selectedOrg={selectedOrg}
        onClose={() => setSelected(null)}
      />

      <Footer />
    </div>
  );
}
