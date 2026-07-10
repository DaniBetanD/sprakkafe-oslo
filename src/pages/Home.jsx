import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ArrowRight,
  Globe,
  MapPin,
  Calendar,
  MapPinned,
  Users,
  Landmark,
  Search,
  Sparkles,
  Coffee,
  CalendarDays,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

// Centralized translated assets matching utils/translations
const DAYS = {
  "mandag": "Lunes",
  "tirsdag": "Martes",
  "onsdag": "Miércoles",
  "torsdag": "Jueves",
  "fredag": "Viernes",
  "lørdag": "Sábado",
  "søndag": "Domingo"
};

const LEVELS = {
  "A1": "Principiante (A1)",
  "A2": "Básico (A2)",
  "B1": "Intermedio (B1)",
  "B2": "Avanzado (B2)",
  "Todos": "Todos los niveles"
};

// Embedded organizations.json to prevent unresolved file imports in sandbox
const organizationsMock = [
  {
    id: "deichman",
    name: "Deichman Bibliotek",
    logo: "📚",
    website: "https://www.deichman.no",
    description: "La red de bibliotecas públicas de Oslo, ofreciendo espacios gratuitos y seguros de aprendizaje del idioma."
  },
  {
    id: "redcross",
    name: "Røde Kors Oslo",
    logo: "❌",
    website: "https://www.rodekors.no/oslo",
    description: "Cruz Roja Oslo organiza múltiples actividades semanales de integración y práctica de noruego."
  },
  {
    id: "caritas",
    name: "Caritas Norge",
    logo: "⛵",
    website: "https://www.caritas.no",
    description: "Centro de recursos para inmigrantes con un fuerte enfoque en el aprendizaje práctico y asesoramiento laboral."
  },
  {
    id: "kirkens",
    name: "Kirkens Bymisjon",
    logo: "⛪",
    website: "https://kirkensbymisjon.no",
    description: "Organización social que fomenta espacios de encuentro diversos y acogedores en Oslo."
  }
];

// Embedded activities.json to prevent unresolved file imports in sandbox
const activitiesMock = [
  {
    id: "act-1",
    name: "Språkkafé Deichman Bjørvika",
    organizationId: "deichman",
    day: "mandag",
    time: "17:00 - 18:30",
    level: "A2",
    district: "Gamle Oslo",
    address: "Anne-Cath. Vestlys plass 1",
    description: "Práctica informal de noruego en la increíble biblioteca central junto al puerto. ¡Café gratuito!"
  },
  {
    id: "act-2",
    name: "Norsktrening Majorstuen",
    organizationId: "redcross",
    day: "tirsdag",
    time: "16:30 - 18:00",
    level: "B1",
    district: "Frogner",
    address: "Harald Hårfagres gate 2",
    description: "Sesiones estructuradas con voluntarios nativos de la Cruz Roja para consolidar tu gramática y soltura."
  },
  {
    id: "act-3",
    name: "Språkkafé para Familias",
    organizationId: "deichman",
    day: "onsdag",
    time: "11:00 - 13:00",
    level: "A1",
    district: "Grünerløkka",
    address: "Schous Plass 10",
    description: "Especialmente diseñado para padres acompañados de niños. Juegos interactivos y cuentos en noruego para aprender en comunidad."
  },
  {
    id: "act-4",
    name: "Kafé de Conversación Caritas",
    organizationId: "caritas",
    day: "torsdag",
    time: "14:00 - 15:30",
    level: "B2",
    district: "Sentrum",
    address: "Storgata 38",
    description: "Discusiones avanzadas sobre actualidad, cultura laboral y noticias de Noruega para niveles independientes."
  },
  {
    id: "act-5",
    name: "Norsktrening Grünerløkka",
    organizationId: "redcross",
    day: "fredag",
    time: "12:00 - 13:30",
    level: "A2",
    district: "Grünerløkka",
    address: "Schous Plass 10",
    description: "Termina la semana practicando noruego en grupos pequeños organizados por nivel. Ambiente amigable garantizado."
  },
  {
    id: "act-6",
    name: "Lørdagskafé Tøyen",
    organizationId: "kirkens",
    day: "lørdag",
    time: "11:30 - 13:30",
    level: "Todos",
    district: "Gamle Oslo",
    address: "Hagegata 22",
    description: "Un espacio de conversación libre de sábado con café recién hecho, gofres y juegos de mesa en Tøyen."
  },
  {
    id: "act-7",
    name: "Søndagskafé de la Comunidad",
    organizationId: "kirkens",
    day: "søndag",
    time: "13:00 - 15:00",
    level: "A1",
    district: "Sagene",
    address: "Sandakerveien 61",
    description: "Excelente primer paso para recién llegados. Conversación lenta y empática en un vecindario acogedor."
  },
  {
    id: "act-8",
    name: "Språkkafé Deichman Stovner",
    organizationId: "deichman",
    day: "mandag",
    time: "18:00 - 19:30",
    level: "Todos",
    district: "Stovner",
    address: "Stovner Senter 3",
    description: "Practica tu noruego cerca de casa. Todos los niveles son bienvenidos a compartir anécdotas y debates cotidianos."
  },
  {
    id: "act-9",
    name: "Norsktrening de Mujeres",
    organizationId: "caritas",
    day: "onsdag",
    time: "10:00 - 12:00",
    level: "A2",
    district: "Sentrum",
    address: "Storgata 38",
    description: "Café de conversación exclusivo para mujeres con soporte de guardería infantil incluido. Aprende con tranquilidad."
  },
  {
    id: "act-10",
    name: "Språkkafé Grünerløkka Deichman",
    organizationId: "deichman",
    day: "torsdag",
    time: "17:00 - 18:30",
    level: "B1",
    district: "Grünerløkka",
    address: "Schous Plass 10",
    description: "Reuniones animadas en la histórica biblioteca de Schous Plass. Excelente ambiente juvenil e internacional."
  }
];

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
  }
}

function sortActivitiesByUpcomingDay(activities, startDayIndex) {
  const daysMap = {
    "søndag": 0,
    "mandag": 1,
    "tirsdag": 2,
    "onsdag": 3,
    "torsdag": 4,
    "fredag": 5,
    "lørdag": 6
  };

  return [...activities].sort((a, b) => {
    const dayA = daysMap[a.day.toLowerCase().trim()] ?? 0;
    const dayB = daysMap[b.day.toLowerCase().trim()] ?? 0;
    const distanceA = (dayA - startDayIndex + 7) % 7;
    const distanceB = (dayB - startDayIndex + 7) % 7;
    if (distanceA === distanceB) return a.time.localeCompare(b.time);
    return distanceA - distanceB;
  });
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-6 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 text-left bg-transparent border-0 cursor-pointer"
          onClick={() => scrollToId("hero")}
          aria-label="Volver al inicio"
        >
          <span className="text-2xl">🇳🇴</span>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Språkkafé Oslo
          </span>
        </button>
        <nav className="flex items-center gap-4 text-sm font-semibold text-gray-600">
          <button type="button" onClick={() => scrollToId("como-funciona")} className="hover:text-blue-600 transition bg-transparent border-0 cursor-pointer">
            ¿Cómo funciona?
          </button>
          <button type="button" onClick={() => scrollToId("actividades")} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition border-0 cursor-pointer">
            Ver Cafés
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="text-lg font-bold text-white block mb-3">Språkkafé Oslo 🇳🇴</span>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Una iniciativa voluntaria para conectar a hispanohablantes con espacios comunitarios gratuitos para dominar el idioma noruego y sentirse como en casa.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-xs text-gray-500">Proyecto de Comunidad - Versión 2.0</span>
          <span className="text-xs text-gray-500">Última actualización: Julio 2026</span>
          <button type="button" onClick={() => scrollToId("actividades")} className="text-xs text-blue-400 hover:underline mt-2 text-right bg-transparent border-0 cursor-pointer">
            Volver a la búsqueda de actividades
          </button>
        </div>
      </div>
    </footer>
  );
}

function HorizontalCarousel({ children }) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scrollBy = (amount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group w-full">
      {showLeft && (
        <button type="button" onClick={() => scrollBy(-260)} className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition flex items-center justify-center min-h-[44px] min-w-[44px]">
          <ChevronLeft size={20} />
        </button>
      )}
      {showRight && (
        <button type="button" onClick={() => scrollBy(260)} className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition flex items-center justify-center min-h-[44px] min-w-[44px]">
          <ChevronRight size={20} />
        </button>
      )}
      <div ref={containerRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-hide select-none w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {children}
      </div>
    </div>
  );
}

const LEVEL_COLORS = {
  "A1": "bg-emerald-50 text-emerald-700 border-emerald-150",
  "A2": "bg-blue-50 text-blue-700 border-blue-150",
  "B1": "bg-purple-50 text-purple-700 border-purple-150",
  "B2": "bg-orange-50 text-orange-700 border-orange-150",
  "Todos": "bg-gray-50 text-gray-700 border-gray-200"
};

function ActivityCard({ activity, organization, onClick, isSelected }) {
  return (
    <div onClick={onClick} className={`rounded-2xl border p-5 text-left transition-all duration-300 h-full flex flex-col justify-between cursor-pointer select-none ${isSelected ? "border-blue-600 bg-blue-50/10 shadow-md ring-2 ring-blue-600/30" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-600 uppercase">{activity.district}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full border ${LEVEL_COLORS[activity.level] || LEVEL_COLORS["Todos"]}`}>{LEVELS[activity.level] || activity.level}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1 leading-snug">{activity.name}</h3>
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5"><span className="text-base">{organization?.logo || "🏢"}</span><span className="truncate">{organization?.name}</span></p>
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">{activity.description}</p>
      </div>
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-gray-700">
        <span className="flex items-center gap-1.5 capitalize"><CalendarDays size={14} className="text-blue-500" />{DAYS[activity.day] || activity.day}</span>
        <span className="text-blue-600">{activity.time}</span>
      </div>
    </div>
  );
}

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400"><Search size={20} /></div>
      <input type="text" placeholder="Buscar por barrio, biblioteca u organización..." onChange={(e) => onSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-sm text-gray-900" />
    </div>
  );
}

function Filters({ filters, setFilters, activities }) {
  const districts = [...new Set(activities.map(a => a.district))].sort();
  const levels = [...new Set(activities.map(a => a.level))].sort();
  const days = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
  return (
    <div className="flex flex-wrap gap-2.5">
      <div className="relative flex-1 min-w-[140px]"><select value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:bg-white transition-all appearance-none cursor-pointer pr-8 font-medium"><option value="">Cualquier Barrio</option>{districts.map(d => (<option key={d} value={d}>{d}</option>))}</select><div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div></div>
      <div className="relative flex-1 min-w-[140px]"><select value={filters.day} onChange={(e) => setFilters({ ...filters, day: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:bg-white transition-all appearance-none cursor-pointer pr-8 font-medium"><option value="">Cualquier Día</option>{days.map(d => (<option key={d} value={d}>{DAYS[d] || d}</option>))}</select><div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div></div>
      <div className="relative flex-1 min-w-[140px]"><select value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-700 focus:bg-white transition-all appearance-none cursor-pointer pr-8 font-medium"><option value="">Cualquier Nivel</option>{levels.map(l => (<option key={l} value={l}>{LEVELS[l] || l}</option>))}</select><div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div></div>
      {(filters.district || filters.day || filters.level) && (<button type="button" onClick={() => setFilters({ district: "", day: "", level: "", organization: "" })} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-xl transition min-h-[44px]">Limpiar Filtros</button>)}
    </div>
  );
}

function MobileDetailPanel({ selected, selectedOrg, onClose }) {
  if (!selected) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden flex items-end justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-t-3xl w-full p-6 shadow-2xl flex flex-col gap-5 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">{selectedOrg?.logo || "🏢"}</div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm leading-snug">{selected.name}</h3>
              <p className="text-xs text-gray-500">{selectedOrg?.name}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"><X size={20} /></button>
        </div>
        <div className="space-y-4 text-xs">
          {selected.description && (<div className="bg-blue-50/40 rounded-xl p-4 leading-relaxed text-gray-700">{selected.description}</div>)}
          <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
            <div><span className="text-gray-400 block mb-0.5 font-semibold">Día y Hora</span><span className="font-bold text-gray-800 flex items-center gap-1"><Calendar size={13} className="text-blue-500" />{DAYS[selected.day] || selected.day}, {selected.time}</span></div>
            <div><span className="text-gray-400 block mb-0.5 font-semibold">Nivel Requerido</span><span className={`inline-block font-bold px-2 py-0.5 rounded text-[10px] uppercase ${LEVEL_COLORS[selected.level] || "bg-gray-100 text-gray-600"}`}>{LEVELS[selected.level] || selected.level}</span></div>
          </div>
          {selected.address && (<div><span className="text-gray-400 block mb-1 font-semibold">Ubicación exacta</span><a href={`http://maps.google.com/?q=${encodeURIComponent(selected.address + ', Oslo')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white hover:bg-gray-50 p-3 rounded-xl border border-gray-150 transition text-gray-600 font-medium"><MapPin size={16} className="text-blue-500 shrink-0" /><span className="truncate">{selected.district} — {selected.address}</span></a></div>)}
        </div>
        <div className="flex flex-col gap-2.5 pt-2">
          {selectedOrg?.website && (<a href={selectedOrg.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 min-h-[44px]"><Globe size={16} /> Sitio Web de la Organización</a>)}
          <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 min-h-[44px]">Volver a la búsqueda</button>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ activeFilter, onSelectCategory, todayCount }) {
  const categories = [
    { id: "today", icon: <CalendarDays size={22} />, title: "Para hoy", description: "Explora actividades que se celebran hoy.", color: "bg-blue-50 text-blue-600 border-blue-200" },
    { id: "families", icon: <Users size={22} />, title: "Familias", description: "Ambientes adaptados para niños y padres.", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: "all", icon: <Coffee size={22} />, title: "Todos", description: "Listado completo de actividades de Oslo.", color: "bg-orange-50 text-orange-600 border-orange-200" },
    { id: "upcoming", icon: <Sparkles size={22} />, title: "Próximamente", description: "Pronto sumaremos nuevas comunidades.", color: "bg-purple-50 text-purple-600 border-purple-200", disabled: true }
  ];
  const renderCard = (category) => {
    const isSelected = activeFilter === category.id;
    return (
      <button key={category.id} disabled={category.disabled} onClick={() => !category.disabled && onSelectCategory(category.id)} className={`w-full rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 min-h-[130px] flex flex-col justify-between ${category.disabled ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100" : "bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"} ${isSelected ? "ring-2 ring-blue-600 border-transparent bg-blue-50/20" : "border-gray-100"}`}>
        <div>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${category.color} border`}>{category.icon}</div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">{category.title}{category.id === "today" && todayCount > 0 && (<span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">{todayCount}</span>)}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{category.description}</p>
        </div>
      </button>
    );
  };
  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Explora por intereses</h2>
        <p className="mt-1 text-gray-500 text-xs md:text-sm">Selecciona una categoría de acceso rápido para filtrar la base de datos de actividades.</p>
      </div>
      <div className="block sm:hidden mt-4"><HorizontalCarousel>{categories.map((category) => (<div key={category.id} className="min-w-[190px] max-w-[210px] snap-center p-1">{renderCard(category)}</div>))}</HorizontalCarousel></div>
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">{categories.map((category) => renderCard(category))}</div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { number: "1", title: "Encuentra una actividad", description: "Busca actividades cerca de ti según el barrio, el día o el nivel de noruego recomendado." },
    { number: "2", title: "Participa libremente", description: "Conversa, practica el idioma y asiste en un ambiente seguro y de apoyo." },
    { number: "3", title: "Construye relaciones", description: "Vuelve cuando quieras, conoce gente local y siéntete parte de la comunidad en Noruega." },
  ];
  return (
    <div className="py-2">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">¿Cómo funciona?</h2>
        <p className="mt-1 max-w-2xl mx-auto text-gray-500 text-xs md:text-sm leading-relaxed">Nuestra misión es hacer el proceso lo más sencillo posible. En tres pasos puedes dar tu gran inicio.</p>
      </div>
      <div className="block sm:hidden mt-4"><HorizontalCarousel>{steps.map((step) => (<div key={step.number} className="min-w-[240px] max-w-[260px] snap-center p-1"><div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center min-h-[160px] flex flex-col items-center justify-center"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-600 shrink-0">{step.number}</div><h3 className="text-sm font-semibold text-gray-900">{step.title}</h3><p className="mt-1.5 text-xs leading-relaxed text-gray-500">{step.description}</p></div></div>))}</HorizontalCarousel></div>
      <div className="hidden sm:grid grid-cols-3 gap-6 mt-6">{steps.map((step) => (<div key={step.number} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 shrink-0">{step.number}</div><h3 className="text-base font-semibold text-gray-900">{step.title}</h3><p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-500">{step.description}</p></div>))}</div>
    </div>
  );
}

function TodayActivities({ activities, getOrganization, setSelected, selected }) {
  const todayIndex = new Date().getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;
  const orderedActivities = sortActivitiesByUpcomingDay(activities, tomorrowIndex);
  const featuredActivities = orderedActivities.slice(0, 5);
  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Actividades recomendadas</h2>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Planifica tus próximos días. Sugerencias dinámicas según las actividades más inminentes de la semana.</p>
      </div>
      {featuredActivities.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No hay actividades recomendadas disponibles.</p>
      ) : (
        <HorizontalCarousel>{featuredActivities.map((activity) => (<div key={activity.id} className="min-w-[280px] sm:min-w-[320px] snap-center p-1"><ActivityCard activity={activity} organization={getOrganization(activity.organizationId)} onClick={() => setSelected(selected?.id === activity.id ? null : activity)} isSelected={selected?.id === activity.id} /></div>))}</HorizontalCarousel>
      )}
    </div>
  );
}

function MissionSection() {
  const cards = [
    { icon: <Users size={22} />, title: "Practica con confianza", description: "Aprender un idioma puede imponer respeto. Practicar en un entorno seguro, relajado y libre de presión te ayuda a soltarte hasta que hablar sea algo natural." },
    { icon: <Globe size={22} />, title: "Descubre la cultura", description: "Cada café de conversación es una ventana directa a las costumbres locales, el humor noruego y los modismos de uso diario difíciles de ver en libros." },
    { icon: <MessageCircle size={22} />, title: "Conecta y haz amigos", description: "Supera el aislamiento inicial. Genera una red genuina de personas de múltiples orígenes y nativos compartiendo un café caliente." }
  ];
  return (
    <div className="py-2">
      <div className="mx-auto max-w-3xl text-center mb-8">
        <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Sentirse parte de Noruega 🇳🇴</h2>
        <p className="mt-2 text-xs md:text-base leading-relaxed text-gray-500">Dominar un idioma es mucho más que memorizar palabras. Es conversar, reír con otros, comprender las dinámicas cotidianas e integrarse de forma real.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">{cards.map((card, i) => (<div key={i} className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md"><div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 border border-blue-100 shrink-0">{card.icon}</div><h3 className="font-semibold text-base text-gray-900 mb-2">{card.title}</h3><p className="text-gray-500 text-xs leading-relaxed">{card.description}</p></div>))}</div>
      <div className="mx-auto mt-10 max-w-4xl"><h3 className="text-lg font-bold text-gray-900 mb-4">Nuestra misión</h3><div className="rounded-2xl bg-white border border-gray-100 p-5 md:p-6 shadow-sm"><p className="text-sm md:text-base font-semibold leading-relaxed text-gray-800">Reunimos en un portal de libre acceso las actividades y eventos interactivos gratuitos gestionados por bibliotecas públicas de Oslo, Cruz Roja y centros comunitarios.</p><p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-500">Fomentamos un directorio de confianza permanente y actualizado de Språkkafé, Norsktrening y cafés de encuentro amigables para guiar el camino de todo recién llegado a la ciudad.</p></div></div>
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 text-center shadow-md"><h3 className="text-xl md:text-2xl font-bold text-white">¿Listo para empezar tu viaje?</h3><p className="mt-2 text-blue-100 text-xs md:text-sm max-w-md mx-auto">Encuentra tu próximo grupo de conversación hoy mismo de forma totalmente gratuita y amigable.</p><button onClick={() => scrollToId("actividades")} className="mt-4 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition active:scale-[0.98] cursor-pointer min-h-[44px] text-sm">Ver todos los cafés de Oslo →</button></div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({ district: "", day: "", level: "", organization: "" });
  const [selected, setSelected] = useState(null);

  function getOrganization(id) {
    return organizationsMock.find(org => org.id === id);
  }

  const daysOfWeek = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todayCount = activitiesMock.filter(a => a.day.toLowerCase() === currentDayName).length;

  const results = activitiesMock.filter(activity => {
    const org = getOrganization(activity.organizationId);
    const text = (activity.name + (org?.name || "") + activity.district + activity.level).toLowerCase();
    const matchesSearch = text.includes(query.toLowerCase());
    const matchesDistrict = !filters.district || activity.district === filters.district;
    const matchesDay = !filters.day || activity.day === filters.day;
    const matchesLevel = !filters.level || activity.level === filters.level;
    const matchesOrg = !filters.organization || activity.organizationId === filters.organization;
    let matchesCategory = true;
    if (activeCategory === "today") matchesCategory = activity.day.toLowerCase() === currentDayName;
    else if (activeCategory === "families") matchesCategory = activity.name.toLowerCase().includes("famil") || activity.description?.toLowerCase().includes("barn");
    return matchesSearch && matchesDistrict && matchesDay && matchesLevel && matchesOrg && matchesCategory;
  });

  const selectedOrg = selected ? getOrganization(selected.organizationId) : null;

  const handleSelectCategory = (categoryId) => {
    if (categoryId === "all") {
      setActiveCategory("all");
      setFilters({ district: "", day: "", level: "", organization: "" });
    } else {
      setActiveCategory(categoryId);
    }
    scrollToId("actividades");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow space-y-10 md:space-y-16 pb-12">
        <section id="hero" className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 pb-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-white tracking-tight">Encuentra tu <span className="text-yellow-200">Språkkafé</span></h1>
            <p className="mt-3 text-sm md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">Practica tu noruego hablado de forma relajada y segura en múltiples bibliotecas, comunidades y centros de Oslo de forma 100% gratuita.</p>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-10 w-full"><div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5"><SearchBar onSearch={setQuery} /><div className="mt-3"><Filters filters={filters} setFilters={setFilters} activities={activitiesMock} /></div></div></section>
        <section className="max-w-5xl mx-auto px-6 w-full"><CategorySection activeFilter={activeCategory} onSelectCategory={handleSelectCategory} todayCount={todayCount} /></section>
        <section id="como-funciona" className="max-w-5xl mx-auto px-6 w-full"><HowItWorks /></section>
        <section className="max-w-5xl mx-auto px-6 w-full"><TodayActivities activities={activitiesMock} getOrganization={getOrganization} setSelected={setSelected} selected={selected} /></section>
        
        {/* Main Directory & Carousel Grid logic */}
        <section id="actividades" className="max-w-5xl mx-auto px-6 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-xl md:text-2xl text-gray-900">
              {activeCategory === "today" ? "Språkkafé para hoy" : "Todos los Språkkafé"}
            </h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              {results.length} actividades encontradas
            </span>
          </div>
          
          {results.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-500">No hay actividades de idioma que coincidan con estos criterios.</p>
              <button type="button" onClick={() => handleSelectCategory("all")} className="mt-3 text-xs font-bold text-blue-600 underline cursor-pointer min-h-[44px]">
                Ver todas las actividades
              </button>
            </div>
          ) : (
            <div className="w-full">
              {/* MOBILE CAROUSEL STRUCTURE - Prevents vertical listing chaos */}
              <div className="block md:hidden w-full">
                <HorizontalCarousel>
                  {results.map((activity) => (
                    <div key={activity.id} className="min-w-[280px] sm:min-w-[320px] max-w-[85vw] snap-center p-1">
                      <ActivityCard
                        activity={activity}
                        organization={getOrganization(activity.organizationId)}
                        onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
                        isSelected={selected?.id === activity.id}
                      />
                    </div>
                  ))}
                </HorizontalCarousel>
              </div>

              {/* DESKTOP SPLIT AND SIDE PANEL STRUCTURE */}
              <div className="hidden md:flex flex-col md:flex-row gap-6">
                <div className={`grid gap-4 transition-all duration-300 ${
                  selected ? "grid-cols-1 w-[45%] shrink-0" : "grid-cols-2 lg:grid-cols-3 w-full"
                }`}>
                  {results.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      organization={getOrganization(activity.organizationId)}
                      onClick={() => setSelected(selected?.id === activity.id ? null : activity)}
                      isSelected={selected?.id === activity.id}
                    />
                  ))}
                </div>

                {/* Sticky Detail Side Panel on Desktop */}
                {selected && (
                  <div className="flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit sticky top-24 gap-4 animate-fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                          {selectedOrg?.logo || "🏢"}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-gray-900 leading-snug">{selected.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">{selectedOrg?.name}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition p-2">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {selected.description && (
                        <div className="rounded-xl bg-blue-50/40 p-4">
                          <p className="text-xs font-semibold leading-relaxed text-gray-700">{selected.description}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-gray-600 font-semibold">
                          <Calendar size={15} className="text-blue-500 shrink-0" />
                          <span>{DAYS[selected.day]}, {selected.time}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shrink-0 border ${LEVEL_COLORS[selected.level] || LEVEL_COLORS["Todos"]}`}>
                          {LEVELS[selected.level] || selected.level}
                        </span>
                      </div>

                      {selected.address && (
                        <a 
                          href={`http://maps.google.com/?q=${encodeURIComponent(selected.address + ', Oslo')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition group font-medium"
                        >
                          <MapPin size={15} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
                          <span className="truncate">{selected.district} — {selected.address}</span>                                            
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 pt-2">                                       
                      {selectedOrg?.website && (
                        <a 
                          href={selectedOrg.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 min-h-[44px]"
                        >
                          Visitar Web Oficial <ArrowRight size={16} />
                        </a>
                      )}
                      <button 
                        type="button"
                        onClick={() => setSelected(null)} 
                        className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 min-h-[44px]"
                      >
                        Cerrar Detalles
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="max-w-5xl mx-auto px-6 w-full">
          <MissionSection />
        </section>
      </main>

      <MobileDetailPanel selected={selected} selectedOrg={selectedOrg} onClose={() => setSelected(null)} />
      <Footer />
    </div>
  );
}