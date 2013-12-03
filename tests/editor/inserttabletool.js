(function(){

var editor;

var tool;

editor_module("editor insert table tool", {
    setup: function() {
        kendo.effects.disable();
        editor = $("#editor-fixture").data("kendoEditor");
        tool = editor.wrapper.find('.k-createTable').parent();
    },
    teardown: function() {
        kendo.effects.enable();
    }
});

test("clicking a cell inserts a table", function() {
    tool.click();

    var cell = $(".k-ct-cell:first"),
        offset = cell.offset();

    cell.trigger({
        type: "mouseup",
        clientX: offset.left + cell.width()/2,
        clientY: offset.top + cell.height()/2
    });

    var dom = $("<div>" + editor.value() + "</div>");

    equal(dom.find("table").length, 1);
    equal(dom.find("tr:not(.k-selection-row)").length, 1);
    equal(dom.find("td:not(.k-selection-cell,.k-select-all)").length, 1);

    tool.click();
});

test("clicking the tool while it is disabled does not toggle the popup", function() {
    tool.addClass("k-state-disabled");

    tool.click();
    equal($(".k-ct-popup:visible").length, 0);

    tool.click();
    equal($(".k-ct-popup:visible").length, 0);
});

test("destroy method destroys popup", function() {
    var toolbar = editor.toolbar;
    var popup = toolbar.toolById("createtable")._popup;
    var called;

    withMock(popup, "destroy", function() { called = true }, function() {
        toolbar.destroy();

        ok(called);
    });
});

}());
