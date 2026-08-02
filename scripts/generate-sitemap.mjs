import { readFile, writeFile } from "node:fs/promises";
import { INFORMATION_SLUGS } from "../src/utils/informationPages.js";

const projectRoot = new URL("../", import.meta.url);
const baseUrl = "https://sprakkafe-oslo.vercel.app";

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, projectRoot), "utf8"));
}

function createUrl(path, alternatePath, lastModified, priority, spanishPath = path.replace(/^\/en/, "/es")) {
  return [
    "  <url>",
    `    <loc>${baseUrl}${path}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${spanishPath}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${alternatePath}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${spanishPath}" />`,
    lastModified && `    <lastmod>${lastModified}</lastmod>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n");
}

const [activities, organizations] = await Promise.all([
  readJson("src/data/activities.json"),
  readJson("src/data/organizations.json"),
]);

const latestUpdate = [...activities, ...organizations]
  .map((item) => item.lastChecked)
  .filter(Boolean)
  .sort()
  .at(-1);

const urls = ["es", "en"].flatMap((locale) => [
  createUrl(`/${locale}`, "/en", latestUpdate, "1.0"),
  createUrl(`/${locale}/activities`, "/en/activities", latestUpdate, "0.9", "/es/activities"),
  ...INFORMATION_SLUGS[locale].map((slug, index) => {
    const spanishPath = `/es/info/${INFORMATION_SLUGS.es[index]}`;
    const englishPath = `/en/info/${INFORMATION_SLUGS.en[index]}`;
    return createUrl(`/${locale}/info/${slug}`, englishPath, "2026-08-01", "0.5", spanishPath);
  }),
  ...activities.map((activity) => (
    createUrl(
      `/${locale}/activity/${encodeURIComponent(activity.id)}`,
      `/en/activity/${encodeURIComponent(activity.id)}`,
      activity.lastChecked,
      "0.8",
    )
  )),
  ...organizations.map((organization) => (
    createUrl(
      `/${locale}/organization/${encodeURIComponent(organization.id)}`,
      `/en/organization/${encodeURIComponent(organization.id)}`,
      organization.lastChecked,
      "0.7",
    )
  )),
]);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("public/sitemap.xml", projectRoot), sitemap, "utf8");
