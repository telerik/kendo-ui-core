const URL_VALIDATION_BASE = "https://url-validation.invalid/";
const COMMON_PROTOCOLS = [
    "http:",
    "https:"
];
const LINK_PROTOCOLS = new Set(COMMON_PROTOCOLS.concat([
    "mailto:",
    "tel:",
    "sms:",
    "xmpp:",
    "matrix:",
    "callto:"
]));
const IMAGE_PROTOCOLS = new Set(COMMON_PROTOCOLS.concat([
    "cid:",
    "data:",
    "blob:"
]));
export const resolveUrlProtocol = (url) => {
    try {
        return new URL(url, URL_VALIDATION_BASE).protocol;
    }
    catch (_a) {
        return null;
    }
};
export const isSafeUrl = (url, context) => {
    if (typeof url !== "string") {
        return false;
    }
    const protocol = resolveUrlProtocol(url);
    if (protocol === null) {
        return false;
    }
    if (context === "image") {
        return IMAGE_PROTOCOLS.has(protocol);
    }
    else if (context === "link") {
        return LINK_PROTOCOLS.has(protocol);
    }
    return false;
};
