import '@progress/kendo-ui/src/kendo.core.js';
import { htmlService } from '@progress/kendo-ui/core/services/html.service.js';
import { isSafeUrl, resolveUrlProtocol } from '@progress/kendo-ui/src/utils/url.js';

const commonUrls = [
    "http://example.test/resource",
    "https://example.test/resource"
];
const linkUrls = [
    "mailto:user@example.test",
    "tel:+1234567890",
    "sms:+1234567890",
    "xmpp:user@example.test",
    "matrix:u/user:example.test",
    "callto:user",
    "MaIlTo:user@example.test"
];
const unsafeUrls = [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    " \t\r\njavascript:alert(1)",
    "\u0000javascript:alert(1)",
    "java\tscript:alert(1)",
    "java\nscript:alert(1)",
    "java\rscript:alert(1)",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "about:blank",
    "custom:resource",
    "ftp://example.test/resource",
    "ftps://example.test/resource",
    "http://",
    "https://[::1",
    "https://example.test:65536/resource",
    "https://%",
    "/\uD800"
];

describe("sanitize link", function() {

    commonUrls.concat(linkUrls).forEach(function(url) {
        it(`allows the link protocol in ${url}`, function() {
            assert.equal(kendo.sanitizeLink(url), url);
        });
    });

    it("allows http links", function() {
        assert.equal(kendo.sanitizeLink("http://telerik.com/"), "http://telerik.com/");
    });

    it("allows https links", function() {
        assert.equal(kendo.sanitizeLink("https://telerik.com/"), "https://telerik.com/");
    });

    it("allows same page links starting with #", function() {
        assert.equal(kendo.sanitizeLink("#test"), "#test");
    });

    it("sanitizes links that start with javascript:", function() {
        assert.equal(kendo.sanitizeLink("javascript:console.log(5)"), "#INVALIDLINK");
    });

    it("encodes content that can escape a quoted href attribute", function() {
        const link = "https://example.test/' onclick='window.probe.clicked=1;event.preventDefault()";

        assert.equal(kendo.sanitizeLink(link), "https://example.test/&#39;%20onclick=&#39;window.probe.clicked=1;event.preventDefault()");
    });

    it("does not create additional attributes when used in unquoted HTML", function() {
        const link = "https://example.test/path onclick=window.probe.clicked=1";
        const anchor = $("<a href=" + kendo.sanitizeLink(link) + ">");

        assert.isUndefined(anchor.attr("onclick"));
        assert.equal(anchor.attr("href"), "https://example.test/path%20onclick=window.probe.clicked=1");
    });

    it("encodes control whitespace in links", function() {
        assert.equal(kendo.sanitizeLink("https://example.test/path\nondblclick=probe()"), "https://example.test/path%0Aondblclick=probe()");
    });

    it("encodes URL metacharacters", function() {
        assert.equal(kendo.sanitizeLink("https://example.test/?first=1&second=\"two\""), "https://example.test/?first=1&amp;second=%22two%22");
    });

    it("preserves existing percent escapes", function() {
        assert.equal(kendo.sanitizeLink("/a%20b"), "/a%20b");
    });

    it("preserves brackets around IPv6 hosts", function() {
        assert.equal(kendo.sanitizeLink("http://[::1]/path"), "http://[::1]/path");
    });

    it("rejects data links", function() {
        assert.equal(kendo.sanitizeLink("data:text/html,<script>probe()</script>"), "#INVALIDLINK");
    });

    it("sanitizes links that use the data protocol", function() {
        assert.equal(kendo.sanitizeLink("data:text/html,<script>alert(1)</script>"), "#INVALIDLINK");
        assert.equal(kendo.sanitizeLink("data:image/png;base64,AAAA"), "#INVALIDLINK");
    });
});

describe("sanitize image source", function() {

    commonUrls.concat([
        "cid:logo@example.test",
        "blob:https://example.test/12345678-1234-1234-1234-123456789012"
    ]).forEach(function(url) {
        it(`allows the image protocol in ${url}`, function() {
            assert.equal(kendo.sanitizeImageSrc(url), url);
        });
    });

    linkUrls.forEach(function(url) {
        it(`rejects the link-only image source ${url}`, function() {
            assert.equal(kendo.sanitizeImageSrc(url), "#INVALIDLINK");
        });
    });

    it("allows mixed-case data image protocols and MIME types", function() {
        const source = "DaTa:IMAGE/PNG;base64,AAAA";

        assert.equal(kendo.sanitizeImageSrc(source), source);
    });

    it("allows http and https image sources", function() {
        assert.equal(kendo.sanitizeImageSrc("http://telerik.com/image.png"), "http://telerik.com/image.png");
        assert.equal(kendo.sanitizeImageSrc("https://telerik.com/image.png"), "https://telerik.com/image.png");
    });

    it("allows relative image sources", function() {
        assert.equal(kendo.sanitizeImageSrc("/images/image.png"), "/images/image.png");
    });

    it("preserves brackets around IPv6 hosts", function() {
        assert.equal(kendo.sanitizeImageSrc("http://[::1]/image.png"), "http://[::1]/image.png");
    });

    it("allows non-scriptable image data MIME types", function() {
        [
            "image/apng",
            "image/avif",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/vnd.microsoft.icon",
            "image/webp",
            "image/x-icon"
        ].forEach(function(mimeType) {
            const source = `data:${mimeType};base64,AAAA`;
            assert.equal(kendo.sanitizeImageSrc(source), source);
        });
    });

    it("allows HTML data URLs with URL encoding", function() {
        assert.equal(kendo.sanitizeImageSrc("data:text/html,<script>alert(1)</script>"), "data:text/html,%3Cscript%3Ealert(1)%3C/script%3E");
    });

    it("allows SVG data URLs with URL and HTML encoding", function() {
        assert.equal(kendo.sanitizeImageSrc("data:image/svg+xml,<svg onload='alert(1)'></svg>"), "data:image/svg+xml,%3Csvg%20onload=&#39;alert(1)&#39;%3E%3C/svg%3E");
    });

    it("allows data URLs without an explicit MIME type", function() {
        assert.equal(kendo.sanitizeImageSrc("data:;base64,AAAA"), "data:;base64,AAAA");
    });

    it("sanitizes script image sources", function() {
        assert.equal(kendo.sanitizeImageSrc("javascript:alert(1)"), "#INVALIDLINK");
    });
});

["sanitizeLink", "sanitizeImageSrc"].forEach(function(method) {
    describe(method + " validation", function() {
        unsafeUrls.forEach(function(url) {
            it(`rejects ${JSON.stringify(url)}`, function() {
                assert.equal(kendo[method](url), "#INVALIDLINK");
            });
        });

        [undefined, null, true, false, 0, 123, NaN, {}, [], ["https://example.test"], Object("https://example.test"), Symbol("url")].forEach(function(value, index) {
            it(`rejects non-string input ${index}`, function() {
                assert.equal(kendo[method](value), "#INVALIDLINK");
            });
        });

        it("does not coerce objects to strings", function() {
            let called = false;
            const value = {
                toString: function() {
                    called = true;
                    return "https://example.test";
                }
            };

            assert.equal(kendo[method](value), "#INVALIDLINK");
            assert.isFalse(called);
        });

        ["images/photo.png", "./photo.png", "../photo.png", "/images/photo.png", "//cdn.example.test/photo.png", "?download=1", "#section", "", "javascript%3Aalert(1)", "/javascript:alert(1)"].forEach(function(url) {
            it(`preserves the relative URL ${JSON.stringify(url)}`, function() {
                assert.equal(kendo[method](url), url);
            });
        });

        ["http://[::1]/resource", "https://[::1]/resource", "//[::1]/resource"].forEach(function(url) {
            it(`preserves the IPv6 host in ${url}`, function() {
                assert.equal(kendo[method](url), url);
            });
        });

        it("preserves percent escapes while encoding HTML and URL metacharacters", function() {
            assert.equal(kendo[method]("/a%20b?first=1&second=\"two\"'"), "/a%20b?first=1&amp;second=%22two%22&#39;");
        });
    });
});

describe("sanitize iframe URL", function() {
    ["http://example.test/", "https://example.test/", "/content", "about:blank"].forEach(function(url) {
        it(`allows ${url}`, function() {
            assert.equal(htmlService.sanitizeIframeUrl(url), url);
        });
    });

    linkUrls.concat([
        "cid:logo@example.test",
        "blob:https://example.test/id",
        "data:image/png;base64,AAAA",
        "javascript:alert(1)"
    ]).forEach(function(url) {
        it(`rejects the non-iframe protocol in ${url}`, function() {
            assert.equal(htmlService.sanitizeIframeUrl(url), "#INVALIDLINK");
            assert.equal(htmlService.sanitizeIframeUrl(url, false), "#INVALIDLINK");
        });
    });

    it("encodes iframe attributes by default", function() {
        assert.equal(htmlService.sanitizeIframeUrl("/content?first=1&second=\"two\""), "/content?first=1&amp;second=%22two%22");
    });

    it("supports DOM assignment without HTML encoding", function() {
        assert.equal(htmlService.sanitizeIframeUrl("/content?first=1&second=\"two\"", false), "/content?first=1&second=%22two%22");
    });
});

describe("shared URL validation", function() {
    it("resolves relative URLs against a fixed HTTPS base", function() {
        assert.equal(resolveUrlProtocol("/content"), "https:");
        assert.equal(resolveUrlProtocol(""), "https:");
    });

    it("returns null for malformed URLs", function() {
        assert.isNull(resolveUrlProtocol("https://[::1"));
    });

    it("allows cid URLs only for images", function() {
        assert.isTrue(isSafeUrl("cid:logo@example.test", "image"));
        assert.isFalse(isSafeUrl("cid:logo@example.test", "link"));
        assert.equal(kendo.sanitizeLink("cid:logo@example.test"), "#INVALIDLINK");
    });

    ["data:image/png;base64,AAAA", "blob:https://example.test/id"].forEach(function(url) {
        it(`allows ${url} only for images`, function() {
            assert.isTrue(isSafeUrl(url, "image"));
            assert.isFalse(isSafeUrl(url, "link"));
            assert.equal(kendo.sanitizeLink(url), "#INVALIDLINK");
        });
    });

    [" \thttps://example.test/resource\r\n", "h\ttt\nps:\r//example.test/resource"].forEach(function(url) {
        it(`uses browser protocol normalization for ${JSON.stringify(url)}`, function() {
            assert.isTrue(isSafeUrl(url, "link"));
            assert.isTrue(isSafeUrl(url, "image"));
        });
    });

    [undefined, null, "", "video"].forEach(function(context) {
        it(`rejects invalid context ${JSON.stringify(context)}`, function() {
            assert.isFalse(isSafeUrl("https://example.test", context));
        });
    });
});
