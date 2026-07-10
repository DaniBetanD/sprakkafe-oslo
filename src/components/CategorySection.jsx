import { CalendarDays, Users, Coffee, Sparkles } from "lucide-react";
import HorizontalCarousel from "./HorizontalCarousel";

export default function CategorySection({ activeFilter, onSelectCategory, todayCount }) {
    const categories = [
        {
            id: "today",
            icon: <CalendarDays size={22} />,
            title: "Språkkafé hoy",
            description: "Actividades programadas para hoy.",
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            id: "families",
            icon: <Users size={22} />,
            title: "Familias",
            description: "Espacios adaptados para niños y padres.",
            color: "bg-green-50 text-green-600 border-green-200"
        },
        {
            id: "all",
            icon: <Coffee size={22} />,
            title: "Todos",
            description: "Explora la lista completa en Oslo.",
            color: "bg-orange-50 text-orange-600 border-orange-200"
        },
        {
            id: "upcoming",
            icon: <Sparkles size={22} />,
            title: "Próximamente",
            description: "Nuevas comunidades en camino.",
            color: "bg-purple-50 text-purple-600 border-purple-200",
            disabled: true
        }
    ];

    // Subcomponente interno para no duplicar código de botones entre Desktop y Móvil
    const renderCard = (category) => {
        const isSelected = activeFilter === category.id;
        return (
            <button
                key={category.id}
                disabled={category.disabled}
                onClick={() => !category.disabled && onSelectCategory(category.id)}
                className={`
                    w-full
                    rounded-2xl
                    border
                    p-5
                    text-left
                    shadow-sm
                    transition-all
                    duration-200
                    min-h-[130px]
                    flex
                    flex-col
                    justify-between
                    ${category.disabled 
                        ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100" 
                        : "bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                    }
                    ${isSelected ? "ring-2 ring-blue-600 border-transparent bg-blue-50/20" : "border-gray-100"}
                `}
            >
                <div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${category.color} border`}>
                        {category.icon}
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        {category.title}
                        {category.id === "today" && todayCount > 0 && (
                            <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                                {todayCount}
                            </span>
                        )}
                    </h3>

                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                        {category.description}
                    </p>
                </div>
            </button>
        );
    };

    return (
        <div className="py-2">
            <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Explora por intereses
                </h2>
                <p className="mt-1 text-gray-500 text-xs md:text-sm">
                    Selecciona una categoría para filtrar rápidamente las opciones disponibles.
                </p>
            </div>

            {/* Vista Móvil: ¡Ahora en forma de Carrusel Horizontal! (Ojos de UX activados) */}
            <div className="block sm:hidden mt-4">
                <HorizontalCarousel>
                    {categories.map((category) => (
                        <div key={category.id} className="min-w-[200px] max-w-[220px] snap-center p-1">
                            {renderCard(category)}
                        </div>
                    ))}
                </HorizontalCarousel>
            </div>

            {/* Vista Desktop / Tablet: Rejilla estática limpia */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {categories.map((category) => renderCard(category))}
            </div>
        </div>
    );
}