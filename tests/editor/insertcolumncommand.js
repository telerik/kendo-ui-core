(function(){

var InsertColumnCommand = kendo.ui.editor.InsertColumnCommand;

var editor;

editor_module("editor insert column command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

function execInsertColumnCommand(options) {
    var command = new InsertColumnCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range, command;

test("exec creates column after cursor", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td").length, 2);
});

test("exec creates column after cursor on every row", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr><tr><td>bar</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    var rows = dom.find("tr");
    equal(rows[0].cells.length, 2);
    equal(rows[1].cells.length, 2);
});

test("exec with position:'before' inserts column before selection", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range, position: "before" });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td:first").text(), "");
    equal(dom.find("td:last").text(), "foo");
});

test("cell classes are copied when creating new columns", function() {
    range = createRangeFromText(editor, "<table><tr><td class='a'>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td.a").length, 2);
});

test("inserted row do not copy text content", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td").text(), "foo");
});

}());
