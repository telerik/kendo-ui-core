import '@progress/kendo-ui/src/kendo.core.js';

describe("sanitize link", function() {

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

    it("sanitizes HTML data URLs", function() {
        assert.equal(kendo.sanitizeImageSrc("data:text/html,<script>alert(1)</script>"), "#INVALIDLINK");
    });

    it("sanitizes SVG data URLs", function() {
        assert.equal(kendo.sanitizeImageSrc("data:image/svg+xml,<svg onload='alert(1)'></svg>"), "#INVALIDLINK");
    });

    it("sanitizes script image sources", function() {
        assert.equal(kendo.sanitizeImageSrc("javascript:alert(1)"), "#INVALIDLINK");
    });
});
