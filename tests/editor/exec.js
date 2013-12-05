(function(){

var editor;

editor_module("editor exec", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   },
   teardown: function() {
       kendo.destroy("[data-role=window]");
   }
});

function assertCommand(type, name) {
    var command;

    withMock(editor.undoRedoStack, "push", function () { command = arguments[0]; }, function() {
        editor.value("foo");

        var range = editor.createRange();
        range.selectNodeContents(editor.body);
        editor.selectRange(range);
        editor.exec(name);

        ok(command instanceof type);
    });
}

test("exec pushes command to undo stack", function() {
    var pushArgument;

    withMock(editor.undoRedoStack, "push", function() { pushArgument = arguments[0]; }, function() {
        editor.value("foo");

        var range = editor.createRange();
        range.selectNodeContents(editor.body);
        editor.selectRange(range);

        editor.exec("bold");

        ok(undefined !== pushArgument);
    });
});

test("exec undo performs undo", function() {
    var called = false;

    withMock(editor.undoRedoStack, "undo", function () { called = true; }, function() {
        editor.exec("undo");

        ok(called);
    });
});

test("exec redo performs redo", function() {
    var called = false;

    withMock(editor.undoRedoStack, "redo", function () { called = true; }, function() {
        editor.exec("redo");

        ok(called);
    });
});

test("exec inline command", function() {
    $.each(["bold", "italic", "underline", "strikethrough"], function() {
        assertCommand(kendo.ui.editor.FormatCommand, this);
    });
});

test("exec unordered list", function() {
    assertCommand(kendo.ui.editor.ListCommand, "insertUnorderedList");
});

test("exec ordered list", function() {
    assertCommand(kendo.ui.editor.ListCommand, "insertOrderedList");
});

test("exec block command", function() {
    $.each(["justifyCenter", "justifyLeft", "justifyRight", "justifyFull"], function() {
        assertCommand(kendo.ui.editor.FormatCommand, this);
    });
});

test("exec insertLineBreak creates newLineCommand", function() {
    assertCommand(kendo.ui.editor.NewLineCommand, "insertLineBreak");
});

test("exec insertParagraph creates paragraph command", function() {
    assertCommand(kendo.ui.editor.ParagraphCommand, "insertParagraph");
});

test("exec createLink creates LinkCommand", function() {
    assertCommand(kendo.ui.editor.LinkCommand, "createLink");
});

test("exec unlink creates UnlinkCommand", function() {
    assertCommand(kendo.ui.editor.UnlinkCommand, "unlink");
});

test("exec indent creates indent command", function() {
    assertCommand(kendo.ui.editor.IndentCommand, "indent");
});

test("exec outdent creates indent command", function() {
    assertCommand(kendo.ui.editor.OutdentCommand, "outdent");
});

function innerHTML(element) {
    return element.innerHTML.toLowerCase().replace(/\ufeff/g, "BOM");
}

test("exec bold on empty range inserts tag", function() {
    editor.value("foo");

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.collapse(true);
    editor.selectRange(range);
    editor.exec("bold");

    equal(editor.value(), "foo");

    editor.getRange().insertNode(editor.document.createElement("a"));

    equal(innerHTML(editor.body), "foo<strong>BOM<a></a>BOM</strong>");
});

}());
