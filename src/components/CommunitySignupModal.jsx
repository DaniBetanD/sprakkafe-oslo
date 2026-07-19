import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, X } from "lucide-react";

export default function CommunitySignupModal({ onClose }) {
    const dialogRef = useRef(null);
    const emailRef = useRef(null);
    const [status, setStatus] = useState("idle");

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("submitting");
        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: formData.get("email"),
                    consent: formData.get("consent") === "on",
                    website: formData.get("website"),
                }),
            });

            if (!response.ok) throw new Error("Subscription request failed");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    useEffect(() => {
        const appRoot = document.getElementById("root");
        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement;
        appRoot.setAttribute("inert", "");
        document.body.style.overflow = "hidden";
        emailRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab") return;

            const elements = dialogRef.current?.querySelectorAll(
                'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
                aria-describedby="community-modal-description community-form-status"
                className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600" aria-hidden="true">
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

                {status === "success" ? (
                    <div role="status" className="space-y-3">
                        <h2 id="community-modal-title" className="text-2xl font-bold tracking-tight text-gray-900">
                            Revisa tu email
                        </h2>
                        <p id="community-modal-description" className="text-sm leading-relaxed text-gray-600">
                            Te hemos enviado un enlace para confirmar que quieres unirte. Tu suscripción solo se activará después de pulsarlo.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-h-12 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                            Entendido
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 id="community-modal-title" className="text-2xl font-bold tracking-tight text-gray-900">
                            Únete a la comunidad
                        </h2>
                        <p id="community-modal-description" className="mt-2 text-sm leading-relaxed text-gray-600">
                            Recibe nuevas actividades, cambios de horario y recursos para dar tu primer paso en Oslo.
                        </p>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="community-email" className="mb-2 block text-sm font-semibold text-gray-900">
                            Tu email
                        </label>
                        <input
                            ref={emailRef}
                            id="community-email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            placeholder="nombre@ejemplo.com"
                            className="min-h-12 w-full rounded-xl border border-gray-300 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                        />
                    </div>

                    <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label htmlFor="community-website">No rellenar este campo</label>
                        <input id="community-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-gray-600">
                        <input
                            name="consent"
                            type="checkbox"
                            required
                            className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-blue-600"
                        />
                        <span>
                            Quiero recibir por email novedades de Språkkafé Oslo. Podré darme de baja en cualquier momento.
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        aria-describedby="community-form-status"
                        className="min-h-12 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                        {status === "submitting" ? "Enviando…" : "Unirme a la comunidad"}
                    </button>
                    <p id="community-form-status" role={status === "error" ? "alert" : undefined}
                        className={`text-center text-xs leading-relaxed ${status === "error" ? "text-red-700" : "text-gray-500"}`}>
                        {status === "error"
                            ? "No hemos podido enviar la confirmación. Inténtalo de nuevo en unos minutos."
                            : "Recibirás un email para confirmar tu suscripción. Sin confirmación no guardaremos tu alta."}
                    </p>
                </form>
                    </>
                )}
            </div>
        </div>,
        document.body,
    );
}
