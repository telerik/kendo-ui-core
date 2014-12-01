(function() {

var dom;

var exporter = kendo.ExcelExporter;
var workbook = kendo.ooxml.Workbook;
var saveAs = kendo.saveAs;

var Excel = kendo.ui.Widget.extend({
    options: {
        name: "Excel"
    }
});

kendo.ui.plugin(Excel);

kendo.ExcelMixin.extend(Excel.prototype);

module("excel mixin",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.ExcelExporter = function () {
            this.workbook = function() {
                return $.Deferred(function(d) {
                    d.resolve({}, []);
                }).promise();
            };
        };

        kendo.ooxml.Workbook = function () {
            this.toDataURL = $.noop;
        };
        kendo.saveAs = $.noop;
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.ExcelExporter = exporter;
        kendo.ooxml.Workbook = workbook;
        kendo.saveAs = saveAs;
    }
});

test("saveAsExcel fires the excelExport event", function() {
    var widget = dom.kendoExcel({
        excelExport: function(e) {
            ok(true);
        }
    }).data("kendoExcel");

    widget.saveAsExcel();
});

test("saveAsExcel creates kendo.ExcelExporter with its columns and data source", 2, function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    kendo.ExcelExporter = function(options) {
        strictEqual(options.columns, widget.columns);
        strictEqual(options.dataSource, widget.dataSource);

        this.workbook = function() {
            return $.Deferred().promise();
        }
    };

    widget.saveAsExcel();
});

test("saveAsExcel creates kendo.ooxml.Workbook from the result of the workbook method", 1, function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    var book = {};

    kendo.ExcelExporter = function(options) {
        this.workbook = function() {
            return $.Deferred(function(d) { d.resolve(book); }).promise();
        }
    };

    kendo.ooxml.Workbook = function(options) {
        strictEqual(options, book);
        this.toDataURL = function()  {
        };
    };

    widget.saveAsExcel();
});

test("saveAsExcel calls the workbook method of the exporter", 1, function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    kendo.ExcelExporter = function(options) {
        this.workbook = function() {
            ok(true);
            return $.Deferred().promise();
        };
    };

    widget.saveAsExcel();
});

test("saveAsExcel passes the excel.allPages option", 1, function() {
    var widget = dom.kendoExcel({
        excel: {
            allPages: false
        }
    }).data("kendoExcel");

    kendo.ExcelExporter = function(options) {
        equal(options.allPages, false);

        this.workbook = function() {
            return $.Deferred().promise();
        };
    };

    widget.saveAsExcel();
});

test("saveAsExcel passes the excel.filterable option", 1, function() {
    var widget = dom.kendoExcel({
        excel: {
            filterable: false
        }
    }).data("kendoExcel");

    kendo.ExcelExporter = function(options) {
        equal(options.filterable, false);

        this.workbook = function() {
            return $.Deferred().promise();
        };
    };

    widget.saveAsExcel();
});

test("saveAsExcel calls the toDataURL method of the workbook", 1, function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    kendo.ooxml.Workbook = function(options) {
        this.toDataURL = function() {
            ok(true);
        }
    };

    widget.saveAsExcel();
});

test("saveAsExcel calls kendo.saveAs", 1, function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    kendo.ooxml.Workbook = function(options) {
        this.toDataURL = function() {
            return "foo";
        }
    };

    kendo.saveAs = function(options) {
       equal(options.dataURI, "foo");
    };

    widget.saveAsExcel();
});

test("saveAsExcel calls kendo.saveAs and passes the fileName option of the workbook as file name", function() {
    var widget = dom.kendoExcel({
        excelExport: function(e) {
            e.workbook.fileName = "foo";
        }
    }).data("kendoExcel");

    kendo.saveAs = function(options) {
       equal(options.fileName, "foo");
    };

    widget.saveAsExcel();
});

test("data is available in the excelExport event arguments", 1, function() {
    var data = [];

    kendo.ExcelExporter = function () {
        this.workbook = function() {
            return $.Deferred(function(d) {
                d.resolve({}, data);
            }).promise();
        };
    };

    var widget = dom.kendoExcel({
        excelExport: function(e) {
            strictEqual(e.data, data);
        }
    }).data("kendoExcel");

    widget.saveAsExcel();
});

test("saveAsExcel uses 'Export.xlsx' as default file name", function() {
    var widget = dom.kendoExcel({
    }).data("kendoExcel");

    kendo.saveAs = function(options) {
       equal(options.fileName, "Export.xlsx");
    };

    widget.saveAsExcel();
});

test("saveAsExcel uses the excel.proxyURL option", function() {
    var widget = dom.kendoExcel({
        excel: {
            proxyURL: "foo"
        }
    }).data("kendoExcel");

    kendo.saveAs = function(options) {
       equal(options.proxyURL, "foo");
    };

    widget.saveAsExcel();
});

test("preventing excelExport stops kendo.saveAs", 0, function() {
    var widget = dom.kendoExcel({
        excelExport: function(e) {
            e.preventDefault();
        }
    }).data("kendoExcel");

    kendo.saveAs = function() {
        ok(false);
    };

    widget.saveAsExcel();
});

}());
