const ALLOWED_SCRIPT_SOURCES = [
    [window.location.origin, "/_vercel/insights/"],
    [window.location.origin, "/_vercel/speed-insights/"],
    ["https://www.google.com", "/recaptcha/"],
    ["https://www.gstatic.com", "/recaptcha/"],
];

let defaultPolicy;
let jsonLdPolicy;

function validateScriptUrl(url) {
    const parsedUrl = new URL(url, window.location.origin);
    const isAllowed = ALLOWED_SCRIPT_SOURCES.some(
        ([origin, path]) => parsedUrl.origin === origin && parsedUrl.pathname.startsWith(path),
    );

    if (!isAllowed) {
        throw new TypeError("URL de script no permitida");
    }

    return parsedUrl.href;
}

export function installTrustedTypesPolicy() {
    if (!window.trustedTypes) return null;

    defaultPolicy ??= window.trustedTypes.createPolicy("default", {
        createScriptURL: validateScriptUrl,
    });

    return defaultPolicy;
}

export function createTrustedScriptUrl(url) {
    const policy = installTrustedTypesPolicy();
    return policy ? policy.createScriptURL(url) : url;
}

export function createTrustedJsonLd(schema) {
    const serializedSchema = JSON.stringify(schema).replace(/</g, "\\u003c");

    if (!window.trustedTypes) return serializedSchema;

    jsonLdPolicy ??= window.trustedTypes.createPolicy("sprakkafe-json-ld", {
        createScript: (value) => value,
    });

    return jsonLdPolicy.createScript(serializedSchema);
}
