import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import CommunitySignupModal from "./CommunitySignupModal";

export default function CommunityInviteSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        id="comunidad"
        aria-labelledby="community-invite-title"
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-5 py-7 text-white shadow-lg md:px-10 md:py-9"
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10" aria-hidden="true">
            <Mail size={21} />
          </div>
          <p className="text-sm font-semibold text-blue-100">Únete a la comunidad</p>
          <h2 id="community-invite-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Que no se te pase tu próxima oportunidad para practicar
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100 md:text-base">
            Recibe en tu email nuevas actividades publicadas, cambios de horario y aperturas de Språkkafé en Oslo.
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
          >
            Quiero recibir novedades
            <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="mt-3 text-xs text-blue-100">
            Solo información útil. Podrás darte de baja cuando quieras.
          </p>
        </div>
      </section>

      {showModal && <CommunitySignupModal onClose={() => setShowModal(false)} />}
    </>
  );
}
