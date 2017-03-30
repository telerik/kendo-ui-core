/* exported createInput */
function createInput() {
    return $("<input />").appendTo(QUnit.fixture);
}

/* exported updateInputAt */
function updateInputAt(masked, updated, pos) {
    var textBox = masked.element[0];
    var value = textBox.value;

    textBox.value = value.substring(0, pos) + updated + value.substring(pos);
    kendo.caret(textBox, pos + updated.length);
    masked.inputChange();
}

/* exported updateInput */
function updateInput(masked, updated) {
    updateInputAt(masked, updated, 0);
}

/* exported updateChars */
function updateChars(masked, updated) {
    var chars = updated.split("");
    for(var i = 0; i < chars.length; i++) {
        updateInputAt(masked, chars[i], i);
    }
}

/* exported createMasked */
function createMasked(input, mask) {
    var isMask = typeof(mask) === "string";
    var opts = isMask ? { mask: mask } : mask;
    var masked = new kendo.ui.MaskedTextBox(input, opts);

    return masked;
}

/* exported deleteContent */
function deleteContent(masked, pos, length) {
    var l = length || 1;
    var input = masked.element[0];
    var value = input.value;
    input.value = value.substring(0, pos) + value.substring(pos + l);
    kendo.caret(input, pos);
    masked.inputChange();
}

/* exported deleteBackwards */
function deleteBackwards(masked, pos, length) {
    var l = length || 1;
    var input = masked.element[0];
    var value = input.value;
    input.value = value.substring(0, pos - l) + value.substring(pos);
    kendo.caret(input, pos - l);
    masked.inputChange(true);
}
