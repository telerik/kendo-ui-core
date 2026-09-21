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
});
