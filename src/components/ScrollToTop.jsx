import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "../utils/scrollTo";

export default function ScrollToTop() {
    const { pathname, state } = useLocation();

    useEffect(() => {
        // Si venimos desde otra página queriendo hacer scroll a una sección
        if (state?.scrollTo) {
            setTimeout(() => {
                scrollToId(state.scrollTo);
                window.history.replaceState({}, document.title);
            }, 100);
            return;
        }

        // Navegación normal: ir arriba del todo
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    }, [pathname, state]);

    return null;
}