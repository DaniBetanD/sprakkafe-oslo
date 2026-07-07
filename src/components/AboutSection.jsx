import { Users, Globe2, MessageCircle } from "lucide-react";
import { scrollToId } from "../utils/scrollTo";

const STEPS = [
    {
        number: 1,
        title: "Encuentra una actividad",
        description: "Busca actividades cerca de ti según el barrio, el día o el nivel de noruego."
    },
    {
        number: 2,
        title: "Participa",
        description: "Conversa, practica el idioma y descubre nuevos espacios donde aprender sin presión."
    },
    {
        number: 3,
        title: "Forma parte",
        description: "Conecta con personas, vuelve cuando quieras y sigue construyendo tu vida en Noruega."
    }
];

function MissionCard({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3">
                {icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function CommunityCTA() {
    return (
        <div className="mt-12 bg-blue-600 text-white rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold">¿Listo para empezar?</h3>
            <p className="mt-2 text-blue-100 text-sm md:text-base">
                Encuentra tu próximo grupo de conversación hoy mismo.
            </p>
            <a
                href="#actividades"
                onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToId("actividades"); 
                }}
                className="mt-5 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
                Ver actividades →
            </a>
        </div>
    );
}

export default function AboutSection() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Sentirse parte de Noruega
                </h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
                    Aprender un idioma es mucho más que memorizar palabras.
                    Es conversar, conocer personas, comprender la cultura y
                    empezar a sentirte parte del lugar donde vives.
                </p>
            </div>

            {/* Cards */}
            <div className="mt-10 md:mt-20 grid gap-4 md:grid-cols-3">
                <MissionCard
                    icon={<Users size={24} />}
                    title="Practica con confianza"
                    description="Aprender un idioma puede dar miedo. Practicar en un entorno seguro, relajado y sin presión ayuda a ganar confianza hasta que hablar se convierte en algo natural."
                />
                <MissionCard
                    icon={<Globe2 size={24} />}
                    title="Descubre la cultura"
                    description="Cada conversación es también una oportunidad para conocer las costumbres, entender la sociedad noruega y descubrir la vida cotidiana más allá de los libros."
                />
                <MissionCard
                    icon={<MessageCircle size={24} />}
                    title="Conecta con personas"
                    description="Conocer gente, compartir experiencias y crear nuevas amistades forma parte del aprendizaje tanto como el propio idioma."
                />
            </div>

            {/* Nuestra misión */}
            <div className="mx-auto mt-12 md:mt-24 max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                    Nuestra misión
                </h3>
                <div className="rounded-2xl bg-white border border-gray-100 p-5 md:p-8 shadow-sm">
                    <p className="text-base md:text-lg font-medium leading-7 md:leading-8 text-gray-800">
                        Ayudamos a las personas a sentirse parte de Noruega
                        a través del idioma, la comunidad y la cultura.
                    </p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600">
                        Reunimos en un solo lugar actividades gratuitas
                        organizadas por bibliotecas, organizaciones y centros
                        comunitarios, como Språkkafé, Norsktrening, cafés de
                        conversación, grupos de mujeres y otras iniciativas
                        donde practicar noruego en un entorno seguro y acogedor.
                    </p>
                </div>
            </div>

            {/* ¿Cómo funciona? */}
            <div id="como-funciona" className="mx-auto mt-12 md:mt-24 max-w-5xl">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                    ¿Cómo funciona?
                </h3>
                <div className="mt-8 md:mt-12 grid gap-8 md:grid-cols-3">
                    {STEPS.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                                {step.number}
                            </div>
                            <h4 className="font-semibold text-gray-900">{step.title}</h4>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <CommunityCTA />
        </div>
    );
}