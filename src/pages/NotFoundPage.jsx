import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import sprakkafeMark from "../assets/sprakkafe-mark.svg";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6" id="main-content">
      <section className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm md:p-9">
        <img src={sprakkafeMark} alt="" className="mx-auto h-14 w-14" aria-hidden="true" />
        <p className="mt-5 text-sm font-semibold text-blue-600">Error 404 · Página no encontrada</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          Parece que este Språkkafé se mudó sin avisar
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          La conversación continúa en otro lugar. Vuelve a las actividades y encuentra dónde practicar noruego.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Encontrar un Språkkafé
        </Link>
      </section>
    </main>
  );
}
