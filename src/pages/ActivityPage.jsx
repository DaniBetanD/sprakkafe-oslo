import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Award, ExternalLink, Globe } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import { DAYS, LEVELS } from "../utils/translations";

export default function ActivityPage() {
    const { id } = useParams();

    // 1. Buscar la actividad por el ID que viene en la URL
    const activity = activities.find((act) => act.id === id);

    // 2. Si no existe la actividad (o se escribe mal la URL), vista de error limpia
    if (!activity) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Actividad no encontrada</h1>
                    <p className="text-gray-600">Lo sentimos, la actividad que buscas no existe o ha sido modificada.</p>
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                        <ArrowLeft size={16} /> Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    // 3. Buscar la organización vinculada usando el organizationId del nuevo modelo
    const organization = organizations.find((org) => org.id === activity.organizationId) || {
        id: activity.organizationId,
        name: activity.organizationId,
        website: "#",
        description: "Información de la organización no disponible de forma local."
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
            {/* Barra de navegación móvil-friendly */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition">
                        <ArrowLeft size={18} />
                        <span>Volver al directorio</span>
                    </Link>
                </div>
            </div>

            {/* Contenedor Principal (Bloque centralizado tipo lista pública) */}
            <main className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

                {/* Bloque 1: Tarjeta de Información de la Actividad */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${organization?.verified
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            <Award size={12} /> {organization?.verified ? "Verificado oficial" : "En pausa"}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            {activity.name}
                        </h1>
                        <p className="text-lg text-gray-600">
                            Organizado por:{" "}
                            <Link to={`/organization/${organization.id}`} className="text-blue-600 hover:underline font-medium">
                                {organization.name}
                            </Link>
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Fichas de Datos Clave (Grid responsivo lineal) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Calendar className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Días</h3>
                                <p className="text-gray-600">{DAYS[activity.day]}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Clock className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Horario</h3>
                                <p className="text-gray-600">{activity.time}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <MapPin className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Barrio / Distrito</h3>
                                <p className="text-gray-600">{activity.district}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Award className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Nivel de Noruego</h3>
                                <p className="text-gray-600">{LEVELS[activity.level]}</p>
                            </div>

                            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <MapPin className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Dirección</h3>
                                    <p className="text-gray-600">{activity.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descripción dinámica opcional */}
                    {activity.description && (
                        <div className="space-y-2 pt-2">
                            <h2 className="text-lg font-semibold text-gray-900">Sobre este Språkkafé</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {activity.description}
                            </p>
                        </div>
                    )}
                </section>

                {/* Bloque 2: Información Relacional de la Organización */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Sobre la entidad organizadora</h2>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-blue-600">{organization.name}</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {organization.description || "Esta entidad organiza eventos de intercambio y café de idiomas gratuito en la ciudad de Oslo para apoyar la integración comunitaria."}
                        </p>

                        <div className="pt-2 flex flex-wrap gap-3">
                            <a
                                href={organization.website || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition"
                            >
                                <Globe size={16} /> Sitio Web Oficial <ExternalLink size={14} />
                            </a>
                            <Link
                                to={`/organization/${organization.id}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                                Ver todas sus actividades
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}