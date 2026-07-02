import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Award, Globe, ExternalLink, Mail, Phone } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import { DAYS, LEVELS } from "../utils/translations";

export default function ActivityPage() {
    const { id } = useParams();
    const activity = activities.find(a => a.id === id);
    const organization = activity ? organizations.find(org => org.id === activity.organizationId) : null;

    if (!activity) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Actividad no encontrada</h2>
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                        <ArrowLeft size={16} /> Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const otherActivities = activities.filter(
        a => a.organizationId === activity.organizationId && a.id !== activity.id
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12">

            {/* Nav */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition">
                        <ArrowLeft size={18} />
                        <span>Volver al directorio</span>
                    </Link>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 mt-6 space-y-6">

                {/* Bloque actividad */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">

                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                            {organization?.logoImg ? (
                                <img
                                    src={new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href}
                                    alt={organization.name}
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="text-3xl">{organization?.logo}</span>
                            )}
                        </div>
                        <div className="flex-1 space-y-1">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                                organization?.verified
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}>
                                <Award size={12} /> {organization?.verified ? "Verificado oficial" : "En pausa"}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                {activity.name}
                            </h1>
                            <p className="text-gray-500">
                                Organizado por{" "}
                                <Link to={`/organization/${organization?.id}`} className="text-blue-600 hover:underline font-medium">
                                    {organization?.name}
                                </Link>
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Fichas de datos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Calendar className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Día</h3>
                                <p className="text-gray-600">{DAYS[activity.day]}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Calendar className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Horario</h3>
                                <p className="text-gray-600">{activity.time}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <MapPin className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Barrio</h3>
                                <p className="text-gray-600">{activity.district}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Award className="text-blue-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-700">Nivel</h3>
                                <p className="text-gray-600">{LEVELS[activity.level]}</p>
                            </div>
                        </div>

                        {activity.address && (
                           <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 sm:col-span-2">
    <MapPin className="text-blue-600 shrink-0 mt-0.5" size={20} />
    <div className="flex-1">
        <h3 className="font-semibold text-gray-700">Dirección</h3>
        <p className="text-gray-600">{activity.address}</p>
        <a
            href={`https://maps.google.com/?q=${encodeURIComponent(activity.address + ', Oslo')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
            <MapPin size={14} /> Ver en mapa →
        </a>
    </div>
</div>
                        )}
                    </div>

                    {activity.description && (
                        <div className="space-y-2 pt-2">
                            <h2 className="text-lg font-semibold text-gray-900">Sobre este Språkkafé</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {activity.description}
                            </p>
                        </div>
                    )}
                </section>

                {/* Bloque organización */}
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
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition"
                            >
                                <Globe size={16} /> Sitio Web Oficial <ExternalLink size={14} />
                            </a>
                        )}
                        {organization?.email && (
                            <a
                                href={`mailto:${organization.email}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                                <Mail size={16} /> Contacto
                            </a>
                        )}
                        {organization?.phone && (
                            <a
                                href={`tel:${organization.phone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                                <Phone size={16} /> {organization.phone}
                            </a>
                        )}
                        <Link
                            to={`/organization/${organization?.id}`}
                            className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
                        >
                            Ver perfil completo
                        </Link>
                    </div>
                </section>

                {/* Otras actividades de la misma org */}
                {otherActivities.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-gray-900">
                            Más actividades de {organization?.name}
                        </h2>
                        {otherActivities.map(a => (
                            <Link
                                key={a.id}
                                to={`/activity/${a.id}`}
                                className="block bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                <p className="text-sm text-gray-500">
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