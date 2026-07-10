import HorizontalCarousel from "./HorizontalCarousel";

const steps = [
    {
        number: "1",
        title: "Encuentra una actividad",
        description: "Busca actividades cerca de ti según el barrio, el día o el tipo de Språkkafé.",
    },
    {
        number: "2",
        title: "Participa",
        description: "Conversa, practica noruego y conoce personas en un ambiente relajado y acogedor.",
    },
    {
        number: "3",
        title: "Forma parte",
        description: "Vuelve cuando quieras, crea nuevas amistades y siéntete parte de la comunidad.",
    },
];

export default function HowItWorks() {
    return (
        <div className="py-2">
            <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    ¿Cómo funciona?
                </h2>
                <p className="mt-1 max-w-2xl mx-auto text-gray-500 text-xs md:text-sm leading-relaxed">
                    Empezar es muy sencillo. Solo necesitas encontrar una actividad, asistir y disfrutar de la experiencia.
                </p>
            </div>

            {/* Vista Móvil: Evitamos desbordes alineando las tarjetas limpiamente en el carrusel */}
            <div className="block sm:hidden mt-4">
                <HorizontalCarousel>
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="min-w-[240px] max-w-[260px] snap-center p-1"
                        >
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center min-h-[160px] flex flex-col items-center justify-center">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-600 shrink-0">
                                    {step.number}
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </HorizontalCarousel>
            </div>

            {/* Vista Desktop / Tablet: Rejilla estática bien proporcionada */}
            <div className="hidden sm:grid grid-cols-3 gap-6 mt-6">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                            {step.number}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-500">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}