import { useMemo } from "react";
import organizationsData from "../data/organizations.json";
import { DAYS, LEVELS } from "../utils/translations";

export default function Filters({ filters, setFilters, activities }) {
    // 1. Optimizamos y extraemos valores únicos una sola vez con useMemo
    const districts = useMemo(() => {
        return [...new Set(activities.map(a => a.district).filter(Boolean))].sort();
    }, [activities]);

    const levels = useMemo(() => {
        return [...new Set(activities.map(a => a.level).filter(Boolean))];
    }, [activities]);

    const days = useMemo(() => {
        return [...new Set(activities.map(a => a.day).filter(Boolean))];
    }, [activities]);

    // Comprobamos si hay algún filtro activo para mostrar u ocultar el botón de limpiar
    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some(value => value !== "");
    }, [filters]);

    function update(field, value) {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleClearFilters = () => {
        setFilters({
            district: "",
            day: "",
            level: "",
            organization: ""
        });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                
                {/* Filtro: Barrio */}
                <select
                    name="district"
                    aria-label="Filtrar por barrio"
                    value={filters.district}
                    onChange={e => update("district", e.target.value)}
                    className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Barrio</option>
                    {districts.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                {/* Filtro: Día */}
                <select
                    name="day"
                    aria-label="Filtrar por día"
                    value={filters.day}
                    onChange={e => update("day", e.target.value)}
                    className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Día</option>
                    {days.map(d => (
                        <option key={d} value={d}>
                            {DAYS[d] || d}
                        </option>
                    ))}
                </select>

                {/* Filtro: Nivel */}
                <select
                    name="level"
                    aria-label="Filtrar por nivel"
                    value={filters.level}
                    onChange={e => update("level", e.target.value)}
                    className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Nivel</option>
                    {levels.map(l => (
                        <option key={l} value={l}>
                            {LEVELS[l] || l}
                        </option>
                    ))}
                </select>

                {/* Filtro: Organización */}
                <select
                    name="organization"
                    aria-label="Filtrar por organización"
                    value={filters.organization}
                    onChange={e => update("organization", e.target.value)}
                    className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Organización</option>
                    {organizationsData.filter(Boolean).map(o => (
                        <option key={o.id} value={o.id}>
                            {o.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 3. El botón solo se renderiza si el usuario realmente ha filtrado algo */}
            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-2 rounded-xl bg-gray-100 hover:bg-gray-200 px-5 py-2.5 text-gray-700 text-sm font-medium transition duration-200"
                >
                    Limpiar filtros
                </button>
            )}
        </div>
    );
}
