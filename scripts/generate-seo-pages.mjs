import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { localizeActivity, localizeOrganization } from "../src/i18n/contentTranslations.js";
import { getActivitiesSeo, getActivitySeo, getHomeSeo, getOrganizationSeo } from "../src/utils/seo.js";
import { getInformationSeo } from "../src/utils/seo.js";
import { getInformationPage, INFORMATION_SLUGS } from "../src/utils/informationPages.js";

const projectRoot = new URL("../", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);
const spanishDays = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, projectRoot), "utf8"));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function replaceMeta(html, selector, value) {
  const patterns = {
    description: /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
    ogTitle: /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?\s*>/,
    ogDescription: /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?\s*>/s,
    ogUrl: /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/,
    twitterTitle: /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?\s*>/,
    twitterDescription: /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?\s*>/s,
  };
  const tags = {
    description: `<meta name="description" content="${escapeHtml(value)}" />`,
    ogTitle: `<meta property="og:title" content="${escapeHtml(value)}" />`,
    ogDescription: `<meta property="og:description" content="${escapeHtml(value)}" />`,
    ogUrl: `<meta property="og:url" content="${escapeHtml(value)}" />`,
    twitterTitle: `<meta name="twitter:title" content="${escapeHtml(value)}" />`,
    twitterDescription: `<meta name="twitter:description" content="${escapeHtml(value)}" />`,
  };
  return html.replace(patterns[selector], tags[selector]);
}

function renderDocument(template, seo, locale, content) {
  const canonicalUrl = `https://sprakkafe-oslo.vercel.app${seo.pathname}`;
  const otherLocale = locale === "en" ? "es" : "en";
  const otherPath = seo.alternatePath || seo.pathname.replace(`/${locale}`, `/${otherLocale}`);
  const alternates = [
    `<link rel="alternate" hreflang="${locale}" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="${otherLocale}" href="https://sprakkafe-oslo.vercel.app${otherPath}" />`,
    `<link rel="alternate" hreflang="x-default" href="https://sprakkafe-oslo.vercel.app${locale === "es" ? seo.pathname : otherPath}" />`,
  ].join("\n    ");

  let html = template
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*\/>/g, "")
    .replace(/<html lang="[^"]+">/, `<html lang="${locale}">`)
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]+"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />\n    ${alternates}`)
    .replace(/<script(?: id="page-structured-data")? type="application\/ld\+json">.*?<\/script>/s,
      `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(seo.schema)}</script>`)
    .replace('<div id="root"></div>', `<div id="root"></div><noscript>${content}</noscript>`);

  html = replaceMeta(html, "description", seo.description);
  html = replaceMeta(html, "ogTitle", seo.title);
  html = replaceMeta(html, "ogDescription", seo.description);
  html = replaceMeta(html, "ogUrl", canonicalUrl);
  html = replaceMeta(html, "twitterTitle", seo.title);
  html = replaceMeta(html, "twitterDescription", seo.description);
  return html;
}

function informationFallback(content) {
  return `<main id="main-content" data-seo-fallback><article>
    <h1>${escapeHtml(content.title)}</h1>
    <p>${escapeHtml(content.intro)}</p>
    ${content.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${section.items ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}</section>`).join("")}
  </article></main>`;
}

function activityFallback(activity, organization, locale) {
  const labels = locale === "en"
    ? { schedule: "Schedule", address: "Location", source: "Official information", organizer: "Organised by" }
    : { schedule: "Horario", address: "Lugar", source: "Información oficial", organizer: "Organiza" };
  const visibleDay = locale === "en" ? activity.day : spanishDays[activity.day] || activity.day;
  return `<main id="main-content" data-seo-fallback>
    <article>
      <h1>${escapeHtml(activity.name)}</h1>
      <p>${escapeHtml(activity.description)}</p>
      <dl>
        <dt>${labels.schedule}</dt><dd>${escapeHtml([visibleDay, activity.time, activity.endTime].filter(Boolean).join(" · "))}</dd>
        <dt>${labels.address}</dt><dd>${escapeHtml(activity.address || activity.district || "Oslo")}</dd>
        <dt>${labels.organizer}</dt><dd><a href="/${locale}/organization/${encodeURIComponent(organization?.id || "")}">${escapeHtml(organization?.name || "")}</a></dd>
      </dl>
      ${activity.sourceUrl ? `<p><a href="${escapeHtml(activity.sourceUrl)}">${labels.source}</a></p>` : ""}
    </article>
  </main>`;
}

function organizationFallback(organization, organizationActivities, locale) {
  const heading = locale === "en" ? "Activities" : "Actividades";
  return `<main id="main-content" data-seo-fallback>
    <article>
      <h1>${escapeHtml(organization.name)}</h1>
      <p>${escapeHtml(organization.description)}</p>
      <h2>${heading}</h2>
      <ul>${organizationActivities.map((activity) => (
        `<li><a href="/${locale}/activity/${encodeURIComponent(activity.id)}">${escapeHtml(activity.name)}</a></li>`
      )).join("")}</ul>
      ${organization.website ? `<p><a href="${escapeHtml(organization.website)}">${locale === "en" ? "Official website" : "Sitio oficial"}</a></p>` : ""}
    </article>
  </main>`;
}

function homeFallback(localizedActivities, locale) {
  const intro = locale === "en"
    ? "Find free activities in Oslo where you can practise Norwegian, meet people and take part in the community."
    : "Encuentra actividades gratuitas en Oslo para practicar noruego, conocer personas y sentirte parte de la comunidad.";
  return `<main id="main-content" data-seo-fallback>
    <h1>${locale === "en" ? "Find your Språkkafé in Oslo" : "Encuentra tu Språkkafé en Oslo"}</h1>
    <p>${intro}</p>
    <h2>${locale === "en" ? "Activities" : "Actividades"}</h2>
    <ul>${localizedActivities.map((activity) => (
      `<li><a href="/${locale}/activity/${encodeURIComponent(activity.id)}">${escapeHtml(activity.name)}</a> — ${escapeHtml(activity.district || "Oslo")}</li>`
    )).join("")}</ul>
  </main>`;
}

function activitiesFallback(localizedActivities, locale) {
  const title = locale === "en" ? "All activities" : "Todas las actividades";
  const intro = locale === "en"
    ? "Browse available activities in Oslo where you can practise Norwegian and meet people."
    : "Consulta las actividades disponibles en Oslo para practicar noruego y conocer personas.";
  return `<main id="main-content" data-seo-fallback>
    <h1>${title}</h1>
    <p>${intro}</p>
    <ul>${localizedActivities.map((activity) => (
      `<li><a href="/${locale}/activity/${encodeURIComponent(activity.id)}">${escapeHtml(activity.name)}</a> â€” ${escapeHtml(activity.district || "Oslo")}</li>`
    )).join("")}</ul>
  </main>`;
}

async function writePage(relativePath, html) {
  const outputUrl = new URL(relativePath, distRoot);
  await mkdir(dirname(fileURLToPath(outputUrl)), { recursive: true });
  await writeFile(outputUrl, html, "utf8");
}

const [activities, organizations, esTemplate, enTemplate] = await Promise.all([
  readJson("src/data/activities.json"),
  readJson("src/data/organizations.json"),
  readFile(new URL("index.html", distRoot), "utf8"),
  readFile(new URL("en.html", distRoot), "utf8"),
]);

for (const locale of ["es", "en"]) {
  const template = locale === "en" ? enTemplate : esTemplate;
  const localizedActivities = activities.map((activity) => localizeActivity(activity, locale));
  const localizedOrganizations = organizations.map((organization) => localizeOrganization(organization, locale));
  const homeSeo = getHomeSeo(localizedActivities, locale);
  const homeHtml = renderDocument(template, homeSeo, locale, homeFallback(localizedActivities, locale));
  await writePage(locale === "en" ? "en.html" : "index.html", homeHtml);

  const activitiesSeo = getActivitiesSeo(localizedActivities, locale);
  const activitiesHtml = renderDocument(template, activitiesSeo, locale, activitiesFallback(localizedActivities, locale));
  await writePage(`seo/${locale}/activities.html`, activitiesHtml);

  for (const slug of INFORMATION_SLUGS[locale]) {
    const content = getInformationPage(slug, locale);
    const seo = getInformationSeo(slug, content, locale);
    const html = renderDocument(template, seo, locale, informationFallback(content));
    await writePage(`seo/${locale}/info/${encodeURIComponent(slug)}.html`, html);
  }

  for (const activity of localizedActivities) {
    const organization = localizedOrganizations.find((item) => item.id === activity.organizationId);
    const seo = getActivitySeo(activity, organization, locale);
    const html = renderDocument(template, seo, locale, activityFallback(activity, organization, locale));
    await writePage(`seo/${locale}/activity/${encodeURIComponent(activity.id)}.html`, html);
  }

  for (const organization of localizedOrganizations) {
    const organizationActivities = localizedActivities.filter((activity) => activity.organizationId === organization.id);
    const seo = getOrganizationSeo(organization, locale);
    const html = renderDocument(template, seo, locale, organizationFallback(organization, organizationActivities, locale));
    await writePage(`seo/${locale}/organization/${encodeURIComponent(organization.id)}.html`, html);
  }
}

const notFoundHtml = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Página no encontrada | Språkkafé Oslo</title></head><body><main><h1>Página no encontrada</h1><p>La conversación continúa en otro lugar.</p><a href="/es">Encontrar un Språkkafé</a></main></body></html>`;
await writePage("404.html", notFoundHtml);
