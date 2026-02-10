import '@progress/kendo-ui/src/kendo.html.icon.js';
import '@progress/kendo-ui/src/kendo.segmentedbutton.js';

let SegmentedButton = kendo.ui.SegmentedButton,
    segmentedButtonContainer, segmentedButton;

export function setupEmptySegmentedButton() {
    segmentedButtonContainer = $('<div id="segmentedButton"></div>');
    Mocha.fixture.append(segmentedButtonContainer);
}

export function initializeSegmentedButton(options) {
    segmentedButton = new SegmentedButton(segmentedButtonContainer, options);
    return segmentedButton;
}

export function destroySegmentedButton() {
    if (segmentedButton) {
        segmentedButton.destroy();
    }
    segmentedButtonContainer.remove();
}

export function getSegmentedButton() {
    return segmentedButton;
}

export function getSegmentedButtonContainer() {
    return segmentedButtonContainer;
}

export const defaultItems = [
    { value: "search", text: "Search", icon: "search" },
    { value: "ai", text: "AI Assistant", icon: "sparkles" }
];

export const itemsWithDisabled = [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2", disabled: true },
    { value: "option3", text: "Option 3" }
];
