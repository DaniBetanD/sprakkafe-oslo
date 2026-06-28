import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Globe, MapPin, Calendar, Award, Coffee, Users, Sparkles, ChevronDown } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import MobileDetailPanel from "../components/MobileDetailPanel";
import { DAYS, LEVELS } from "../utils/translations";

export default function Home() {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        district: "",
        day: "",
        level: "",
        organization: ""
    });
    const [selected, setSelected] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    function getOrganization(id) {
        return organizations.find(org => org.id === id);
    }

    const results = activities.filter(activity => {
        const org = getOrganization(activity.organizationId);
        const text = (
            activity.name +
            org?.name +
            activity.district +
            activity.level
        ).toLowerCase();

        const matchesSearch = text.includes(query.toLowerCase());
        const matchesDistrict = !filters.district || activity.district === filters.district;
        const matchesDay = !filters.day || activity.day === filters.day;
        const matchesLevel = !filters.level || activity.level === filters.level;
        const matchesOrg = !filters.organization || activity.organizationId === filters.organization;

        return matchesSearch && matchesDistrict && matchesDay && matchesLevel && matchesOrg;
    });

    const selectedOrg = selected ? getOrganization(selected.organizationId) : null;

    const totalActivities = activities.length;
    const totalOrganizations = new Set(activities.map(a => a.organizationId)).size;
    const totalDistricts = new Set(activities.map(a => a.district)).size;

    const activeFilters = Object.values(filters).filter(v => v !== "").length;

    return (
        // En Home.jsx, en lugar de usar el div con min-h-screen
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col max-w-7xl mx-auto border-x border-gray-200">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                    </div>

                    <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4 md:mb-6">
                                <Sparkles size={16} className="text-yellow-300" />
                                <span>Tu guía para encontrar språkkafé en Oslo</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
                                Encuentra tu <span className="text-yellow-300 block md:inline">Språkkafé</span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8">
                                Practica noruego y conecta con personas en Oslo.
                            </p>

                            <div className="hidden md:flex justify-center gap-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <div className="text-2xl font-bold">{totalActivities}</div>
                                    <div className="text-sm text-blue-200">Actividades</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <div className="text-2xl font-bold">{totalOrganizations}</div>
                                    <div className="text-sm text-blue-200">Organizaciones</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <div className="text-2xl font-bold">{totalDistricts}</div>
                                    <div className="text-sm text-blue-200">Distritos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Búsqueda y filtros */}
                <section className="max-w-5xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 relative z-10">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-100 p-4 md:p-6">
                        <SearchBar onSearch={setQuery} />

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden w-full mt-3 flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                        >
                            <span className="flex items-center gap-2">
                                Filtros
                                {activeFilters > 0 && (
                                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {activeFilters}
                                    </span>
                                )}
                            </span>
                            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
                            <Filters
                                filters={filters}
                                setFilters={setFilters}
                                activities={activities}
                            />
                        </div>
                    </div>
                </section>

                {/* Resultados */}
                <section className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-6">
                        <div>
                            <h2 className="font-bold text-xl md:text-2xl text-gray-900">Actividades disponibles</h2>
                            {results.length > 0 && (
                                <p className="text-sm text-gray-500 hidden sm:block">
                                    {results.length} actividad{results.length > 1 ? 'es' : ''} encontrada{results.length > 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                        <span className="bg-blue-50 text-blue-700 text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                            {results.length} resultados
                        </span>
                    </div>

                    {results.length === 0 ? (
                        <div className="text-center py-12 md:py-16">
                            <div className="text-4xl md:text-6xl mb-4">🔍</div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No hay resultados</h3>
                            <p className="text-sm md:text-base text-gray-500">Prueba con otros filtros o busca algo diferente</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid de tarjetas */}
                            <div className={`grid gap-3 md:gap-4 transition-all duration-300 ${selected
                                ? "hidden md:grid md:grid-cols-1 md:w-[45%] md:shrink-0 md:block"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
                                }`}>
                                {results.map(activity => (
                                    <ActivityCard
                                        key={activity.id}
                                        activity={activity}
                                        organization={getOrganization(activity.organizationId)}
                                        onClick={() => setSelected(
                                            selected?.id === activity.id ? null : activity
                                        )}
                                        isSelected={selected?.id === activity.id}
                                    />
                                ))}
                            </div>

                            {/* Panel desktop (visible solo en md+) */}
                            {selected && (
                                <div className="hidden md:block flex-1 bg-white rounded-xl border border-gray-200 shadow-lg p-6 h-fit sticky top-6 space-y-5">
                                    {/* ... contenido del panel desktop (igual que antes) ... */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                            {selectedOrg?.logoImg ? (
                                                <img
                                                    src={new URL(`../assets/logos/${selectedOrg.logoImg}`, import.meta.url).href}
                                                    alt={selectedOrg.name}
                                                    className="w-full h-full object-contain p-1"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.textContent = selectedOrg?.logo || '🏛️';
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-2xl">{selectedOrg?.logo || '🏛️'}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 leading-tight truncate">
                                                {selected.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 truncate">
                                                {selectedOrg?.name}
                                            </p>
                                        </div>
                                        <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <hr />

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg p-3">
                                            <MapPin size={16} className="text-blue-500" />
                                            <span>{selected.district}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg p-3">
                                            <Calendar size={16} className="text-blue-500" />
                                            <span>{DAYS[selected.day]} · {selected.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg p-3">
                                            <Award size={16} className="text-blue-500" />
                                            <span>{LEVELS[selected.level]}</span>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="flex flex-col gap-2">
                                        <Link to={`/activity/${selected.id}`} className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700 transition">
                                            Ver página completa <ArrowRight size={15} />
                                        </Link>
                                        <Link to={`/organization/${selectedOrg?.id}`} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition">
                                            Ver organización
                                        </Link>
                                        {selectedOrg?.website && (
                                            <a href={selectedOrg.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-500 text-sm px-4 py-2 rounded-xl hover:text-gray-700 transition">
                                                <Globe size={14} /> Sitio web oficial
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Panel móvil (visible solo en móvil) */}
                            <MobileDetailPanel
                                selected={selected}
                                selectedOrg={selectedOrg}
                                onClose={() => setSelected(null)}
                            />
                        </>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}