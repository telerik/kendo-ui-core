var impl,   
    editor;

function getEditor(selector) {
    return $(selector || '#Editor').data("kendoEditor");
}