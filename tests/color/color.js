(function() {
    var Color = kendo.Color;

    // ------------------------------------------------------------
    module("Color");

    test("fromHSL", function() {
        var color = Color.fromHSL(200, 0.5, 1, 0);
        equal(color.h, 200);
        equal(color.s, 0.5);
        equal(color.l, 1);
        equal(color.a, 0);
    });

    test("HSL to RGB", function() {
        var color = Color.fromHSL(228, 83, 61, 0);
        equal(color.toRGB().toCss(), "#496aee");
    });

    test("RGB to HSL", function() {
        var color = kendo.parseColor("#496aee").toHSL();
        close(color.h, 228, 0.1);
        close(color.s, 83, 0.1);
        close(color.l, 61, 0.1);
        equal(color.a, 1);
    });

    test("darken HSL", function() {
        var color = kendo.parseColor("#496aee").toHSL();
        color.l = 30;

        equal(color.toCss(), "#0d268c");
    });

    test("lighten HSL", function() {
        var color = kendo.parseColor("#496aee").toHSL();
        color.l = 90;

        equal(color.toCss(), "#d0d9fb");
    });
})();
