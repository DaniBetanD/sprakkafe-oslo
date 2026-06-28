import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Mail, Phone } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";
import organizations from "../data/organizations.json";
import activities from "../data/activities.json";

export default function OrganizationPage() {

    const { id } = useParams();

    const organization = organizations.find(o => o.id === id);
    const orgActivities = activities.filter(a => a.organizationId === id);

    if (!organization) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Organización no encontrada</h1>
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                        <ArrowLeft size={16} /> Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">

            {/* Nav */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition">
                        <ArrowLeft size={18} /> Volver al directorio
                    </Link>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

                {/* Info organización */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                            {organization.logoImg ? (
                                <img
                                    src={new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href}
                                    alt={organization.name}
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="text-2xl">{organization.logo}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
                            <span className="text-sm text-gray-500">{organization.tipo}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{organization.description}</p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {organization.website && (
                            <a href={organization.website} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition">
                                <Globe size={16} /> Sitio web
                            </a>
                        )}
                        {organization.email && (
                            <a href={`mailto:${organization.email}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition">
                                <Mail size={16} /> {organization.email}
                            </a>
                        )}
                        {organization.phone && (
                            <a href={`tel:${organization.phone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition">
                                <Phone size={16} /> {organization.phone}
                            </a>
                        )}
                    </div>
                </section>

                {/* Actividades */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Actividades ({orgActivities.length})
                    </h2>

                    {orgActivities.length === 0 ? (
                        <p className="text-gray-500">Esta organización no tiene actividades registradas.</p>
                    ) : (
                        orgActivities.map(a => (
                            <Link key={a.id} to={`/activity/${a.id}`}
                                className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition space-y-1">
                                <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {DAYS[a.day]} · {a.time} · {a.district} · {LEVELS[a.level]}
                                </p>
                            </Link>
                        ))
                    )}
                </section>

            </main>
        </div>
    );
}