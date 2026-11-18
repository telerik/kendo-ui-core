import '@progress/kendo-ui/src/kendo.core.js';
import { htmlService } from '@progress/kendo-ui/core/services/html.service.js';
import { isSafeUrl, resolveUrlProtocol } from '@progress/kendo-ui/src/utils/url.js';

const linkUrls = [
    "mailto:user@example.test",
    "tel:+1234567890",
    "sms:+1234567890",
    "xmpp:user@example.test",
    "matrix:u/user:example.test",
    "callto:user",
    "MaIlTo:user@example.test"
];

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
