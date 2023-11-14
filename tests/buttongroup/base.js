var buttonGroupContainer;
var buttonGroup;
var ButtonGroup = kendo.ui.ButtonGroup;

function setupDom() {
    buttonGroupContainer = $('<div id="buttonGroup">' +
        '        <span>item0</span>' +
        '        <span>item1</span>' +
        '        <span>item2</span>' +
        '        <span>item3</span>' +
        '    </div>');
    Mocha.fixture.append(buttonGroupContainer);
}
function setupEmptyButtonGroup() {
    buttonGroupContainer = $('<div id="buttonGroup"></div>');
    Mocha.fixture.append(buttonGroupContainer);
}
function initializeButtonGroup(options) {
    buttonGroup = new ButtonGroup(buttonGroupContainer, options);
    return buttonGroup;
}