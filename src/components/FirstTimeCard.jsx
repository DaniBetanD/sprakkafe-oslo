import { Users, Ear, Target, Heart } from "lucide-react";

export default function FirstTimeCard() {
  const concerns = [
    {
      icon: Users,
      title: "Puedes venir solo",
      description: "No hace falta conocer a nadie antes."
    },
    {
      icon: Ear,
      title: "Puedes escuchar primero",
      description: "Hablar llegará cuando te sientas preparado."
    },
    {
      icon: Target,
      title: "Nadie espera un noruego perfecto",
      description: "Todos están aprendiendo."
    },
    {
      icon: Heart,
      title: "Encontrarás personas como tú",
      description: "Muchos también acaban de llegar a Noruega."
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 space-y-6 shadow-sm">
      {/* Emotional Header */}
      <div className="space-y-3 border-b border-gray-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Tu primera conversación puede dar un poco de miedo.
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          Es completamente normal. La mayoría de personas llegan con las mismas dudas que tú.
        </p>
      </div>

      {/* Bridge text */}
      <p className="text-sm text-gray-500 italic">
        Más de lo que imaginas, la primera vez suele ser así:
      </p>

      {/* Concerns Grid - No checkmarks, just icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {concerns.map((concern, idx) => {
          const Icon = concern.icon;
          return (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5">
                  <Icon size={28} className="text-gray-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    {concern.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                    {concern.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emotional Closing - The heart of the project */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
        <p className="text-gray-900 font-medium text-base leading-relaxed text-center">
          Cada conversación hace que Noruega se sienta un poco más como <span className="text-amber-700 font-semibold">casa</span>.
        </p>
      </div>
    </div>
  );
}
