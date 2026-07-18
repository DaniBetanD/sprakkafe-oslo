import { CalendarDays, Coffee, Users } from "lucide-react";
import HorizontalCarousel from "./HorizontalCarousel";

export default function CategorySection({ activeCategory, onSelectCategory, todayCount, familyCount }) {
  const categories = [
    {
      id: "today",
      icon: <CalendarDays size={22} />,
      title: "Para hoy",
      description: "Actividades que se celebran hoy mismo.",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      available: todayCount > 0,
    },
    {
      id: "families",
      icon: <Users size={22} />,
      title: "Familias",
      description: "Ambientes adaptados para niños y padres.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      available: familyCount > 0,
    },
    {
      id: "all",
      icon: <Coffee size={22} />,
      title: "Todos",
      description: "Listado completo de actividades en Oslo.",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      available: true,
    },
  ].filter((category) => category.available);

  const renderCard = (category) => {
    const isSelected = activeCategory === category.id;
    return (
      <button
        key={category.id}
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelectCategory(category.id)}
        className={`w-full rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 min-h-[130px] flex flex-col justify-between
          bg-white hover:shadow-md cursor-pointer active:scale-[0.98]
          ${isSelected ? "ring-2 ring-blue-600 border-transparent" : "border-gray-100"}`}
      >
        <div>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border ${category.color}`}>
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
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{category.description}</p>
        </div>
      </button>
    );
  };

  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Explora por intereses</h2>
        <p className="mt-1 text-sm text-gray-500">Selecciona una categoría para filtrar las actividades.</p>
      </div>
      <div className="block sm:hidden mt-4">
        <HorizontalCarousel>
          {categories.map((category) => (
            <div key={category.id} className="min-w-[190px] max-w-[210px] snap-center p-1">
              {renderCard(category)}
            </div>
          ))}
        </HorizontalCarousel>
      </div>
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {categories.map((category) => renderCard(category))}
      </div>
    </div>
  );
}
