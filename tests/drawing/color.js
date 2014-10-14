(function() {
    var Color = kendo.drawing.Color;

    module("Color");

    test("assumes black when parsing undefined", function() {
        var c = new Color(undefined);
        equal(c.toHex(), "#000000");
    });

    test("parses #xxyyzz", function() {
        var c = new Color("#aabbcc");
        equal(c.toHex(), "#aabbcc");
    });

    test("parses #xyz", function() {
        var c = new Color("#abc");
        equal(c.toHex(), "#aabbcc");
    });

    test("parses rgb(x, y, z)", function() {
        var c = new Color("rgb(170, 187, 204)");
        equal(c.toHex(), "#aabbcc");
    });

    test("normalizes rgb(x, y, z)", function() {
        var c = new Color("rgb(0, 400, 500)");
        equal(c.toHex(), "#00ffff");
    });

    test("parses named color", function() {
        var c = new Color("tomato");
        equal(c.toHex(), "#ff6347");
    });

    test("accepts rgb values", function() {
        var c = new Color(0, 255, 255);
        equal(c.toHex(), "#00ffff");
    });

    test("brightness lightens colors", function() {
        var c = new Color(100, 100, 240).brightness(1.2);
        equal(c.toHex(), "#7878ff");
    });

    test("brightness darkens colors", function() {
        var c = new Color(100, 100, 0).brightness(0.2);
        equal(c.toHex(), "#141400");
    });
})();
