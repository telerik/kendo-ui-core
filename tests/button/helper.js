var button,
    buttonContainer;

function getButton(contents) {
    if (typeof contents == "undefined") {
        contents = "text";
    }

    button = $("<button type='button'>" + contents + "</button>").appendTo(QUnit.fixture);

    return button;
}

function getSpanButton(contents) {
    if (typeof contents == "undefined") {
        contents = "text";
    }

    button = $("<span>" + contents + "</span>").appendTo(QUnit.fixture);

    return button;
}

function getButtonContainer(contents) {
    if (typeof contents == "undefined") {
        contents = "text";
    }

    buttonContainer = $("<div class='buttonContainer'>" +
        "<button type='button'>" + contents + "</button>" +
        "<button type='button'>" + contents + "</button>" +
    "</div>").appendTo(QUnit.fixture);

    return buttonContainer;
}
