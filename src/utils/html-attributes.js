import { htmlService } from "../core/index.js";

const INVALID_LINK = "#INVALIDLINK";
const validAttributeNameRegExp = /^[a-zA-Z_:][a-zA-Z0-9_:.-]*$/;
const markupAttributeRegExp = /^srcdoc$/i;
const urlAttributeRegExp = /^(href|xlink:href|action|formaction|cite|data|ping|poster|background|longdesc|manifest)$/i;
const imageSourceAttributeRegExp = /^src$/i;

export function isSafeAttributeName(name) {
    return typeof name === "string" &&
        validAttributeNameRegExp.test(name) &&
        !markupAttributeRegExp.test(name);
}

export function sanitizeAttributeValue(name, value, encodeValue = true) {
    let sanitized;

    if (imageSourceAttributeRegExp.test(name)) {
        sanitized = htmlService.sanitizeImageSrc(value);
    } else if (urlAttributeRegExp.test(name)) {
        sanitized = htmlService.sanitizeLink(value);
    } else {
        return encodeValue ? htmlService.encode(value) : value;
    }

    return encodeValue || sanitized === INVALID_LINK ? sanitized : value;
}

export function renderAttr(name, value, encodeValue = (item) => sanitizeAttributeValue(name, item)) {
    if (value === null || value === undefined || !isSafeAttributeName(name)) {
        return "";
    }

    return ` ${name}="${encodeValue(value)}" `;
}

export function renderAttrs(attributes, skipName) {
    let result = "";

    for (const name in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, name) && !(skipName && skipName(name))) {
            result += renderAttr(name, attributes[name]);
        }
    }

    return result;
}

export function applyAttrs(element, attributes) {
    for (const name in attributes) {
        const value = attributes[name];

        if (Object.prototype.hasOwnProperty.call(attributes, name) && value !== null && value !== undefined && isSafeAttributeName(name)) {
            const resolvedValue = typeof value === "function"
                ? function(index, oldValue) {
                    return sanitizeAttributeValue(name, value.call(this, index, oldValue), false);
                }
                : sanitizeAttributeValue(name, value, false);

            element.attr(name, resolvedValue);
        }
    }

    return element;
}

export function sanitizeAttributes(attributes) {
    const result = {};

    for (const name in attributes) {
        const value = attributes[name];

        if (Object.prototype.hasOwnProperty.call(attributes, name) && value !== null && value !== undefined && isSafeAttributeName(name)) {
            result[name] = sanitizeAttributeValue(name, value, false);
        }
    }

    return result;
}
