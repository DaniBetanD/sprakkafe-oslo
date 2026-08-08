import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Globe, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import activities from "../data/activities.json";
import organizations from "../data/organizations.json";
import ActivityPracticalInfo from "../components/ActivityPracticalInfo";
import { getUiTranslations } from "../utils/translations";
import { getActivityAvailability, getScheduleLabel } from "../utils/activityPresentation";
import { useLanguage } from "../i18n/LanguageContext";
import SeoMetadata from "../components/SeoMetadata";
import { getActivitySeo } from "../utils/seo";

const LEVEL_COLORS = {
    "all": "bg-blue-50 text-blue-700",
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function ActivityPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { activityContent, locale, organizationContent, pathFor, t } = useLanguage();
    const { days: dayLabels, levels: levelLabels } = getUiTranslations(locale);

    const rawActivity = activities.find(a => String(a.id) === String(id));
    const activity = rawActivity ? activityContent(rawActivity) : null;
    const rawOrganization = activity ? organizations.find(org => String(org.id) === String(activity.organizationId)) : null;
    const organization = rawOrganization ? organizationContent(rawOrganization) : null;

    // Recuperamos los filtros del buscador para volver atrás sin perder el contexto
    const previousSearch = location.state?.fromSearch
        ? `${pathFor("/")}?${location.state.fromSearch}`
        : pathFor("/");

    if (!activity) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">{t("activityNotFound")}</h2>
                    <button 
                        onClick={() => navigate(pathFor("/"))}
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium min-h-[44px]"
                    >
                        <ArrowLeft size={16} /> {t("backHome")}
                    </button>
                </div>
            </div>
        );
    }

    const seo = getActivitySeo(activity, organization, locale);

    const otherActivities = activities.filter(
        a => String(a.organizationId) === String(activity.organizationId) && String(a.id) !== String(activity.id)
    ).map(activityContent);

    const mapsUrl = activity.address
        ? `https://maps.google.com/?q=${encodeURIComponent(activity.address + ', Oslo')}`
        : null;
    const availability = getActivityAvailability(activity);
    const isWhatsAppRegistration = activity.registrationUrl?.includes("chat.whatsapp.com");

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <SeoMetadata {...seo} locale={locale} />
            {/* Nav Cabecera Limpia */}
            <div className="bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
                    <button 
                        onClick={() => navigate(previousSearch)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition group min-h-[44px] px-2 rounded-xl active:scale-95"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        <span>{t("activities")}</span>
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
                                    decoding="async"
                                    width="48"
                                    height="48"
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="text-2xl">{organization?.logo || "🏢"}</span>
                            )}
                        </div>
                        <div>
                            <Link
                                to={pathFor(`/organization/${organization?.id}`)}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition min-h-[44px] flex items-center"
                            >
                                {organization?.name}
                            </Link>
                            {organization?.tipo && (
                                <p className="mt-0.5 text-xs text-gray-400">{organization.tipo}</p>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            {activity.name}
                        </h1>
                    </div>

                    {availability === "expired" && (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <p className="font-semibold text-amber-950">{t("scheduleFinishedTitle")}</p>
                            <p className="mt-1 text-sm leading-relaxed text-amber-900">
                                {t("scheduleFinishedText")}
                            </p>
                        </div>
                    )}

                    {activity.description && (
                        <p className="text-gray-600 leading-relaxed text-base">
                            {activity.description}
                        </p>
                    )}

                    <hr className="border-gray-100" />

                    <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">
                            <Calendar size={15} className="text-blue-500" />
                            {getScheduleLabel(activity, locale)}
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
                            {levelLabels[activity.level]}
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
                            <span>{activity.address} · {t("viewOnMap")}</span>
                        </a>
                    )}

                    <div className="flex flex-col gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:flex-wrap">
                        {activity.sourceUrl && (
                            <a
                                href={activity.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                {t("officialSchedule")} <ExternalLink size={15} aria-hidden="true" />
                            </a>
                        )}
                        {activity.registrationUrl && (
                            <a
                                href={activity.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                            >
                                {isWhatsAppRegistration && <MessageCircle size={16} aria-hidden="true" />}
                                {t(isWhatsAppRegistration ? "joinWhatsapp" : "officialRegistration")}
                                <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        )}
                        {mapsUrl && (
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                            >
                                <MapPin size={15} aria-hidden="true" /> {t("directions")}
                            </a>
                        )}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500">
                        {t("confirmSchedule")}
                    </p>
                </section>

                <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <h2 className="mb-4 text-lg font-bold text-gray-900">{t("beforeAttending")}</h2>
                    <ActivityPracticalInfo activity={activity} />
                </section>
                {/* Sobre la entidad */}
                <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">{t("organizingEntity")}</h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {organization?.description || t("entityFallback")}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {organization?.website && (
                            <a
                                href={organization.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition min-h-[44px]"
                            >
                                <Globe size={16} /> {t("officialSite")} <ExternalLink size={14} />
                            </a>
                        )}
                        {organization?.facebook && (
                            <a
                                href={organization.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition min-h-[44px]"
                            >
                                {t("viewFacebook")} <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        )}
                        {organization?.email && (
                            <a
                                href={`mailto:${organization.email}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                            >
                                <Mail size={16} /> {t("contact")}
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
                        {organization?.secondaryPhone && (
                            <a
                                href={`tel:${organization.secondaryPhone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                            >
                                <Phone size={16} /> {organization.secondaryPhone}
                            </a>
                        )}
                        <Link
                            to={pathFor(`/organization/${organization?.id}`)}
                            className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]"
                        >
                            {t("fullProfile")}
                        </Link>
                    </div>
                </section>

                {/* Otras actividades */}
                {otherActivities.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-gray-900">
                            {t("moreActivities", { name: organization?.name })}
                        </h2>
                        {otherActivities.map(a => (
                            <Link
                                key={a.id}
                                to={pathFor(`/activity/${a.id}`)}
                                state={{ fromSearch: location.state?.fromSearch }}
                                className="block bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {dayLabels[a.day]} · {a.time} · {a.district} · {levelLabels[a.level]}
                                </p>
                            </Link>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}
