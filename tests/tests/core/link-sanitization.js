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
});
