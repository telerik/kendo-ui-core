// ------------------------------------------------------------
function exportTests(name, createWidget) {
    var draw = kendo.drawing;
    var widget;

    module("Base Export / " + name + " /", {
        setup: function() {
            widget = createWidget();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    });

    test("exportVisual returns Group", function() {
        ok(widget.exportVisual() instanceof draw.Group);
    });

    test("exportSVG forwards visual to drawing.exportSVG", function() {
        var visual = {};
        widget.exportVisual = function() { return visual; };

        stubMethod(draw, "exportSVG", function(group) {
            equal(group, visual);
        }, function() {
            widget.exportSVG();
        });
    });

    test("exportSVG forwards options to drawing.exportSVG", function() {
        var ref = {};

        stubMethod(draw, "exportSVG", function(group, options) {
            equal(options, ref);
        }, function() {
            widget.exportSVG(ref);
        });
    });

    test("exportSVG exports SVG", function() {
        widget.exportSVG().done(function(svg) {
            contains(svg, "data:image/svg+xml;base64,");
        });
    });

    test("exportSVG exports raw SVG", function() {
        widget.exportSVG({ raw: true }).done(function(svg) {
            contains(svg, "<?xml version='1.0' ?><svg");
        });
    });

    test("exportImage forwards visual to drawing.exportImage", function() {
        var visual = {};
        widget.exportVisual = function() { return visual; };

        stubMethod(draw, "exportImage", function(group) {
            equal(group, visual);
        }, function() {
            widget.exportImage();
        });
    });

    test("exportImage forwards options to drawing.exportImage", function() {
        var ref = {};

        stubMethod(draw, "exportImage", function(group, options) {
            equal(options, ref);
        }, function() {
            widget.exportImage(ref);
        });
    });

    test("exportImage exports PNG", function() {
        widget.exportImage().done(function(data) {
            contains(data, "image/png");
        });
    });

    test("exportPDF forwards visual to drawing.exportPDF", function() {
        var visual = {};
        widget.exportVisual = function() { return visual; };

        stubMethod(draw, "exportPDF", function(group) {
            equal(group, visual);
        }, function() {
            widget.exportPDF();
        });
    });

    test("exportPDF forwards options to drawing.exportPDF", function() {
        var ref = {};

        stubMethod(draw, "exportPDF", function(group, options) {
            equal(options, ref);
        }, function() {
            widget.exportPDF(ref);
        });
    });

    test("exportPDF exports PDF", function() {
        widget.exportPDF().done(function(data) {
            contains(data, "application/pdf");
        });
    });
}

// ------------------------------------------------------------
function legacyExportTests(name, createWidget) {
    var draw = kendo.drawing;

    var SVGSurface,
        CanvasSurface,
        supportsCanvas;

    var widget;

    module("Legacy Export / " + name + " /", {
        setup: function() {
            widget = createWidget();

            SVGSurface = draw.svg.Surface;
            CanvasSurface = draw.canvas.Surface;
            supportsCanvas = kendo.support.canvas;
        },
        teardown: function() {
            draw.svg.Surface = SVGSurface;
            draw.canvas.Surface = CanvasSurface;
            kendo.support.canvas = supportsCanvas;

            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    });

    test("svg() exports SVG", function() {
        ok(widget.svg().match(/<svg.*<\/svg>/));
    });

    test("svg() throws error if SVG Surface is not loaded", function() {
        draw.svg.Surface = undefined;

        throws(function() { widget.svg() },
               "SVG Export failed. Unable to export instantiate kendo.drawing.svg.Surface");
    });

    test("imageDataURL() exports image/png", function() {
        contains(widget.imageDataURL(), "image/png" );
    });

    test("imageDataURL() returns null if Canvas is not supported", function() {
        kendo.support.canvas = false;

        equal(widget.imageDataURL(), null);
    });

    test("imageDataURL() throws error if Canvas surface is not loaded", function() {
        draw.canvas.Surface = undefined;

        throws(function() { widget.imageDataURL() },
               "Image Export failed. Unable to export instantiate kendo.drawing.canvas.Surface");
    });
}

// ------------------------------------------------------------
function saveAsPDFTests(name, createWidget) {
    var draw = kendo.drawing;
    var widget;

    function exportNoop() {
        return $.Deferred().resolve("");
    }

    var saveAs;

    module("saveAsPDF / " + name + " /", {
        setup: function() {
            widget = createWidget();
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
            kendo.saveAs = saveAs;
        }
    });

    test("saveAsPDF calls kendo.drawing.exportPDF", function() {
        stubMethod(draw, "exportPDF", function() {
            ok(true);
            return exportNoop();
        }, function() {
            widget.saveAsPDF();
        });
    });

    test("saveAsPDF passes through pdf options", function() {
        stubMethod(draw, "exportPDF", function(group, options) {
            ok(options.foo);
            return exportNoop();
        }, function() {
            widget.options.pdf.foo = true;
            widget.saveAsPDF();
        });
    });

    test("saveAsPDF triggers pdfExport event", function() {
        stubMethod(draw, "exportPDF", exportNoop,
        function() {
            widget.bind("pdfExport", function() {
                ok(true);
            });
            widget.saveAsPDF();
        });
    });

    test("cancelling pdfExport stops export", 0, function() {
        stubMethod(draw, "exportPDF", function() {
            ok(false);
        }, function() {
            widget.bind("pdfExport", function(e) {
                e.preventDefault();
            });
            widget.saveAsPDF();
        });
    });

    test("saveAsPDF passes through forceProxy option", function() {
        stubMethod(draw, "exportPDF", function() {
            return new draw.Group();
        }, function() {
            stubMethod(kendo, "saveAs", function(options) {
                ok(options.forceProxy);
            }, function() {
                widget.options.pdf.forceProxy = true;
                widget.saveAsPDF();
            });
        });
    });
};
