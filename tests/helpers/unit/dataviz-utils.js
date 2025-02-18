import '@progress/kendo-ui/src/kendo.pdf.js';
import '@progress/kendo-ui/src/kendo.dataviz.barcode.js';
import '@progress/kendo-ui/src/kendo.dataviz.chart.js';
import { vi } from 'vitest';

export const SANS = "Arial,Helvetica,sans-serif",
    SANS11 = "11px " + SANS,
    SANS12 = "12px " + SANS,
    SANS16 = "16px " + SANS;

/* Barcode START */
export function comparePatterns(pattern1, pattern2) {
    if (pattern1.length != pattern2.length) {
        return false;
    }
    for (let i = 0; i < pattern1.length; i++) {
        if (pattern1[i] != pattern2[i]) {
            if ($.isPlainObject(pattern1[i])) {
                for (let field in pattern1[i]) {
                    if (pattern1[i][field] != pattern2[i][field]) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
    }
    return true;
}

export function fixed(value, length) {
    return parseFloat(value.toFixed(length));
}

/* Barcode END */

/* exported compareBoundingBox */
export function compareBoundingBox(bbox, values, tolerance) {
    tolerance = tolerance || 0;

    close(bbox.topLeft().x, values[0], tolerance, "topLeft.x");
    close(bbox.topLeft().y, values[1], tolerance, "topLeft.y");
    close(bbox.bottomRight().x, values[2], tolerance, "bottomRight.x");
    close(bbox.bottomRight().y, values[3], tolerance, "bottomRight.y");
}

/* exported compareMatrices */
export function compareMatrices(m1, m2, tolerance) {
    tolerance = tolerance || 0;
    close(m1.a, m2.a, tolerance, "a");
    close(m1.b, m2.b, tolerance, "b");
    close(m1.c, m2.c, tolerance, "c");
    close(m1.d, m2.d, tolerance, "d");
    close(m1.e, m2.e, tolerance, "e");
    close(m1.f, m2.f, tolerance, "f");
}

/* CHART START */

export function createChart(options) {
    let div = $("<div id='container' />").appendTo(Mocha.fixture);
    div.kendoChart(options);

    return div.data("kendoChart");
}

export function destroyChart() {
    kendo.destroy(Mocha.fixture);
    Mocha.fixture.empty();
}

export function clickChart(chart, element, x, y) {
    chart._instance._tap({
        target: element,
        x: {
            location: x || 0
        },
        y: {
            location: y || 0
        }
    });
}

export function getChartDomElement(chartElement) {
    return $(chartElement.visual._observers[0].element);
}

/* CHART END */


/* SANKEY START */

export function createSankey(options) {
    var div = $("<div id='container' />").appendTo(Mocha.fixture);
    div.kendoSankey(options);

    return div.data("kendoSankey");
}

export function destroySankey() {
    kendo.destroy(Mocha.fixture);
    Mocha.fixture.empty();
}

/* SANKEY END */


/* STUB METHODS START */

export function stubMethod(obj, methodName, stub, callback) {
    if (!obj[methodName]) {
        obj[methodName] = vi.fn();
    }

    const spy = vi.spyOn(obj, methodName);
    spy.mockImplementation(stub);

    try {
        callback();
    }
    finally {
        spy.mockRestore();
    }
}

export const pdfStubMethod = async(obj, name, imp, func) => {
    if (!obj[name]) {
        obj[name] = vi.fn();
    }

    const spy = vi.spyOn(obj, name);

    spy.mockImplementation(imp);

    try {
        const result = func();

        if (result && typeof result.then === 'function') {
            await result;
        }
    } finally {
        spy.mockRestore();
    }
};

/* STUB METHODS END */

/* ------------------------------- EXPORT TESTS HELPERS ------------------------------- */

export function exportTests(name, createWidget) {
    let draw = kendo.drawing;
    let widget;

    describe("Base Export / " + name + " /", function() {
        beforeEach(function() {

            widget = createWidget();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            Mocha.fixture.empty();
        });

        it("exportVisual returns Group", function() {
            assert.isOk(widget.exportVisual() instanceof draw.Group);
        });

        it("exportSVG forwards visual to drawing.exportSVG", function() {
            let visual = {};
            widget.exportVisual = function() { return visual; };

            stubMethod(draw, "exportSVG", function(group) {
                assert.equal(group, visual);
            }, function() {
                widget.exportSVG();
            });
        });

        it("exportSVG forwards options to drawing.exportSVG", function() {
            let ref = {};

            stubMethod(draw, "exportSVG", function(group, options) {
                assert.equal(options, ref);
            }, function() {
                widget.exportSVG(ref);
            });
        });

        it("exportSVG exports SVG", async function() {
            const result = await widget.exportSVG();

            assert.include(result, "data:image/svg+xml;base64,");
        });

        it("exportSVG exports raw SVG", async function() {
            const result = await widget.exportSVG({ raw: true });

            assert.include(result, "<?xml version='1.0' ?><svg");
        });

        it("exportImage forwards visual to drawing.exportImage", function() {
            let visual = {};
            widget.exportVisual = function() { return visual; };

            stubMethod(draw, "exportImage", function(group) {
                assert.equal(group, visual);
            }, function() {
                widget.exportImage();
            });
        });

        it("exportImage forwards options to drawing.exportImage", function() {
            let ref = {};

            stubMethod(draw, "exportImage", function(group, options) {
                assert.equal(options, ref);
            }, function() {
                widget.exportImage(ref);
            });
        });

        it("exportImage exports PNG", async function() {
            const result = await widget.exportImage();

            assert.include(result, "image/png");
        });

        it("exportPDF forwards visual to drawing.exportPDF", function() {
            let visual = {};
            widget.exportVisual = function() { return visual; };

            stubMethod(draw, "exportPDF", function(group) {
                assert.equal(group, visual);
            }, function() {
                widget.exportPDF();
            });
        });

        it("exportPDF forwards options to drawing.exportPDF", function() {
            let ref = {};

            stubMethod(draw, "exportPDF", function(group, options) {
                assert.equal(options, ref);
            }, function() {
                widget.exportPDF(ref);
            });
        });

        it("exportPDF exports PDF", async function() {
            const result = await widget.exportPDF();
            assert.include(result, "application/pdf");
        });
    });
}

export function legacyExportTests(name, createWidget) {
    let draw = kendo.drawing;

    let SVGSurface,
        CanvasSurface,
        supportsCanvas;

    let widget;

    describe("Legacy Export / " + name + " /", function() {
        beforeEach(function() {
            widget = createWidget();

            SVGSurface = draw.svg.Surface;
            CanvasSurface = draw.canvas.Surface;
            supportsCanvas = kendo.support.canvas;
        });
        afterEach(function() {
            draw.svg.Surface = SVGSurface;
            draw.canvas.Surface = CanvasSurface;
            kendo.support.canvas = supportsCanvas;

            kendo.destroy(Mocha.fixture);
            Mocha.fixture.empty();
        });


        it("svg() exports SVG", function() {
            assert.isOk(widget.svg().match(/<svg.*<\/svg>/));
        });

        it("svg() throws error if SVG Surface is not loaded", function() {
            draw.svg.Surface = undefined;

            assert.throws(function() { widget.svg(); },
                "SVG Export failed. Unable to export instantiate kendo.drawing.svg.Surface");
        });

        it("imageDataURL() exports image/png", function() {
            assert.include(widget.imageDataURL(), "image/png");
        });

        it("imageDataURL() returns null if Canvas is not supported", function() {
            kendo.support.canvas = false;

            assert.equal(widget.imageDataURL(), null);
        });

        it("imageDataURL() throws error if Canvas surface is not loaded", function() {
            draw.canvas.Surface = undefined;

            assert.throws(function() { widget.imageDataURL(); },
                "Image Export failed. Unable to export instantiate kendo.drawing.canvas.Surface");
        });
    });
}

// ------------------------------------------------------------
export function saveAsPDFTests(name, createWidget) {
    let draw = kendo.drawing;
    let widget;

    function exportNoop() {
        return new Promise((resolve) => {
            resolve("");
        });
    }

    let saveAs;

    describe("saveAsPDF / " + name + " /", function() {
        beforeEach(function() {
            widget = createWidget();
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            Mocha.fixture.empty();
            kendo.saveAs = saveAs;
        });

        it("saveAsPDF calls kendo.drawing.exportPDF", async function() {
            await pdfStubMethod(draw, "exportPDF", function() {
                assert.isOk(true);
                return exportNoop();
            }, function() {
                return widget.saveAsPDF();
            });
        });

        it("saveAsPDF passes through pdf options", async function() {
            await pdfStubMethod(draw, "exportPDF", function(group, options) {
                assert.isOk(options.foo);
                return exportNoop();
            }, function() {
                widget.options.pdf.foo = true;
                return widget.saveAsPDF();
            });
        });

        it("saveAsPDF triggers pdfExport event", async function() {
            await pdfStubMethod(draw, "exportPDF", exportNoop,
                function() {
                    widget.bind("pdfExport", function() {
                        assert.isOk(true);
                    });
                    return widget.saveAsPDF();
                });
        });

        it("cancelling pdfExport stops export", function() {
            pdfStubMethod(draw, "exportPDF", function() {
                assert.isOk(false);
            }, function() {
                widget.bind("pdfExport", function(e) {
                    e.preventDefault();
                });
                return widget.saveAsPDF();
            }, true);
        });

        it("saveAsPDF passes through forceProxy option", async function() {
            await pdfStubMethod(draw, "exportPDF", function() {
                return new Promise((resolve) => {
                    resolve(new draw.Group());
                });
            }, async function() {
                return await pdfStubMethod(kendo, "saveAs", function(options) {
                    assert.isOk(options.forceProxy);
                }, async function() {
                    widget.options.pdf.forceProxy = true;
                    return await widget.saveAsPDF();
                });
            }, true);
        });
    });
}
