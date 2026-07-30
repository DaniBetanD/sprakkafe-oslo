import { Globe, MessageCircle, Users } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function MissionSection() {
  const { t } = useLanguage();
  const cards = [
    { icon: <Users size={22} />, title: t("missionCard1Title"), description: t("missionCard1Text") },
    { icon: <Globe size={22} />, title: t("missionCard2Title"), description: t("missionCard2Text") },
    { icon: <MessageCircle size={22} />, title: t("missionCard3Title"), description: t("missionCard3Text") },
  ];

  return (
    <div id="proyecto" className="py-4 md:py-6">
      <div className="max-w-2xl mb-6 md:mb-8">
        <p className="text-sm font-semibold text-blue-600">{t("missionEyebrow")}</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {t("missionTitle")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          {t("missionText")}
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
          {t("missionStatement")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {t("missionSupport")}
        </p>
      </div>

    </div>
  );
}
