(function() {
    var barcode;

    function createBarcode() {
        QUnit.fixture.html("<div id='container'></div>")

        $("#container").kendoBarcode({
            value: "2346722",
            type: "ean8"
        });

        barcode = $("#container").data("kendoBarcode");
    }

    // ------------------------------------------------------------
    var SVGView,
    CanvasView,
    supportsCanvas;

    module("Export", {
        setup: function() {
            createBarcode();

            dataviz = kendo.dataviz;
            SVGView = dataviz.SVGView;
            CanvasView = dataviz.CanvasView;
            supportsCanvas = dataviz.supportsCanvas;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            dataviz.SVGView = SVGView;
            dataviz.CanvasView = CanvasView;
            dataviz.supportsCanvas = supportsCanvas;
        }
    });

    test("svg() exports SVG", function() {
        ok(barcode.svg().match(/<svg.*<\/svg>/));
    });

    test("svg() throws error if SVGView is not loaded", function() {
        dataviz.SVGView = undefined;

        throws(function() { barcode.svg() },
        "Unable to create SVGView. Check that kendo.dataviz.svg.js is loaded.");
    });

    test("svg() does not replace view", function() {
        var oldView = barcode._view;
        barcode.svg();
        ok(oldView === barcode._view);
    });

    test("imageDataURL() exports image/png", function() {
        ok(barcode.imageDataURL().match(/image\/png/));
    });

    test("imageDataURL() throws error if CanvasView is not loaded", function() {
        dataviz.CanvasView = undefined;

        throws(function() { barcode.imageDataURL() },
        "Unable to create CanvasView. Check that kendo.dataviz.canvas.js is loaded.");
    });

    test("imageDataURL() returns null if Canvas is not supported", function() {
        dataviz.supportsCanvas = function() { return false; }

        equal(barcode.imageDataURL(), null);
    });

    asyncTest("imageDataURL logs warning if Canvas is not supported", function() {
        dataviz.supportsCanvas = function() { return false; }

        stubMethod(kendo, "logToConsole", function(message) {
            ok(message.indexOf("Warning: Unable to generate image.") > -1);
            start();
        }, function() {
            barcode.imageDataURL();
        });
    });

    test("imageDataURL() does not replace view", function() {
        var oldView = barcode._view;
        barcode.imageDataURL();
        ok(oldView === barcode._view);
    });

})();
