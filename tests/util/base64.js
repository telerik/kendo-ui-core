// ------------------------------------------------------------
(function() {
    var encodeBase64 = kendo.util.encodeBase64;

    module("Util / encodeBase64");

    test("encodes ASCII string", function() {
        equal(encodeBase64("Foo"), "Rm9v");
    });

    test("encodes UTF-8 2-byte characters", function() {
        equal(encodeBase64("Бар"), "0JHQsNGA");
    });

    test("encodes UTF-8 3-byte characters", function() {
        equal(encodeBase64("我"), "5oiR");
    });
})();
