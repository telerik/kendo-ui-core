(function(){

    var editor;
    var BackspaceHandler = kendo.ui.editor.BackspaceHandler;

    editor_module("editor backspace handler", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.focus();
        }
    });

    function handleBackspace() {
        var handler = new BackspaceHandler(editor);

        handler.keydown({
            preventDefault: $.noop,
            keyCode: kendo.keys.BACKSPACE
        });
    }

    test("removes selected content", function() {
        editor.selectRange(createRangeFromText(editor, 'foo|bar|baz'));

        handleBackspace();

        equal(editor.value(), "foobaz");
    });

    test("removes table content", function() {
        var range = createRangeFromText(editor, '|<table><tr><td>foo</td><td>bar</td></tr></table>|');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

    test("removes table content", function() {
        var range = createRangeFromText(editor, '<table><tr><td>|foo</td><td>bar|</td></tr></table>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

}());
