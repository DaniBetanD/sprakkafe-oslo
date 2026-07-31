const ALLOWED_SCRIPT_SOURCES = [
    [window.location.origin, "/_vercel/insights/"],
    ["https://www.google.com", "/recaptcha/"],
    ["https://www.gstatic.com", "/recaptcha/"],
];

let defaultPolicy;

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
