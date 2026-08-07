import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SeoMetadata from "../components/SeoMetadata";
import { getLocalizedGuides, guideHubContent } from "../data/guides";
import { useLanguage } from "../i18n/LanguageContext";
import { getGuidesSeo } from "../utils/seo";

export default function GuidesPage() {
  const { locale, pathFor, t } = useLanguage();
  const content = guideHubContent[locale];
  const localizedGuides = getLocalizedGuides(locale);
  const seo = getGuidesSeo(localizedGuides, locale);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <SeoMetadata {...seo} locale={locale} />
      <Header />
      <main id="main-content" className="flex-grow pb-14">
        <section className="border-b border-blue-100 bg-blue-50">
          <div className="mx-auto max-w-5xl px-4 py-9 md:px-6 md:py-14">
            <Link to={pathFor("/")} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 hover:text-blue-800">
              {t("backHome")}
            </Link>
            <p className="mt-2 text-sm font-semibold text-blue-700">{content.eyebrow}</p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
              {content.intro}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-9 md:px-6 md:py-12" aria-label={content.title}>
          <div className="grid gap-5 sm:grid-cols-2">
            {localizedGuides.map((guide) => (
              <article key={guide.slug} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700" aria-hidden="true">
                  <BookOpen size={21} />
                </div>
                <p className="mt-5 text-sm font-semibold text-blue-700">{guide.eyebrow}</p>
                <h2 className="mt-2 text-xl font-bold leading-snug text-gray-950">{guide.title}</h2>
                <p className="mt-3 flex-1 leading-7 text-gray-600">{guide.description}</p>
                <p className="mt-5 text-sm text-gray-500">{guide.readingTime}</p>
                <Link
                  to={pathFor(`/guides/${guide.slug}`)}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  {content.readGuide}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
