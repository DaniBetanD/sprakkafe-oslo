import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Globe, MapPin, Calendar } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import MobileDetailPanel from "../components/MobileDetailPanel";
import { DAYS, LEVELS } from "../utils/translations";

// Mapeo centralizado de colores para los niveles
const LEVEL_COLORS = {
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function Home() {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        district: "",
        day: "",
        level: "",
        organization: ""
    });
    const [selected, setSelected] = useState(null);

    function getOrganization(id) {
        return organizations.find(org => org.id === id);
    }

    const results = activities.filter(activity => {
        const org = getOrganization(activity.organizationId);
        const text = (
            activity.name +
            (org?.name || "") +
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-14 pb-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-white">
                            Encuentra tu <span className="text-yellow-200">Språkkafé</span>
                        </h1>
                        <p className="mt-5 text-lg text-blue-100 text-center max-w-3xl mx-auto leading-relaxed">
                            Practica noruego en un entorno real, conoce gente y descubre la cultura de Oslo.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                                📍 En toda Oslo
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                                🤝 Comunidad
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                                🇳🇴 Cultura local
                            </span>
                        </div>
                    </div>
                </section>

                {/* Búsqueda */}
                <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <SearchBar onSearch={setQuery} />
                        <div className="mt-4 pb-4"> 
                            <Filters
                                filters={filters}
                                setFilters={setFilters}
                                activities={activities}
                            />
                        </div>
                    </div>
                </section>

                {/* Resultados */}
                <section className="max-w-5xl mx-auto px-6 py-10">
                    <div className="flex justify-between mb-6">
                        <h2 className="font-bold text-2xl text-gray-900">Actividades disponibles</h2>
                        <span className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full">
                            {results.length} resultados
                        </span>
                    </div>

                    {results.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500">No hay resultados</p>
                        </div>
                    ) : (
                        <div className="flex gap-6">
                            <div className={`grid gap-4 transition-all duration-300 ${
                                selected
                                    ? "grid-cols-1 w-full md:w-[45%] md:shrink-0"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
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

                            {/* Panel desktop */}
                            {selected && (
                                <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit sticky top-6 gap-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                                {selectedOrg?.logoImg ? (
                                                    <img
                                                        src={new URL(`../assets/logos/${selectedOrg.logoImg}`, import.meta.url).href}
                                                        alt={selectedOrg?.name || "Logo"}
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
                                        <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition">
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Contenido (Descripción, Día/Hora/Nivel y Ubicación) */}
                                    <div className="space-y-5">
                                        {selected.description && (
                                            <div className="rounded-xl bg-blue-50/40 p-4">
                                                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                                                    {selected.description}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar size={15} className="text-blue-500 shrink-0" />
                                                <span>{DAYS[selected.day]}, {selected.time}</span>
                                            </div>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${LEVEL_COLORS[selected.level] || "bg-gray-100 text-gray-600"}`}>
                                                {LEVELS[selected.level] || selected.level}
                                            </span>
                                        </div>

                                        {selected.address && (
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address + ', Oslo')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group"
                                            >
                                                <MapPin size={15} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
                                                <span className="truncate">
                                                    {selected.district} — {selected.address}
                                                </span>                                            
                                            </a>
                                        )}
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex flex-col gap-2 pt-5">
                                        <Link
                                            to={`/activity/${selected.id}`}
                                            className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700 transition"
                                        >
                                            Ver página completa <ArrowRight size={15} />
                                        </Link>
                                        <Link
                                            to={`/organization/${selectedOrg?.id}`}
                                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition"
                                        >
                                            Ver organización
                                        </Link>
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
                    )}
                </section>
            </main>

            {/* Panel móvil */}
            <MobileDetailPanel
                selected={selected}
                selectedOrg={selectedOrg}
                onClose={() => setSelected(null)}
            />

            <Footer />
        </div>
    );
}