import { readdir, readFile } from "node:fs/promises";

const activitySeoRoot = new URL("../dist/seo/", import.meta.url);
const schemaMarker = 'id="page-structured-data" type="application/ld+json">';
const errors = [];

for (const locale of ["es", "en"]) {
  const activityRoot = new URL(`${locale}/activity/`, activitySeoRoot);
  const files = (await readdir(activityRoot)).filter(
    (file) => file.startsWith("caritas-") && file.endsWith(".html"),
  );

  for (const file of files) {
    const html = await readFile(new URL(file, activityRoot), "utf8");
    if (!html.includes(schemaMarker)) {
      errors.push(`${locale}/activity/${file}: falta el bloque JSON-LD`);
      continue;
    }

    const schema = JSON.parse(html.split(schemaMarker)[1].split("</script>")[0]);
    if (schema["@type"] === "Event" && !schema.startDate) {
      errors.push(`${locale}/activity/${file}: Event sin startDate principal`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("JSON-LD Event válido: todas las páginas incluyen startDate principal.");
}
