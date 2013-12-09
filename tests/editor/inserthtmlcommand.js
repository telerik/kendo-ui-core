(function(){

var editor;

editor_module("editor insert html command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
}, {
    tools: [
        { name: "insertHtml", items: [
            { text: "foo", value: "bar" }
        ] }
    ],
    insertHtml: [
        { text: "foo", value: "bar" }
    ]
});

function execInsertHtmlCommand(range, value) {
    var command = new kendo.ui.editor.InsertHtmlCommand({ range: range, value: value });
    command.editor = editor;
    command.exec();
}

test("exec calls clipboard paste", function() {
    var argument;

    withMock(editor.clipboard, "paste", function() { argument = arguments[0]; }, function() {
        var range = createRangeFromText(editor, 'f|o|o');

        execInsertHtmlCommand(range, '<span class="bar"></span>');

        equal(argument, '<span class="bar"></span>');
    });
});

test("exec inserts html parameter", function() {
    var range = createRangeFromText(editor, 'fo||o');

    execInsertHtmlCommand(range, '<span class="bar"></span>');

    equal(editor.value(), 'fo<span class="bar"></span>o');
});

test("exec insertHtml honors split parameter", function() {
    var range = createRangeFromText(editor, '<em>fo||o</em>');

    editor.selectRange(range);
    editor.exec("insertHtml", { html: "bar", split: false });

    equal(editor.value(), '<em>fobaro</em>');
});

test("exec places cursor after inserted text", function() {
    var range = createRangeFromText(editor, 'foo||');
    editor.selectRange(range);

    execInsertHtmlCommand(editor.getRange(), 'bar');
    execInsertHtmlCommand(editor.getRange(), 'baz');

    equal(editor.value(), "foobarbaz");
});

test("insertHtml tool gets snippets from its items collection", function() {
    var data = editor.wrapper.find("select").data("kendoSelectBox").dataSource.data();

    equal(data.length, 1);
    equal(data[0].text, "foo");
    equal(data[0].value, "bar");
});

test("insertHtml tool gets snippets from its legacy configuration", function() {
    var data = editor.wrapper.find("select").data("kendoSelectBox").dataSource.data();

    equal(data.length, 1);
    equal(data[0].text, "foo");
    equal(data[0].value, "bar");
});

}());
