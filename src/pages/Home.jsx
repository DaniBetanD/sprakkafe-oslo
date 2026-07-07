import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Datos y Componentes
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import MobileDetailPanel from "../components/MobileDetailPanel";
import AboutSection from "../components/AboutSection"; 
import CommunityCTA from "../components/CommunityCTA"; 

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Sincronización de estados locales con los Search Parameters de la URL
    const query = searchParams.get("search") || "";
    const filters = useMemo(() => ({
        district: searchParams.get("district") || "",
        day: searchParams.get("day") || "",
        level: searchParams.get("level") || "",
        organization: searchParams.get("organization") || ""
    }), [searchParams]);

    const selectedId = searchParams.get("selected") || null;

    // Manejadores de cambios que actualizan directamente la URL
    const setQuery = (newQuery) => {
        const nextParams = new URLSearchParams(searchParams);
        if (newQuery) {
            nextParams.set("search", newQuery);
        } else {
            nextParams.delete("search");
        }
        setSearchParams(nextParams);
    };

    const setFilters = (updater) => {
        const nextFilters = typeof updater === "function" ? updater(filters) : updater;
        const nextParams = new URLSearchParams(searchParams);
        
        Object.entries(nextFilters).forEach(([key, value]) => {
            if (value) {
                nextParams.set(key, value);
            } else {
                nextParams.delete(key);
            }
        });
        setSearchParams(nextParams);
    };

    const setSelected = (activity) => {
        const nextParams = new URLSearchParams(searchParams);
        if (activity?.id) {
            nextParams.set("selected", activity.id);
        } else {
            nextParams.delete("selected");
        }
        setSearchParams(nextParams);
    };

    // Mapeo optimizado de organizaciones
    const organizationsMap = useMemo(() => {
        return organizations.reduce((acc, org) => {
            acc[String(org.id)] = org;
            return acc;
        }, {});
    }, []);

    // Filtrado robusto y optimizado paso a paso
    const filteredResults = useMemo(() => {
        const lowerQuery = query.toLowerCase().trim();
        return activities.filter(activity => {
            const org = organizationsMap[String(activity.organizationId)];
            
            const matchesQuery = !lowerQuery || 
                activity.name.toLowerCase().includes(lowerQuery) ||
                (org?.name && org.name.toLowerCase().includes(lowerQuery)) ||
                activity.district.toLowerCase().includes(lowerQuery);

            return matchesQuery &&
                (!filters.district || activity.district === filters.district) &&
                (!filters.day || activity.day === filters.day) &&
                (!filters.level || activity.level === filters.level) &&
                (!filters.organization || String(activity.organizationId) === String(filters.organization));
        });
    }, [query, filters, organizationsMap]);

    // Encontrar la actividad seleccionada para el panel móvil
    const selectedActivity = useMemo(() => {
        return activities.find(a => String(a.id) === String(selectedId)) || null;
    }, [selectedId]);

    const selectedOrg = selectedActivity ? organizationsMap[String(selectedActivity.organizationId)] : null;

    const triggerJoinModal = () => {
        window.dispatchEvent(new CustomEvent("open-subscription-modal"));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 pb-20">
                    <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Practica tu noruego en Oslo
                        </h1>
                        <p className="text-blue-100 max-w-2xl mx-auto text-lg font-medium">
                            Encuentra cafés de idiomas (språkkafé) y actividades gratuitas organizadas por municipios y ONGs.
                        </p>
                    </div>
                </section>

                {/* Búsqueda y Filtros */}
                <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 w-full">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                        <SearchBar value={query} onSearch={setQuery} />
                        <div className="mt-4 pb-4"> 
                            <Filters filters={filters} setFilters={setFilters} activities={activities} />
                        </div>
                    </div>
                </section>

                {/* Sección de Resultados */}
                <section id="actividades" className="max-w-5xl mx-auto px-6 py-10 w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Actividades disponibles ({filteredResults.length})
                        </h2>
                    </div>

                    {filteredResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResults.map((activity) => (
                                <ActivityCard
                                    key={activity.id}
                                    activity={activity}
                                    organization={organizationsMap[String(activity.organizationId)]}
                                    onClick={() => setSelected(activity)}
                                    searchContext={searchParams.toString()}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <span className="text-3xl">🔍</span>
                            <h3 className="mt-2 font-semibold text-gray-900">No hay resultados</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Intenta cambiando los términos de búsqueda o limpiando los filtros.
                            </p>
                        </div>
                    )}
                </section>

                {/* Sección "Sobre el proyecto" */}
                <section id="proyecto" className="py-16 md:py-24 bg-gray-50/50 border-t border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-6">
                        <AboutSection />
                    </div>
                </section>

                {/* CTA Final */}
                <div className="max-w-5xl mx-auto px-6 py-12 w-full">
                    <CommunityCTA onClick={triggerJoinModal} />
                </div>
            </main>

            <MobileDetailPanel
                selected={selectedActivity}
                selectedOrg={selectedOrg}
                onClose={() => setSelected(null)}
            />
            
            <Footer />
        </div>
    );
}