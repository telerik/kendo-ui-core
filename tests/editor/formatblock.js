(function(){

var editor;

editor_module("editor format block", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
}, {
    tools: [
        "formatBlock"
    ]
});

test('tool should display format initially', function() {
    editor.value('');
    editor.focus();
    editor.trigger('select');
    equal($('.k-formatBlock').closest('.k-widget').find('.k-input').text(), 'Format')
});

test('tool displays known values', function() {
    var range = createRangeFromText(editor, '<p>|foo|</p>');
    editor.selectRange(range);
    editor.trigger('select');
    equal($('.k-formatBlock').closest('.k-widget').find('.k-input').text(), 'Paragraph')
});

}());
