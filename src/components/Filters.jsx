import { useMemo } from "react";
import { X } from "lucide-react";
import { getActivityDays } from "../utils/activityPresentation";
import organizationsData from "../data/organizations.json";
import { getUiTranslations } from "../utils/translations";
import { useLanguage } from "../i18n/LanguageContext";

const WEEK_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Filters({ filters, setFilters, activities }) {
    const { locale, t } = useLanguage();
    const { categories: categoryLabels, days: dayLabels, levels: levelLabels } = getUiTranslations(locale);
    const districts = useMemo(
        () => [...new Set(activities.map((activity) => activity.district).filter(Boolean))].sort(),
        [activities],
    );
    const categories = useMemo(
        () => [...new Set(activities.map((activity) => activity.category).filter(Boolean))],
        [activities],
    );
    const levels = useMemo(
        () => [...new Set(activities.map((activity) => activity.level).filter(Boolean))],
        [activities],
    );
    const days = useMemo(
        () => [...new Set(activities.flatMap(getActivityDays).filter(Boolean))]
            .sort((a, b) => WEEK_ORDER.indexOf(a) - WEEK_ORDER.indexOf(b)),
        [activities],
    );
    const availableOrganizationIds = useMemo(
        () => new Set(activities.map((activity) => activity.organizationId)),
        [activities],
    );
    const availableOrganizations = useMemo(
        () => organizationsData.filter((organization) => availableOrganizationIds.has(organization.id)),
        [availableOrganizationIds],
    );

    function update(field, value) {
        setFilters((previousFilters) => ({
            ...previousFilters,
            [field]: value,
        }));
    }

    function clearFilters() {
        setFilters({ category: "", district: "", day: "", level: "", organization: "" });
    }

    const activeFilters = [
        filters.category && {
            field: "category",
            label: categoryLabels[filters.category] || filters.category,
        },
        filters.district && { field: "district", label: filters.district },
        filters.day && { field: "day", label: dayLabels[filters.day] || filters.day },
        filters.level && { field: "level", label: levelLabels[filters.level] || filters.level },
        filters.organization && {
            field: "organization",
            label: availableOrganizations.find((organization) => organization.id === filters.organization)?.name,
        },
    ].filter(Boolean);

    const selectClassName = "min-h-[48px] w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <select
                    name="category"
                    aria-label={t("category")}
                    value={filters.category}
                    onChange={(event) => update("category", event.target.value)}
                    className={`${selectClassName} col-span-2 md:col-span-1`}
                >
                    <option value="">{t("category")}</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {categoryLabels[category] || category}
                        </option>
                    ))}
                </select>

                <select
                    name="district"
                    aria-label={t("district")}
                    value={filters.district}
                    onChange={(event) => update("district", event.target.value)}
                    className={selectClassName}
                >
                    <option value="">{t("district")}</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>{district}</option>
                    ))}
                </select>

                <select
                    name="day"
                    aria-label={t("day")}
                    value={filters.day}
                    onChange={(event) => update("day", event.target.value)}
                    className={selectClassName}
                >
                    <option value="">{t("day")}</option>
                    {days.map((day) => (
                        <option key={day} value={day}>{dayLabels[day] || day}</option>
                    ))}
                </select>

                <select
                    name="level"
                    aria-label={t("level")}
                    value={filters.level}
                    onChange={(event) => update("level", event.target.value)}
                    className={selectClassName}
                >
                    <option value="">{t("level")}</option>
                    {levels.map((level) => (
                        <option key={level} value={level}>{levelLabels[level] || level}</option>
                    ))}
                </select>

                <select
                    name="organization"
                    aria-label={t("organization")}
                    value={filters.organization}
                    onChange={(event) => update("organization", event.target.value)}
                    className={selectClassName}
                >
                    <option value="">{t("organization")}</option>
                    {availableOrganizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                            {organization.name}
                        </option>
                    ))}
                </select>
            </div>

            {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2" aria-label={t("activeFilters")}>
                    {activeFilters.map((filter) => (
                        <button
                            key={filter.field}
                            type="button"
                            onClick={() => update(filter.field, "")}
                            aria-label={t("removeFilter", { label: filter.label })}
                            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                            {filter.label}
                            <X size={13} aria-hidden="true" />
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="min-h-[44px] px-2 text-xs font-semibold text-gray-600 underline underline-offset-4 transition hover:text-gray-900"
                    >
                        {t("clearFilters")}
                    </button>
                </div>
            )}
        </div>
    );
}
