import { Globe, MessageCircle, Users } from "lucide-react";

const cards = [
  {
    icon: <Users size={22} />,
    title: "Practica con confianza",
    description: "Habla a tu ritmo en un ambiente seguro y relajado.",
  },
  {
    icon: <Globe size={22} />,
    title: "Descubre la cultura",
    description: "Conoce la vida cotidiana a través de conversaciones reales.",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Conecta con personas",
    description: "Comparte, aprende y encuentra personas con quienes sentirte acompañado.",
  },
];

export default function MissionSection() {
  return (
    <div id="proyecto" className="py-4 md:py-6">
      <div className="max-w-2xl mb-6 md:mb-8">
        <p className="text-sm font-semibold text-blue-600">Nuestra misión</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Sentirse parte de Noruega
        </h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          Aprender un idioma también es conversar, conocer personas y comprender la vida cotidiana.
          Queremos que ese primer paso resulte más fácil.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="shrink-0 p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100" aria-hidden="true">
              {card.icon}
            </div>
            <div>
              <h3 className="font-semibold text-base text-gray-900">{card.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 max-w-3xl border-l-2 border-blue-500 pl-4 md:pl-5">
        <p className="text-base font-semibold leading-relaxed text-gray-900">
          El idioma es el comienzo. Sentirse parte es la meta.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Reunimos actividades de organizaciones y espacios comunitarios para que encontrar un lugar donde practicar sea sencillo y seguro.
        </p>
      </div>

    </div>
  );
}
