import { Sprout, MessageSquare, Users, Globe } from "lucide-react";

export default function WhatActivityForMe() {
  const profiles = [
    {
      icon: Sprout,
      emoji: "🌱",
      title: "Acabo de llegar",
      subtitle: "Quiero empezar poco a poco",
      color: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      buttonColor: "bg-green-100 hover:bg-green-200 text-green-700"
    },
    {
      icon: MessageSquare,
      emoji: "💬",
      title: "Quiero hablar más",
      subtitle: "Necesito practicar conversaciones reales",
      color: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-100 hover:bg-blue-200 text-blue-700"
    },
    {
      icon: Users,
      emoji: "👥",
      title: "Quiero conocer gente",
      subtitle: "Me gustaría hacer amistades",
      color: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-100 hover:bg-purple-200 text-purple-700"
    },
    {
      icon: Globe,
      emoji: "🇳🇴",
      title: "Quiero integrarme",
      subtitle: "Entender mejor la cultura noruega",
      color: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      buttonColor: "bg-amber-100 hover:bg-amber-200 text-amber-700"
    }
  ];

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          ¿Qué estás buscando?
        </h2>
        <p className="text-base text-gray-600">
          Cada Språkkafé es diferente. Encuentra el que mejor se adapte a ti.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile, idx) => {
          const Icon = profile.icon;
          return (
            <button
              key={idx}
              className={`text-left bg-gradient-to-br ${profile.color} rounded-2xl border ${profile.borderColor} p-6 hover:shadow-md transition group cursor-pointer`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{profile.emoji}</div>
                  <Icon size={24} className="text-gray-400 group-hover:text-gray-600 transition" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {profile.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
