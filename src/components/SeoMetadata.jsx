import { useEffect } from "react";
import { localizePath } from "../i18n/locale";

const SITE_URL = "https://sprakkafe-oslo.vercel.app";

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function ensureLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export default function SeoMetadata({ title, description, locale, pathname, alternatePath, schema, noIndex = false }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname}`;
    const resolvedAlternatePath = alternatePath || localizePath(pathname, locale === "en" ? "es" : "en");
    const imageUrl = `${SITE_URL}/${locale === "en" ? "og-sprakkafe-en.png" : "og-sprakkafe-es.png"}`;

    document.title = title;
    document.documentElement.lang = locale;
    ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[name="robots"]', { name: "robots", content: noIndex ? "noindex, follow" : "index, follow" });
    ensureLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    for (const language of ["es", "en"]) {
      const localizedPath = language === locale ? pathname : resolvedAlternatePath;
      ensureLink(`link[rel="alternate"][hreflang="${language}"]`, {
        rel: "alternate",
        hreflang: language,
        href: `${SITE_URL}${localizedPath}`,
      });
    }
    ensureLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: `${SITE_URL}${localizePath(pathname, "es")}`,
    });

    const socialMeta = [
      ['meta[property="og:title"]', { property: "og:title", content: title }],
      ['meta[property="og:description"]', { property: "og:description", content: description }],
      ['meta[property="og:url"]', { property: "og:url", content: canonicalUrl }],
      ['meta[property="og:image"]', { property: "og:image", content: imageUrl }],
      ['meta[name="twitter:title"]', { name: "twitter:title", content: title }],
      ['meta[name="twitter:description"]', { name: "twitter:description", content: description }],
      ['meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl }],
    ];
    socialMeta.forEach(([selector, attributes]) => ensureMeta(selector, attributes));

    let structuredData = document.getElementById("page-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "page-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [alternatePath, description, locale, noIndex, pathname, schema, title]);

  return null;
}
