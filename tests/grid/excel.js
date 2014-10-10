(function() {

var dom;

var saveAsExcel  = kendo.ui.Grid.fn.saveAsExcel;

module("grid excel",  {
    setup: function() {
        dom = $("<div>");

        QUnit.fixture.append(dom);

        kendo.ui.Grid.fn.saveAsExcel = $.noop;
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.ui.Grid.fn.saveAsExcel = saveAsExcel;
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

    grid.saveAsExcel = function() {
        ok(true);
    };

    dom.find(".k-grid-excel").trigger("click");
});

}());
