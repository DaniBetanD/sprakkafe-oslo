import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Globe, ExternalLink, Mail, Phone } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import FirstTimeCard from "../components/FirstTimeCard";
import WhatActivityForMe from "../components/WhatActivityForMe";
import { DAYS, LEVELS } from "../utils/translations";

const LEVEL_COLORS = {
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function ActivityPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const activity = activities.find(a => String(a.id) === String(id));
    const organization = activity ? organizations.find(org => String(org.id) === String(activity.organizationId)) : null;

    // Recuperamos los filtros del buscador para volver atrás sin perder el contexto
    const previousSearch = location.state?.fromSearch ? `/?${location.state.fromSearch}` : "/";

    if (!activity) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Actividad no encontrada</h2>
                    <button 
                        onClick={() => navigate("/")} 
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium min-h-[44px]"
                    >
                        <ArrowLeft size={16} /> Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const otherActivities = activities.filter(
        a => String(a.organizationId) === String(activity.organizationId) && String(a.id) !== String(activity.id)
    );

    const mapsUrl = activity.address
        ? `https://maps.google.com/?q=${encodeURIComponent(activity.address + ', Oslo')}`
        : null;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Nav Cabecera Limpia */}
            <div className="bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
                    <button 
                        onClick={() => navigate(previousSearch)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition group min-h-[44px] px-2 rounded-xl active:scale-95"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        <span>Actividades</span>
                    </button>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 mt-6 space-y-6">
                {/* Block Detalle Actividad */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                            {organization?.logoImg ? (
                                <img
                                    src={new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href}
                                    alt={organization.name}
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="text-2xl">{organization?.logo || "🏢"}</span>
                            )}
                        </div>
                        <div>
                            <Link
                                to={`/organization/${organization?.id}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition min-h-[44px] flex items-center"
                            >
                                {organization?.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5">
                                {organization?.verified ? (
                                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                        ✓ Verificado
                                    </span>
                                ) : (
                                    <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                                        En pausa
                                    </span>
                                )}
                                {organization?.tipo && (
                                    <span className="text-xs text-gray-400">{organization.tipo}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            {activity.name}
                        </h1>
                    </div>

                    {activity.description && (
                        <p className="text-gray-600 leading-relaxed text-base">
                            {activity.description}
                        </p>
                    )}

                    <hr className="border-gray-100" />

                    <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">
                            <Calendar size={15} className="text-blue-500" />
                            {DAYS[activity.day]} · {activity.time}
                        </div>

                        {mapsUrl ? (
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700 hover:text-blue-600 hover:border-blue-200 transition min-h-[44px]"
                            >
                                <MapPin size={15} className="text-blue-500" />
                                {activity.district}
                            </a>
                        ) : (
                            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">
                                <MapPin size={15} className="text-blue-500" />
                                {activity.district}
                            </div>
                        )}

                        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${LEVEL_COLORS[activity.level] || "bg-gray-100 text-gray-600"}`}>
                            {LEVELS[activity.level]}
                        </span>
                    </div>

                    {mapsUrl && (
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group min-h-[44px]"
                        >
                            <MapPin size={14} className="text-blue-400 group-hover:text-blue-600 shrink-0" />
                            <span>{activity.address} · Ver en mapa →</span>
                        </a>
                    )}
                </section>

                <FirstTimeCard />
                <WhatActivityForMe />

                {/* Sobre la entidad */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Sobre la entidad organizadora</h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {organization?.description || "Esta entidad organiza eventos de intercambio y café de idiomas gratuito en Oslo."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {organization?.website && (
                            <a
                                href={organization.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition min-h-[44px]"
                            >
                                <Globe size={16} /> Sitio Web Oficial <ExternalLink size={14} />
                            </a>
                        )}
                        {organization?.email && (
                            <a
                                href={`mailto:${organization.email}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                            >
                                <Mail size={16} /> Contacto
                            </a>
                        )}
                        {organization?.phone && (
                            <a
                                href={`tel:${organization.phone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                            >
                                <Phone size={16} /> {organization.phone}
                            </a>
                        )}
                        <Link
                            to={`/organization/${organization?.id}`}
                            className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                        >
                            Ver perfil completo
                        </Link>
                    </div>
                </section>

                {/* Otras actividades */}
                {otherActivities.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-gray-900">
                            Más actividades de {organization?.name}
                        </h2>
                        {otherActivities.map(a => (
                            <Link
                                key={a.id}
                                to={`/activity/${a.id}`}
                                state={{ fromSearch: location.state?.fromSearch }}
                                className="block bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {DAYS[a.day]} · {a.time} · {a.district} · {LEVELS[a.level]}
                                </p>
                            </Link>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}