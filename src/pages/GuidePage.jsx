import { ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SeoMetadata from "../components/SeoMetadata";
import { getGuide } from "../data/guides";
import { useLanguage } from "../i18n/LanguageContext";
import { getGuideSeo } from "../utils/seo";

export default function GuidePage() {
  const { slug } = useParams();
  const { locale, pathFor, t } = useLanguage();
  const guide = getGuide(slug, locale);

  if (!guide) return <Navigate to={pathFor("/guides")} replace />;

  const seo = getGuideSeo(guide, locale);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SeoMetadata {...seo} locale={locale} />
      <Header />
      <main id="main-content" className="flex-grow px-4 py-8 md:px-6 md:py-14">
        <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <Link to={pathFor("/guides")} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 hover:text-blue-800">
            {t("backToGuides")}
          </Link>
          <p className="mt-3 text-sm font-semibold text-blue-700">{guide.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">{guide.title}</h1>
          <p className="mt-3 text-sm text-gray-500">{guide.readingTime}</p>
          <p className="mt-6 text-lg leading-8 text-gray-700">{guide.intro}</p>

          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-gray-950 md:text-2xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-7 text-gray-700">{paragraph}</p>
                ))}
                {section.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-gray-950">{guide.ctaTitle}</h2>
            <p className="mt-2 leading-7 text-gray-700">{guide.ctaText}</p>
            <Link
              to={pathFor("/activities")}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {guide.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
