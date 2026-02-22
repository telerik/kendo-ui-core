import '@progress/kendo-ui/src/kendo.smartbox.js';

let SmartBox = kendo.ui.SmartBox,
    smartBoxContainer, smartBox;

export function setupEmptySmartBox() {
    smartBoxContainer = $('<input id="smartbox" />');
    Mocha.fixture.append(smartBoxContainer);
}

export function initializeSmartBox(options) {
    smartBox = new SmartBox(smartBoxContainer, options);
    return smartBox;
}

export function destroySmartBox() {
    if (smartBox) {
        smartBox.destroy();
    }
    smartBoxContainer.remove();
}

export function getSmartBox() {
    return smartBox;
}

export function getSmartBoxContainer() {
    return smartBoxContainer;
}

export const defaultSearchSettings = {
    enabled: true,
    placeholder: "Search...",
    delay: 300
};

export const defaultSemanticSearchSettings = {
    enabled: true,
    placeholder: "Semantic Search...",
    delay: 500
};

export const defaultAIAssistantSettings = {
    enabled: true,
    placeholder: "Ask AI...",
    service: {
        url: "https://test.api/ai"
    },
    promptSuggestions: [
        "Show sales data",
        "Filter by status",
        "Group by category"
    ]
};

export const allModesEnabled = {
    searchSettings: defaultSearchSettings,
    semanticSearchSettings: defaultSemanticSearchSettings,
    aiAssistantSettings: defaultAIAssistantSettings
};
