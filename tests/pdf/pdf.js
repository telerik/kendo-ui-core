(function() {

var dom;

var saveAs = kendo.saveAs;
var drawDOM = kendo.drawing.drawDOM;
var toDataURL = kendo.drawing.pdf.toDataURL;

var PDF = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);
        this.wrapper = this.element;
    },
    options: {
        name: "PDF"
    }
});

kendo.ui.plugin(PDF);

kendo.PDFMixin.extend(PDF.prototype);

module("pdf mixin",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.drawing.drawDOM = function(element) {
            return $.Deferred().resolve(new kendo.drawing.Group()).promise();
        };

        kendo.drawing.pdf.toDataURL = function(root, callback) {
            callback("");
        };

        kendo.saveAs = $.noop;
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.saveAs = saveAs;
        kendo.drawing.drawDOM = drawDOM;
        kendo.drawing.pdf.toDataURL = toDataURL;
    }
});

test("saveAsPDF fires the pdfExport event", function() {
    var widget = dom.kendoPDF({
        toolbar: [ { name: "pdf" }],
        pdfExport: function(e) {
            ok(true);
        }
    }).data("kendoPDF");

    widget.saveAsPDF();
});

test("saveAsPDF calls drawDOM with the widget wrapper", 1, function() {
    var widget = dom.kendoPDF({
    }).data("kendoPDF");


    kendo.drawing.drawDOM = function(element) {
        strictEqual(element, widget.wrapper[0]);
        return $.Deferred().promise();
    };

    widget.saveAsPDF();
});

test("saveAsPDF calls pdf.toDataURL", 1, function() {
    var widget = dom.kendoPDF({
    }).data("kendoPDF");


    kendo.drawing.pdf.toDataURL = function() {
        ok(true)
    };

    widget.saveAsPDF();
});

test("saveAsPDF calls kendo.saveAs", 1, function() {
    var widget = dom.kendoPDF({
    }).data("kendoPDF");

    kendo.drawing.pdf.toDataURL = function(root, callback) {
        callback("foo");
    };

    kendo.saveAs = function(options) {
       equal(options.dataURI, "foo");
    };

    widget.saveAsPDF();
});

test("saveAsPDF calls kendo.saveAs and passes the fileName option", function() {
    var widget = dom.kendoPDF({
        pdf: {
            fileName: "foo"
        }
    }).data("kendoPDF");

    kendo.saveAs = function(options) {
       equal(options.fileName, "foo");
    };

    widget.saveAsPDF();
});

test("saveAsPDF uses 'Export.pdf' as default file name", function() {
    var widget = dom.kendoPDF({
    }).data("kendoPDF");

    kendo.saveAs = function(options) {
       equal(options.fileName, "Export.pdf");
    };

    widget.saveAsPDF();
});

test("saveAsPDF uses the pdf.proxyURL option", function() {
    var widget = dom.kendoPDF({
        pdf: {
            proxyURL: "foo"
        }
    }).data("kendoPDF");

    kendo.saveAs = function(options) {
       equal(options.proxyURL, "foo");
    };

    widget.saveAsPDF();
});

test("saveAsPDF uses 'auto' as default paperSize", 1, function() {
    var widget = dom.kendoPDF({
    }).data("kendoPDF");

    var root = new kendo.drawing.Group();
    root.options.addObserver({
        optionsChange: function(e) {
            equal(e.value.paperSize, "auto");
        }
    });

    kendo.drawing.drawDOM = function(element) {
        return $.Deferred().resolve(root).promise();
    }

    widget.saveAsPDF();
});

test("saveAsPDF passes the paperSize option", 1, function() {
    var widget = dom.kendoPDF({
        pdf: {
            paperSize: "A3"
        }
    }).data("kendoPDF");

    var root = new kendo.drawing.Group();
    root.options.addObserver({
        optionsChange: function(e) {
            equal(e.value.paperSize, "A3");
        }
    });

    kendo.drawing.drawDOM = function(element, callback) {
        return $.Deferred().resolve(root).promise();
    }

    widget.saveAsPDF();
});

test("preventing pdfExport stops kendo.saveAs", 0, function() {
    var widget = dom.kendoPDF({
        pdfExport: function(e) {
            e.preventDefault();
        }
    }).data("kendoPDF");

    kendo.saveAs = function() {
        ok(false);
    };

    widget.saveAsPDF();
});
}());
