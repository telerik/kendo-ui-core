var impl,
    editor;

function getEditor(selector) {
    return $(selector || '#Editor1').data("kendoEditor");
}

function createRangeFromText(editor, html) {
    editor.value(html.replace(/\|/g, '<span class="t-marker"></span>'));
    var $markers = $('.t-marker', editor.body);

    var range = editor.createRange();
    range.setStartBefore($markers[0]);
    range.setEndAfter($markers[1]);

    var marker = new kendo.ui.editor.Marker();

    marker.start = $markers[0];
    marker.end = $markers[1];

    marker.remove(range);
    return range;
}
