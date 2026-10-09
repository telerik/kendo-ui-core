import '@progress/kendo-ui/src/kendo.floatingtoolbar.js';

let FloatingToolBar = kendo.ui.FloatingToolBar,
    container, instance;

export function setup() {
    container = $('<div id="floatingtoolbar"></div>');
    Mocha.fixture.append(container);
}

export function initialize(options) {
    instance = new FloatingToolBar(container, options);
    return instance;
}

export function teardown() {
    if (instance) {
        instance.destroy();
        instance = null;
    }
    container.remove();
}

export function getInstance() {
    return instance;
}

export function getContainer() {
    return container;
}

export const defaultItems = [
    { type: "button", id: "bold", text: "Bold", icon: "bold" },
    { type: "button", id: "italic", text: "Italic", icon: "italic" },
    { type: "separator" },
    { type: "buttonGroup", buttons: [
        { id: "align-left", icon: "align-left" },
        { id: "align-center", icon: "align-center" }
    ] }
];
