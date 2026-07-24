import { Search, X } from "lucide-react";

export default function SearchBar({ query, onSearch }) {
    function submit(e) {
        e.preventDefault();
        onSearch(query.trim());
    }

    function updateQuery(value) {
        onSearch(value);
    }

    return (
        <form onSubmit={submit} className="w-full" role="search">
            <div className="relative">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    id="search"
                    name="search"
                    type="search"
                    autoComplete="off"
                    aria-label="Buscar actividades"
                    value={query}
                    onChange={(e) => updateQuery(e.target.value)}
                    placeholder="Busca por actividad, barrio o nivel"
                    className="min-h-[48px] w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-12 text-base text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => onSearch("")}
                        aria-label="Borrar búsqueda"
                        className="absolute right-1.5 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={17} aria-hidden="true" />
                    </button>
                )}
            </div>
        </form>
    )
}
