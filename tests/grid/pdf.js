(function() {

var dom;

var saveAs = kendo.saveAs;
var drawDOM = kendo.dataviz.drawing.drawDOM;
var toDataURL = kendo.dataviz.drawing.pdf.toDataURL;

module("grid pdf export",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.dataviz.drawing.drawDOM = function(element, callback) {
            callback({
                options: {
                    set: $.noop
                }
            });
        };

        kendo.dataviz.drawing.pdf.toDataURL = function(root, callback) {
            callback("");
        };

        kendo.saveAs = $.noop;
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.saveAs = saveAs;
        kendo.dataviz.drawing.drawDOM = drawDOM;
        kendo.dataviz.drawing.pdf.toDataURL = toDataURL;
    }
});

test("renders button for pdf command", function() {
    dom.kendoGrid({
        toolbar: [ { name: "pdf" }]
    });

    equal(dom.find(".k-grid-pdf").length, 1);
});

test("sets the default text of the pdf command", function() {
    dom.kendoGrid({
        toolbar: [ { name: "pdf" }]
    });

    equal(dom.find(".k-grid-pdf").text(), "Export to PDF");
});

test("clicking the pdf button calls the pdf export method", 1, function() {
    var grid = dom.kendoGrid({
        toolbar: [ { name: "pdf" }]
    }).data("kendoGrid");

    grid.exportToPDF = function() {
        ok(true);
    };

    dom.find(".k-grid-pdf").trigger("click");
});

test("exportToPDF fires the pdfExport event", function() {
    var grid = dom.kendoGrid({
        toolbar: [ { name: "pdf" }],
        pdfExport: function(e) {
            ok(true);
        }
    }).data("kendoGrid");

    grid.exportToPDF();
});

test("exportToPDF calls drawDOM with the grid wrapper", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");


    kendo.dataviz.drawing.drawDOM = function(element) {
        strictEqual(element, grid.wrapper[0]);
    };

    grid.exportToPDF();
});

test("exportToPDF calls pdf.toDataURL", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");


    kendo.dataviz.drawing.pdf.toDataURL = function() {
        ok(true)
    };

    grid.exportToPDF();
});

test("exportToPDF calls kendo.saveAs", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.dataviz.drawing.pdf.toDataURL = function(root, callback) {
        callback("foo");
    };

    kendo.saveAs = function(dataURI) {
       equal(dataURI, "foo");
    };

    grid.exportToPDF();
});

test("exportToPDF calls kendo.saveAs and passes the fileName option", function() {
    var grid = dom.kendoGrid({
        pdf: {
            fileName: "foo"
        }
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName) {
       equal(fileName, "foo");
    };

    grid.exportToPDF();
});

test("exportToPDF uses 'Export.pdf' as default file name", function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName) {
       equal(fileName, "Export.pdf");
    };

    grid.exportToPDF();
});

test("exportToPDF uses the pdf.proxyURL option", function() {
    var grid = dom.kendoGrid({
        pdf: {
            proxyURL: "foo"
        }
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName, proxyURL) {
       equal(proxyURL, "foo");
    };

    grid.exportToPDF();
});

test("exportToPDF uses 'auto' as default paperSize", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    var root = {
        options: {
            set: function(key, options) {
                equal(options.paperSize, "auto");
            }
        }
    };

    kendo.dataviz.drawing.drawDOM = function(element, callback) {
        callback(root);
    }

    grid.exportToPDF();
});

test("exportToPDF passes the paperSize option", 1, function() {
    var grid = dom.kendoGrid({
        pdf: {
            paperSize: "foo"
        }
    }).data("kendoGrid");

    var root = {
        options: {
            set: function(key, options) {
                equal(options.paperSize, "foo");
            }
        }
    };

    kendo.dataviz.drawing.drawDOM = function(element, callback) {
        callback(root);
    }

    grid.exportToPDF();
});

test("preventing pdfExport stops kendo.saveAs", 0, function() {
    var grid = dom.kendoGrid({
        pdfExport: function(e) {
            e.preventDefault();
        }
    }).data("kendoGrid");

    kendo.saveAs = function() {
        ok(false);
    };

    grid.exportToPDF();
});
}());
