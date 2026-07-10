import { Users, Globe2, MessageCircle } from "lucide-react";
import { scrollToId } from "../utils/scrollTo";

function MissionCard({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 border border-blue-100 shrink-0">
                {icon}
            </div>
            <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function CommunityCTA() {
    return (
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 text-center shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-white">¿Listo para empezar?</h3>
            <p className="mt-2 text-blue-100 text-xs md:text-sm max-w-md mx-auto">
                Encuentra tu próximo grupo de conversación hoy mismo. ¡Te estamos esperando!
            </p>
            <a
                href="#actividades"
                onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToId("actividades"); 
                }}
                className="mt-4 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition active:scale-[0.98] cursor-pointer min-h-[44px] text-sm"
            >
                Ver actividades →
            </a>
        </div>
    );
}

export default function MissionSection() {
    return (
        <div className="w-full py-2">
            {/* Header del Bloque */}
            <div className="mx-auto max-w-3xl text-center mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Sentirse parte de Noruega
                </h2>
                <p className="mt-2 text-xs md:text-base leading-relaxed text-gray-500">
                    Aprender un idioma es mucho más que memorizar palabras. Es conversar, conocer personas, comprender la cultura y empezar a sentirte en casa.
                </p>
            </div>

            {/* Mapeo de Tarjetas de Valores */}
            <div className="grid gap-4 md:grid-cols-3">
                <MissionCard
                    icon={<Users size={22} />}
                    title="Practica con confianza"
                    description="Aprender un idioma puede imponer respeto. Practicar en un entorno seguro, relajado y sin presiones te ayuda a soltarte hasta que hablar sea algo natural."
                />
                <MissionCard
                    icon={<Globe2 size={22} />}
                    title="Descubre la cultura"
                    description="Cada conversación es también una oportunidad idónea para conocer las costumbres, entender la sociedad noruega y descubrir el día a día real."
                />
                <MissionCard
                    icon={<MessageCircle size={22} />}
                    title="Conecta con personas"
                    description="Conocer gente nueva, compartir vivencias comunes y tejer amistades forma parte del viaje del aprendizaje tanto como la gramática."
                />
            </div>

            {/* Cuadro de Manifiesto Organizacional */}
            <div className="mx-auto mt-10 max-w-4xl">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Nuestra misión
                </h3>
                <div className="rounded-2xl bg-white border border-gray-100 p-5 md:p-6 shadow-sm">
                    <p className="text-sm md:text-base font-semibold leading-relaxed text-gray-800">
                        Ayudamos a las personas a integrarse y sentirse parte de Noruega a través del idioma, la comunidad y el intercambio cultural.
                    </p>
                    <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-gray-500">
                        Reunimos en una plataforma única las actividades gratuitas organizadas por bibliotecas, organizaciones benéficas y centros vecinales, tales como Språkkafé, Norsktrening, grupos de mujeres y cafés de conversación interactivos.
                    </p>
                </div>
            </div>

            {/* Botón de acción unificado */}
            <CommunityCTA />
        </div>
    );
}