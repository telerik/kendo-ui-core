import '@progress/kendo-ui/src/kendo.maskedtextbox.js';

export function createInput() {
    return $("<input />").appendTo(Mocha.fixture);
}

export function updateInputAt(masked, updated, pos) {
    let textBox = masked.element[0];
    let value = textBox.value;

    textBox.value = value.substring(0, pos) + updated + value.substring(pos);
    kendo.caret(textBox, pos + updated.length);
    masked.inputChange();
}

export function updateInput(masked, updated) {
    updateInputAt(masked, updated, 0);
}

export function updateChars(masked, updated) {
    let chars = updated.split("");
    for (let i = 0; i < chars.length; i++) {
        updateInputAt(masked, chars[i], i);
    }
}

export function createMasked(input, mask) {
    let isMask = typeof (mask) === "string";
    let opts = isMask ? { mask: mask } : mask;
    let masked = new kendo.ui.MaskedTextBox(input, opts);

    return masked;
}

export function deleteContent(masked, pos, length) {
    let l = length || 1;
    let input = masked.element[0];
    let value = input.value;
    input.value = value.substring(0, pos) + value.substring(pos + l);
    kendo.caret(input, pos);
    masked.inputChange();
}

export function deleteBackwards(masked, pos, length) {
    let l = length || 1;
    let input = masked.element[0];
    let value = input.value;
    input.value = value.substring(0, Math.max(pos - l, 0)) + value.substring(pos);
    //chrome 58 fails when we try to set selectionStart to -1;
    //make sure it is not smaller than 0
    kendo.caret(input, Math.max(pos - l, 0));
    masked.inputChange(true);
}
