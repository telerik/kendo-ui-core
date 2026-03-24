import '@progress/kendo-ui/src/kendo.icons.js';
import '@progress/kendo-ui/src/kendo.html.icon.js';
import '@progress/kendo-ui/src/kendo.segmentedcontrol.js';

let SegmentedControl = kendo.ui.SegmentedControl,
    container, instance;

export function setup() {
    container = $('<div id="segmentedControl"></div>');
    Mocha.fixture.append(container);
}

export function initialize(options) {
    instance = new SegmentedControl(container, options);
    return instance;
}

export function teardown() {
    if (instance) {
        instance.destroy();
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
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" },
    { value: "option3", text: "Option 3" }
];

export const itemsWithIcons = [
    { value: "search", text: "Search", icon: "search" },
    { value: "home", text: "Home", icon: "home" }
];

export const itemsWithDisabled = [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2", enabled: false },
    { value: "option3", text: "Option 3" }
];

export const itemsWithIconClass = [
    { value: "gear", text: "Settings", icon: "gear", iconClass: "custom-icon-class" },
    { value: "home", text: "Home", icon: "home" }
];
