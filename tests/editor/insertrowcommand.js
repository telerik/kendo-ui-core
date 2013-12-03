(function(){

var editor;

var InsertRowCommand = kendo.ui.editor.InsertRowCommand;

editor_module("editor insert html command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    },
    teardown: function() {
        $(".k-window,.k-overlay").remove();
    }
});

function execInsertRowCommand(options) {
    var command = new InsertRowCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range, command;

test("exec creates row below cursor", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertRowCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 2);
    equal(dom.find("td").length, 2);
});

test("exec creates row below cursor with proper amount of cells", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td><td></td><td></td></tr></table>");

    execInsertRowCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr:last").find("td").length, 3);
});

test("exec with position:'above' inserts row above selection", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertRowCommand({ range:range, position: "before" });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 2);
    equal(dom.find("td:last").text(), "foo");
});

test("row/cell classes are copied when creating new rows", function() {
    range = createRangeFromText(editor, "<table><tr class='a'><td class='b'>f||oo</td></tr></table>");

    execInsertRowCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr.a").length, 2);
    equal(dom.find("td.b").length, 2);
});

test("inserted row do not copy text content", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertRowCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td").text(), "foo");
});

}());
