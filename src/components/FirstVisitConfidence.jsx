import { Ear, MessageCircle, ShieldCheck, UserRound } from "lucide-react";

const reassurances = [
  {
    icon: UserRound,
    title: "Puedes venir solo",
    description: "No necesitas conocer a nadie antes.",
  },
  {
    icon: Ear,
    title: "Puedes escuchar primero",
    description: "Participa cuando te sientas preparado.",
  },
  {
    icon: MessageCircle,
    title: "No tienes que hablar perfecto",
    description: "El objetivo es practicar, no hacerlo sin errores.",
  },
];

export default function FirstVisitConfidence() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600 shadow-sm" aria-hidden="true">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h2 id="first-visit-title" className="text-lg font-bold text-gray-900 md:text-xl">
            Tu primera vez puede ser sencilla
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Es normal sentir un poco de inseguridad. Puedes empezar a tu ritmo.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {reassurances.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3 rounded-xl bg-white/80 p-3.5">
              <Icon size={18} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
