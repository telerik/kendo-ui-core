(function() {

    module("try-kendo")

    test("add base redirect tag", function() {
        var result = dojo.addBaseRedirectTag("<html><head></head><body></body></html>",
                "http://kendo.com/someUrl");
        ok(result.indexOf('<base href="http://kendo.com/someUrl">') !== -1);
    });

    test("fixes line ednings", function() {
        var initial = "this is some text\n and there are \n 2 new lines and \n one at the end";
        var result = dojo.fixLineEndings(initial);
        equal(result.match(/&#10/g).length, 3);
    });

    test("update scripts/styles to reference the CDN", function() {
        $.extend(dojo, {
            configuration: {
                cdnRoot: "http://mysite.com/myversion"
            }
        });

        var initial = '<html><head><script src="/kendo.js"></script></head><body></body></html>';
        var expected = '<html><head><script src="http://mysite.com/myversion/kendo.js"></script></head><body></body></html>';
        var result = dojo.fixCDNReferences(initial);
        equal(result, expected);
    });

})();

