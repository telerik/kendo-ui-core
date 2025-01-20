import '@progress/kendo-ui/src/kendo.buttongroup.js';

let ButtonGroup = kendo.ui.ButtonGroup,
    buttonGroupContainer, buttonGroup;

export function setupEmptyButtonGroup() {
    buttonGroupContainer = $('<div id="buttonGroup"></div>');
    Mocha.fixture.append(buttonGroupContainer);
}
export function initializeButtonGroup(options) {
    buttonGroup = new ButtonGroup(buttonGroupContainer, options);
    return buttonGroup;
}

export function destroyButtonGroup() {
    buttonGroup.destroy();
    buttonGroupContainer.remove();
}

export function setupDom() {
    buttonGroupContainer = $('<div id="buttonGroup">' +
        '        <span>item0</span>' +
        '        <span>item1</span>' +
        '        <span>item2</span>' +
        '        <span>item3</span>' +
        '    </div>');
    Mocha.fixture.append(buttonGroupContainer);
}
