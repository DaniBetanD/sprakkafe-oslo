import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Award, Globe } from "lucide-react";
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
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Actividad no encontrada</h2>
                    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft size={20} /> Volver
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-4 mb-6">
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
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{activity.name}</h1>
                            <p className="text-gray-500">{organization?.name}</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-600">
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-blue-500" />
                            <span>{activity.district} — {activity.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-blue-500" />
                            <span>{DAYS[activity.day]} · {activity.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award size={18} className="text-blue-500" />
                            <span>{LEVELS[activity.level]}</span>
                        </div>
                    </div>

                    {activity.description && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
                            <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                        </div>
                    )}

                    {organization?.website && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <a
                                href={organization.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                                <Globe size={18} /> Visitar sitio web
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}