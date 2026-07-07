import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "../utils/scrollTo";

export default function ScrollToTop() {
    const { pathname, state } = useLocation();

    useEffect(() => {
        // CASO 1: Si venimos redirigidos desde otra página queriendo ir a un ancla (ej: #proyecto)
        if (state?.scrollTo) {
            // Esperamos un levísimo instante a que la Home se monte en el DOM antes de hacer scroll
            setTimeout(() => {
                scrollToId(state.scrollTo);
                
                // Limpiamos el estado en el historial para que no vuelva a scrollear si el usuario refresca la página
                window.history.replaceState({}, document.title);
            }, 100);
            return;
        }

        // CASO 2: Navegación normal entre páginas distintas (ej: de Home a /activity/1)
        // Empezamos arriba del todo de inmediato y sin animaciones bruscas
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // Evita transiciones extrañas al cambiar de vista
        });
    }, [pathname, state]);

    return null;
}