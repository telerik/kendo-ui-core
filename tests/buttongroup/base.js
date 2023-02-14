var buttonGroupContainer;
var buttonGroup;
var ButtonGroup = kendo.ui.ButtonGroup;

function setupDom() {
    buttonGroupContainer = $('<ul id="buttonGroup">' +
        '        <li>item0</li>' +
        '        <li>item1</li>' +
        '        <li>item2</li>' +
        '        <li>item3</li>' +
        '    </ul>');
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