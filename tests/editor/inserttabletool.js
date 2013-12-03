(function(){

var editor;
var tool;
var dom;
var editorNS = kendo.ui.editor;
var toolTemplate = kendo.template(editorNS.EditorUtils.buttonTemplate, { useWithBlock: false });

module("editor insert table tool", {
    setup: function() {
        kendo.effects.disable();
        tool = new editorNS.InsertTableTool();
        dom = $(toolTemplate({ popup: true, title: "createTable", cssClass: "createTable" }))
            .appendTo(QUnit.fixture);
        tool.initialize(dom, { title: "", editor: { exec: $.noop } });
    },
    teardown: function() {
        kendo.effects.enable();
        tool.destroy();
    }
});

test("clicking a cell inserts a table", function() {
    var popup = tool.popup();
    popup.toggle();

    var cell = popup.element.find(".k-ct-cell:first"),
        offset = cell.offset();

    var execArgs;

    withMock(tool._editor, "exec", function() { execArgs = arguments; }, function() {
        cell.trigger({
            type: "mouseup",
            clientX: offset.left + cell.width()/2,
            clientY: offset.top + cell.height()/2
        });

        ok(execArgs);
        equal(execArgs[0], "createTable");
        deepEqual(execArgs[1], { rows: 1, columns: 1 });
    });
});

test("clicking the tool while it is disabled does not toggle the popup", function() {
    dom.addClass("k-state-disabled");

    dom.click();
    equal($(".k-ct-popup:visible").length, 0);

    dom.click();
    equal($(".k-ct-popup:visible").length, 0);
});

}());
