import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe, Mail, Phone } from "lucide-react";
import { getUiTranslations } from "../utils/translations";
import organizations from "../data/organizations.json";
import activities from "../data/activities.json";
import sprakkafeMark from "../assets/sprakkafe-mark.svg";
import ActivityPracticalInfo from "../components/ActivityPracticalInfo";
import { formatCheckedDate, getScheduleLabel, isActivityVisible } from "../utils/activityPresentation";
import { useLanguage } from "../i18n/LanguageContext";
import SeoMetadata from "../components/SeoMetadata";
import { getOrganizationSeo } from "../utils/seo";

export default function OrganizationPage() {
    const { activityContent, locale, organizationContent, pathFor, t } = useLanguage();
    const { levels: levelLabels } = getUiTranslations(locale);

    const { id } = useParams();

    const rawOrganization = organizations.find(o => o.id === id);
    const organization = rawOrganization ? organizationContent(rawOrganization) : null;
    const orgActivities = activities.filter(
        (activity) => activity.organizationId === id && isActivityVisible(activity),
    ).map(activityContent);

    if (!organization) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">{t("organizationNotFound")}</h1>
                    <Link to={pathFor("/")} className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                        <ArrowLeft size={16} /> {t("backHome")}
                    </Link>
                </div>
            </div>
        );
    }

    const seo = getOrganizationSeo(organization, locale);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <SeoMetadata {...seo} locale={locale} />

            <div className="bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link to={pathFor("/")} className="flex min-h-[44px] items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition">
                        <ArrowLeft size={18} />
                        <span>{t("activities")}</span>
                    </Link>
                    <Link to={pathFor("/")} className="flex min-h-[44px] items-center gap-2 group" aria-label="Språkkafé Oslo, ir al inicio">
                        <img src={sprakkafeMark} alt="" className="h-9 w-9" aria-hidden="true" />
                        <span className="hidden text-sm font-semibold text-gray-900 sm:inline">Språkkafé Oslo</span>
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
                                    decoding="async"
                                    width="56"
                                    height="56"
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="text-2xl">{organization.logo}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
                            <p className="mt-1 text-sm text-gray-500">{organization.tipo}</p>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{organization.description}</p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {organization.website && (
                            <a href={organization.website} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition min-h-[44px]">
                                <Globe size={16} /> {t("officialSite")} <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        )}
                        {organization.facebook && (
                            <a href={organization.facebook} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-100 transition min-h-[44px]">
                                {t("viewFacebook")} <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        )}
                        {organization.email && (
                            <a href={`mailto:${organization.email}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]">
                                <Mail size={16} /> {t("writeEmail")}
                            </a>
                        )}
                        {organization.phone && (
                            <a href={`tel:${organization.phone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]">
                                <Phone size={16} /> {organization.phone}
                            </a>
                        )}
                        {organization.secondaryPhone && (
                            <a href={`tel:${organization.secondaryPhone}`}
                                className="inline-flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition min-h-[44px]">
                                <Phone size={16} /> {organization.secondaryPhone}
                            </a>
                        )}
                    </div>
                    {organization.lastChecked && (
                        <p className="border-t border-gray-100 pt-4 text-xs text-gray-500">
                            {t("checkedOn", { date: formatCheckedDate(organization.lastChecked, locale) })}
                        </p>
                    )}
                </section>

                {/* Actividades */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {t("organizationActivities", { count: orgActivities.length })}
                    </h2>

                    {orgActivities.length === 0 ? (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <h3 className="font-semibold text-amber-950">{t("noDatesTitle")}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-amber-900">
                                {t("noCurrentActivities")}
                            </p>
                            {organization.website && (
                                <a
                                    href={organization.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-amber-950 underline underline-offset-4"
                                >
                                    {t("consultOfficialSite")} <ExternalLink size={14} aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    ) : (
                        orgActivities.map(a => (
                            <Link key={a.id} to={pathFor(`/activity/${a.id}`)}
                                className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
                                <h3 className="font-semibold text-gray-900">{a.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {getScheduleLabel(a, locale)} · {a.district} · {levelLabels[a.level]}
                                </p>
                                <div className="mt-3">
                                    <ActivityPracticalInfo activity={a} compact />
                                </div>
                            </Link>
                        ))
                    )}
                </section>

            </main>
        </div>
    );
}
