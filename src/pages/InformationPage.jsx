import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SeoMetadata from "../components/SeoMetadata";
import { useLanguage } from "../i18n/LanguageContext";
import { getInformationPage } from "../utils/informationPages";
import { getInformationSeo } from "../utils/seo";

export default function InformationPage() {
  const { page } = useParams();
  const { locale, pathFor, t } = useLanguage();
  const content = getInformationPage(page, locale);

  if (!content) return null;

  const seo = getInformationSeo(page, content, locale);

  return (
    <>
      <SeoMetadata {...seo} locale={locale} />
      <Header />
      <main id="main-content" className="bg-gray-50 px-6 py-12 md:py-16">
        <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <p className="mb-3 text-sm font-semibold text-blue-600">{content.eyebrow}</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">{content.title}</h1>
          <p className="mt-5 text-lg leading-8 text-gray-700">{content.intro}</p>

          <div className="mt-10 space-y-9">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-gray-950">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-7 text-gray-700">{paragraph}</p>
                ))}
                {section.items && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-gray-700">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <Link to={pathFor("/")} className="font-semibold text-blue-600 hover:text-blue-700">
              {t("backHome")} →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
