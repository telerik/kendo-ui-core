(function() {
    var dataviz = kendo.dataviz,
        QRCode = dataviz.ui.QRCode,
        qrcode;

    function createQRCode() {
        QUnit.fixture.html("<div id='container'></div>")
        $("#container").kendoQRCode({
            value: "mailto:clientservice@kendoui.com"
        });

        qrcode = $("#container").data("kendoQRCode");
    }

    // ------------------------------------------------------------
    var SVGView,
        CanvasView,
        supportsCanvas;

    module("Export", {
        setup: function() {
            createQRCode();

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
        ok(qrcode.svg().match(/<svg.*<\/svg>/));
    });

    test("svg() throws error if SVGView is not loaded", function() {
        dataviz.SVGView = undefined;

        throws(function() { qrcode.svg() },
               "Unable to create SVGView. Check that kendo.dataviz.svg.js is loaded.");
    });

    test("svg() does not replace view", function() {
        var oldView = qrcode._view;
        qrcode.svg();
        ok(oldView === qrcode._view);
    });

    test("imageDataURL() exports image/png", function() {
        ok(qrcode.imageDataURL().match(/image\/png/));
    });

    test("imageDataURL() throws error if CanvasView is not loaded", function() {
        dataviz.CanvasView = undefined;

        throws(function() { qrcode.imageDataURL() },
               "Unable to create CanvasView. Check that kendo.dataviz.canvas.js is loaded.");
    });

    test("imageDataURL() returns null if Canvas is not supported", function() {
        dataviz.supportsCanvas = function() { return false; }

        equal(qrcode.imageDataURL(), null);
    });

    asyncTest("imageDataURL logs warning if Canvas is not supported", function() {
        dataviz.supportsCanvas = function() { return false; }

        stubMethod(kendo, "logToConsole", function(message) {
            ok(message.indexOf("Warning: Unable to generate image.") > -1);
            start();
        }, function() {
            qrcode.imageDataURL();
        });
    });

    test("imageDataURL() does not replace view", function() {
        var oldView = qrcode._view;
        qrcode.imageDataURL();
        ok(oldView === qrcode._view);
    });

})();
