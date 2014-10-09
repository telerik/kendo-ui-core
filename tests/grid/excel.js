(function() {

var dom;

var exporter = kendo.data.ExcelExporter;
var workbook = kendo.ooxml.Workbook;
var saveAs = kendo.saveAs;

module("grid excel export",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.data.ExcelExporter = function () {
            this.workbook = function() {
                return $.Deferred(function(d) {
                    d.resolve({});
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
        kendo.data.ExcelExporter = exporter;
        kendo.ooxml.Workbook = workbook;
        kendo.saveAs = saveAs;
    }
});

test("renders button for excel command", function() {
    dom.kendoGrid({
        toolbar: [ { name: "excel" }]
    });

    equal(dom.find(".k-grid-excel").length, 1);
});

test("sets the default text of the excel command", function() {
    dom.kendoGrid({
        toolbar: [ { name: "excel" }]
    });

    equal(dom.find(".k-grid-excel").text(), "Export to Excel");
});

test("clicking the excel button calls the excel export method", 1, function() {
    var grid = dom.kendoGrid({
        toolbar: [ { name: "excel" }]
    }).data("kendoGrid");

    grid.exportToExcel = function() {
        ok(true);
    };

    dom.find(".k-grid-excel").trigger("click");
});

test("exportToExcel fires the excelExport event", function() {
    var grid = dom.kendoGrid({
        toolbar: [ { name: "excel" }],
        excelExport: function(e) {
            ok(true);
        }
    }).data("kendoGrid");

    grid.exportToExcel();
});

test("exportToExcel creates kendo.data.ExcelExporter with its columns and data source", 2, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.data.ExcelExporter = function(options) {
        strictEqual(options.columns, grid.columns);
        strictEqual(options.dataSource, grid.dataSource);

        this.workbook = function() {
            return $.Deferred().promise();
        }
    };

    grid.exportToExcel();
});

test("exportToExcel creates kendo.ooxml.Workbook from the result of the workbook method", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    var book = {};

    kendo.data.ExcelExporter = function(options) {
        this.workbook = function() {
            return $.Deferred(function(d) { d.resolve(book); }).promise();
        }
    };

    kendo.ooxml.Workbook = function(options) {
        strictEqual(options, book);
        this.toDataURL = function()  {
        };
    };

    grid.exportToExcel();
});

test("exportToExcel calls the workbook method of the exporter", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.data.ExcelExporter = function(options) {
        this.workbook = function() {
            ok(true);
            return $.Deferred().promise();
        };
    };

    grid.exportToExcel();
});

test("exportToExcel passes the excel.allPages option", 1, function() {
    var grid = dom.kendoGrid({
        excel: {
            allPages: false
        }
    }).data("kendoGrid");

    kendo.data.ExcelExporter = function(options) {
        equal(options.allPages, false);

        this.workbook = function() {
            return $.Deferred().promise();
        };
    };

    grid.exportToExcel();
});

test("exportToExcel passes the excel.filterable option", 1, function() {
    var grid = dom.kendoGrid({
        excel: {
            filterable: false
        }
    }).data("kendoGrid");

    kendo.data.ExcelExporter = function(options) {
        equal(options.filterable, false);

        this.workbook = function() {
            return $.Deferred().promise();
        };
    };

    grid.exportToExcel();
});

test("exportToExcel calls the toDataURL method of the workbook", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.ooxml.Workbook = function(options) {
        this.toDataURL = function() {
            ok(true);
        }
    };

    grid.exportToExcel();
});

test("exportToExcel calls kendo.saveAs", 1, function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.ooxml.Workbook = function(options) {
        this.toDataURL = function() {
            return "foo";
        }
    };

    kendo.saveAs = function(dataURI) {
       equal(dataURI, "foo");
    };

    grid.exportToExcel();
});

test("exportToExcel calls kendo.saveAs and passes the fileName option of the workbook as file name", function() {
    var grid = dom.kendoGrid({
        excelExport: function(e) {
            e.workbook.fileName = "foo";
        }
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName) {
       equal(fileName, "foo");
    };

    grid.exportToExcel();
});

test("exportToExcel uses 'Export.xlsx' as default file name", function() {
    var grid = dom.kendoGrid({
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName) {
       equal(fileName, "Export.xlsx");
    };

    grid.exportToExcel();
});

test("exportToExcel uses the excel.proxyURL option", function() {
    var grid = dom.kendoGrid({
        excel: {
            proxyURL: "foo"
        }
    }).data("kendoGrid");

    kendo.saveAs = function(dataURI, fileName, proxyURL) {
       equal(proxyURL, "foo");
    };

    grid.exportToExcel();
});

test("preventing excelExport stops kendo.saveAs", 0, function() {
    var grid = dom.kendoGrid({
        excelExport: function(e) {
            e.preventDefault();
        }
    }).data("kendoGrid");

    kendo.saveAs = function() {
        ok(false);
    };

    grid.exportToExcel();
});

}());
