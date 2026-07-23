import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Heart, X } from "lucide-react";

export default function CommunitySignupModal({ onClose }) {
    const dialogRef = useRef(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        const appRoot = document.getElementById("root");
        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement;

        appRoot.setAttribute("inert", "");
        document.body.style.overflow = "hidden";
        dialogRef.current?.querySelector('input[type="email"]')?.focus();

        const renderRecaptcha = () => {
            if (!recaptchaRef.current || !window.grecaptcha) return;
            window.grecaptcha.ready(() => {
                if (recaptchaRef.current?.childElementCount === 0) {
                    window.grecaptcha.render(recaptchaRef.current, {
                        sitekey: "6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD",
                    });
                }
            });
        };

        let recaptchaScript = document.querySelector('script[data-sprakkafe-recaptcha]');
        if (window.grecaptcha) {
            renderRecaptcha();
        } else if (recaptchaScript) {
            recaptchaScript.addEventListener("load", renderRecaptcha);
        } else {
            recaptchaScript = document.createElement("script");
            recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=explicit";
            recaptchaScript.async = true;
            recaptchaScript.defer = true;
            recaptchaScript.dataset.sprakkafeRecaptcha = "true";
            recaptchaScript.addEventListener("load", renderRecaptcha);
            document.head.appendChild(recaptchaScript);
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab") return;

            const elements = dialogRef.current?.querySelectorAll(
                'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
            );
            if (!elements?.length) return;
            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            recaptchaScript?.removeEventListener("load", renderRecaptcha);
            appRoot.removeAttribute("inert");
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus();
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="community-modal-title"
                aria-describedby="community-modal-description"
                tabIndex="-1"
                className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl outline-none sm:rounded-3xl sm:p-8"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                        aria-hidden="true"
                    >
                        <Heart size={21} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        aria-label="Cerrar formulario"
                    >
                        <X size={21} />
                    </button>
                </div>

                <h2 id="community-modal-title" className="text-2xl font-bold tracking-tight text-gray-900">
                    Tu primer paso empieza aquí
                </h2>
                <p id="community-modal-description" className="mt-2 text-sm leading-relaxed text-gray-600">
                    Descubre nuevos lugares donde practicar noruego, conocer personas y sentirte más cerca de Oslo.
                </p>

                <form
                    className="mt-6 space-y-4"
                    action="https://assets.mailerlite.com/jsonp/2519322/forms/193542070263088770/subscribe"
                    method="post"
                    target="_blank"
                >
                    <div>
                        <label htmlFor="community-email" className="mb-2 block text-sm font-semibold text-gray-900">
                            Tu email
                        </label>
                        <input
                            id="community-email"
                            type="email"
                            name="fields[email]"
                            autoComplete="email"
                            required
                            placeholder="tu@email.com"
                            className="min-h-12 w-full rounded-xl border border-gray-300 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <p className="text-xs leading-relaxed text-gray-600">
                        Solo te escribiremos cuando tengamos actividades, cambios de horario o novedades útiles para ti.
                    </p>

                    <label className="flex items-start gap-3 text-xs leading-relaxed text-gray-600">
                        <input
                            type="checkbox"
                            required
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span>
                            Sí, quiero recibir novedades de la comunidad de Språkkafé. Podré darme de baja cuando quiera.
                        </span>
                    </label>

                    <div ref={recaptchaRef} className="min-h-[78px] max-w-full overflow-hidden" />

                    <input type="hidden" name="ml-submit" value="1" />
                    <input type="hidden" name="anticsrf" value="true" />

                    <button
                        type="submit"
                        className="min-h-12 w-full rounded-xl bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                        Quiero formar parte
                    </button>
                </form>
            </div>
        </div>,
        document.body,
    );
}
