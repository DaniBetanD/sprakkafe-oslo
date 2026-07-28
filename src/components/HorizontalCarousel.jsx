import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalCarousel({ children }) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    element.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      element.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scrollBy = (amount) => {
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div
      className="relative group w-full"
      role="region"
      aria-label="Carrusel de actividades"
    >
      {showLeft && (
        <button
          type="button"
          aria-label="Ver elementos anteriores"
          onClick={() => scrollBy(-260)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition min-h-[44px] min-w-[44px] hidden lg:flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {showRight && (
        <button
          type="button"
          aria-label="Ver elementos siguientes"
          onClick={() => scrollBy(260)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-100 transition min-h-[44px] min-w-[44px] hidden lg:flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>
      )}
      <div
        ref={containerRef}
        tabIndex="0"
        aria-label="Desplázate horizontalmente para ver más actividades"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      {showRight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-100 via-gray-50/90 to-transparent lg:hidden"
        />
      )}
    </div>
  );
}
