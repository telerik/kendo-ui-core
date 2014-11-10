(function() {

var dom;

var saveAsPDF = kendo.ui.Grid.fn.saveAsPDF;

saveAsPDFTests("Grid", function() {
    var dom = $("<div>").appendTo(QUnit.fixture);
    dom.kendoGrid({});

    return dom.getKendoGrid();
});

module("grid pdf export",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.ui.Grid.fn.saveAsPDF = $.noop;
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.ui.Grid.fn.saveAsPDF = saveAsPDF;
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

    grid.saveAsPDF = function() {
        ok(true);
    };

    dom.find(".k-grid-pdf").trigger("click");
});

}());
