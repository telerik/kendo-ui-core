let button, buttonGroupContainer, buttonGroup;

export function getButton(contents) {
    if (typeof contents == "undefined") {
        contents = "text";
    }

    button = $("<button type='button'>" + contents + "</button>").appendTo(Mocha.fixture);

    return button;
}

export function getSpanButton(contents) {
    if (typeof contents == "undefined") {
        contents = "text";
    }

    button = $("<span>" + contents + "</span>").appendTo(Mocha.fixture);

    return button;
}
