const BREVO_DOI_URL = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSiteUrl(request) {
    if (process.env.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL;
    const host = request.headers["x-forwarded-host"] || request.headers.host;
    const protocol = request.headers["x-forwarded-proto"] || "https";
    return `${protocol}://${host}`;
}

export default async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ error: "method_not_allowed" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);
    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);

    if (!apiKey || !Number.isInteger(listId) || !Number.isInteger(templateId)) {
        console.error("Community signup is missing Brevo configuration.");
        return response.status(503).json({ error: "service_unavailable" });
    }

    const email = String(request.body?.email || "").trim().toLowerCase();
    const consent = request.body?.consent === true;
    const website = String(request.body?.website || "").trim();

    if (website) return response.status(200).json({ ok: true });
    if (!EMAIL_PATTERN.test(email) || !consent) {
        return response.status(400).json({ error: "invalid_request" });
    }

    try {
        const brevoResponse = await fetch(BREVO_DOI_URL, {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                includeListIds: [listId],
                redirectionUrl: `${getSiteUrl(request)}/?subscription=confirmed`,
                templateId,
            }),
        });

        if (!brevoResponse.ok) {
            console.error("Brevo DOI request failed.", brevoResponse.status);
            return response.status(502).json({ error: "provider_error" });
        }

        return response.status(201).json({ ok: true });
    } catch (error) {
        console.error("Brevo DOI request could not be completed.", error);
        return response.status(502).json({ error: "provider_error" });
    }
}
