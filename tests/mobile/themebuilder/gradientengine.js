(function() {
    var gradientEngine = new Gradient("#000"),
        root;

    ////////////////////////////////////////////////////////////////////
    module("gradient engine", {
        setup: function() {
            root = $("#qunit-fixture");
        }
    });

    test("parseGradient preserves start point", 1, function() {
        ok(gradientEngine.parseGradient("-webkit-linear-gradient(left, #0b47a2)")[0].start.original == "left");
    });

    test("parseGradient parses color and position", 2, function() {
        var gradientStop = gradientEngine.parseGradient("-webkit-linear-gradient(left, #0b47a2 5%)")[0].stops[0];

        ok(gradientStop.color.get() == "#0b47a2");
        ok(gradientStop.position == "5");
    });

    test("get method returns browser specific gradient", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 5%)"),
            matches = gradient.get().match(/-\w*?-/);

        ok(matches ? matches[0] == kendo.support.transforms.css : kendo.support.transforms.css === "");
    });

    test("get method returns WebKit style gradient in WebKit browsers", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 5%)");

        ok(gradient.get("-webkit-") == "-webkit-gradient(linear,0 50%,100% 50%,color-stop(.05, #0b47a2))");
    });

    test("multiple get method returns multiple WebKit style gradient in WebKit browsers", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 5%), -webkit-linear-gradient(left, #0b47a2 5%)");

        ok(gradient.get("-webkit-") == "-webkit-gradient(linear,0 50%,100% 50%,color-stop(.05, #0b47a2)),-webkit-gradient(linear,0 50%,100% 50%,color-stop(.05, #0b47a2))");
    });

    test("get method returns W3C style gradients in the rest of the browsers", 4, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 5%)");

        ok(gradient.get("-moz-") == "-moz-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("-ms-") == "-ms-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("-o-") == "-o-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("") == "linear-gradient(left,#0b47a2 5%)");
    });

    test("multiple get method returns multiple W3C style gradients in the rest of the browsers", 4, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 5%), -webkit-linear-gradient(left, #0b47a2 5%)");

        ok(gradient.get("-moz-") == "-moz-linear-gradient(left,#0b47a2 5%),-moz-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("-ms-") == "-ms-linear-gradient(left,#0b47a2 5%),-ms-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("-o-") == "-o-linear-gradient(left,#0b47a2 5%),-o-linear-gradient(left,#0b47a2 5%)");
        ok(gradient.get("") == "linear-gradient(left,#0b47a2 5%),linear-gradient(left,#0b47a2 5%)");
    });

    test("0 and 100% are stripped in W3C style gradients", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, #0b47a2 0%, #0b47a3 10%, #0b47a4 100%)");

        ok(gradient.get("") == "linear-gradient(left,#0b47a2,#0b47a3 10%,#0b47a4)");
    });

    test("gradient RGB colors get converted to HEX", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, rgb(0,0,0))");

        ok(gradient.get("") == "linear-gradient(left,#000)");
    });

    test("gradient RGB colors get converted to HEX", 1, function () {
        var gradient = new Gradient("-webkit-linear-gradient(left, rgb(0,0,0))");

        ok(gradient.get("") == "linear-gradient(left,#000)");
    });
})();
