(function(){

var editor;

var CleanFormatCommand = kendo.ui.editor.CleanFormatCommand;

editor_module("editor clean format command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
});

function cleanCommand(range) {
    var command = new CleanFormatCommand({
        range: range,
        remove: "strong,em".split(",")
    });
    command.editor = editor;
    return command;
}

test('removes strong tag', function() {
    editor.value('<strong>foo</strong>');

    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    var command = cleanCommand(range);
    command.exec();

    equal(editor.value(), 'foo');
});

}());
