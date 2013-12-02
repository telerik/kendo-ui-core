(function(){

var editor;

function formatRange(range, format) {
    var command = new kendo.ui.editor.FormatCommand({
        range:range,
        format: format,
        formatter: function() {
            return new kendo.ui.editor.BlockFormatter(format);
        }
    })
    command.editor = editor;
    command.exec();
}

editor_module("editor apply block format", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

test('applyFormat applies block format on full selection', function() {
    editor.value('<p>golgafrincham</p>');

    var pararagraph = $('p', editor.document)[0].firstChild;
    var range = editor.createRange();
    range.setStart(pararagraph, 0);
    range.setEnd(pararagraph, 13);

    formatRange(range, editor.options.formats.justifyCenter);

    equal(editor.value(), '<p style="text-align:center;">golgafrincham</p>');
});

test('applyFormat applies block format on partial selection', function() {
    editor.value('<p>golgafrincham</p>');

    var pararagraph = $('p', editor.document)[0].firstChild;
    var range = editor.createRange();
    range.setStart(pararagraph, 5);
    range.setEnd(pararagraph, 10);

    formatRange(range, editor.options.formats.justifyCenter);

    equal(editor.value(), '<p style="text-align:center;">golgafrincham</p>');
});

test('applyFormat applies block format on partial selection with line break', function() {
    editor.value('<p>golga<br />frincham</p>');

    var pararagraph = $('p', editor.document)[0];
    var range = editor.createRange();
    range.setStart(pararagraph.firstChild, 2);
    range.setEnd(pararagraph.lastChild, 4);

    formatRange(range, editor.options.formats.justifyCenter);

    equal(editor.value(), '<p style="text-align:center;">golga<br />frincham</p>');
});

test('applyFormat applies block format on block level around selection', function() {
    editor.value('golgafrincham');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 5);
    range.setEnd(editor.body.firstChild, 9);

    formatRange(range, editor.options.formats.justifyCenter);

    equal(editor.value(), '<div style="text-align:center;">golgafrincham</div>');
});
}());
