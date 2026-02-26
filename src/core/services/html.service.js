// Regex patterns for HTML encoding
const ampRegExp = /&/g;
const ltRegExp = /</g;
const quoteRegExp = /"/g;
const aposRegExp = /'/g;
const gtRegExp = />/g;
// Allowed protocols for sanitized links
const ALLOWED_PROTOCOLS = ["http:", "https:"];
/**
 * Service for HTML encoding, decoding, and sanitization
 */
class HtmlService {
    /**
     * Decode HTML entities to their character equivalents
     */
    decode(value) {
        const entities = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'"
        };
        return value.replace(/&(?:amp|lt|gt|quot|#39);/g, function (match) {
            return entities[match];
        });
    }
    /**
     * Encode special characters to HTML entities
     */
    encode(value, shouldDecode) {
        if (shouldDecode === true) {
            value = this.decode(value);
        }
        return ("" + value)
            .replace(ampRegExp, "&amp;")
            .replace(ltRegExp, "&lt;")
            .replace(gtRegExp, "&gt;")
            .replace(quoteRegExp, "&quot;")
            .replace(aposRegExp, "&#39;");
    }
    /**
     * Sanitize a URL to prevent XSS attacks
     * Only allows http: and https: protocols
     */
    sanitizeLink(value) {
        let link = "";
        try {
            // Use the default origin in case the value is a relative URL.
            const url = new URL(value, window.location.origin);
            if (ALLOWED_PROTOCOLS.includes(url.protocol)) {
                link = value;
            }
            else {
                throw new Error("Invalid protocol");
            }
        }
        catch (_a) {
            link = "#INVALIDLINK";
        }
        return this.encode(link);
    }
    /**
     * Convert text URLs to clickable HTML links
     */
    convertTextUrlToLink(text, skipSanitization) {
        const urlRegex = /((https?:\/\/[^\s"'<>]+)|(www\.[^\s"'<>]+))/gi;
        const processedText = skipSanitization ? text : this.encode(text);
        return processedText.replace(urlRegex, (match, _p1, _p2, _p3, offset, fullString) => {
            const lastTagClose = fullString.lastIndexOf('>', offset - 1);
            const beforeMatch = fullString.substring(lastTagClose + 1, offset);
            if (/\w+\s*=\s*["']$/.test(beforeMatch)) {
                return match;
            }
            let url = match.trim();
            const displayText = match.trim();
            if (/^www\./i.test(url)) {
                url = 'https://' + url;
            }
            try {
                url = new URL(url).href;
                const target = '_blank';
                const rel = 'noopener noreferrer';
                return `<a href="${url}" target="${target}"${rel ? ` rel="${rel}"` : ''}>${displayText}</a>`;
            }
            catch (e) { //NOSONAR - No need to handle/log the error here.
                // If URL is invalid, return original text
                return match;
            }
        });
    }
    /**
     * Unescape URL-encoded strings
     */
    unescape(value) {
        let template;
        try {
            template = window.decodeURIComponent(value);
        }
        catch (error) {
            // If the string contains Unicode characters
            // the decodeURIComponent() will throw an error.
            // Therefore: convert to UTF-8 character
            template = value.replace(/%u([\dA-F]{4})|%([\dA-F]{2})/gi, function (_, m1, m2) {
                return String.fromCharCode(parseInt("0x" + (m1 || m2), 16));
            });
        }
        return template;
    }
}
export const htmlService = new HtmlService();
