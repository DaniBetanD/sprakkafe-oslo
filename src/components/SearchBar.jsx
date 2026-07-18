import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    function submit(e) {
        e.preventDefault();
        onSearch(query.trim());
    }

    function updateQuery(value) {
        setQuery(value);
        onSearch(value.trim());
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
                    className="min-h-[48px] w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </form>
    )
}
