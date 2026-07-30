import { readFile, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const baseUrl = "https://sprakkafe-oslo.vercel.app";

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, projectRoot), "utf8"));
}

function createUrl(path, lastModified, priority) {
  return [
    "  <url>",
    `    <loc>${baseUrl}${path}</loc>`,
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
  createUrl(`/${locale}`, latestUpdate, "1.0"),
  ...activities.map((activity) => (
    createUrl(`/${locale}/activity/${encodeURIComponent(activity.id)}`, activity.lastChecked, "0.8")
  )),
  ...organizations.map((organization) => (
    createUrl(`/${locale}/organization/${encodeURIComponent(organization.id)}`, organization.lastChecked, "0.7")
  )),
]);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("public/sitemap.xml", projectRoot), sitemap, "utf8");
