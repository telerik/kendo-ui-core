import '@progress/kendo-ui/src/kendo.window.js';
import { roughlyEqual } from '../../helpers/unit/general-utils.js';

let element;
let containment;

let setupWnd = function(options) {
    return element.kendoWindow(options).data("kendoWindow");
};

let resizewnd = function(wnd, direction, left, top) {
    let handle = wnd.wrapper.find(".k-resize-" + direction);
    let start = handle.offset();
    let userEvents = wnd.resizing._draggable.userEvents;

    let end = {
        left: start.left + left,
        top: start.top + top
    };

    userEvents.press(start.left, start.top, handle[0]);
    userEvents.move(end.left, end.top);
    userEvents.end(end.left, end.top);
};

describe("kendo.ui.window constrain-movement", function() {
    beforeEach(function() {
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; position: absolute;' />"
        ).appendTo(Mocha.fixture);
        element = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (element.data("kendoWindow")) {
            element.data("kendoWindow").destroy();
        }
        element = containment = null;
        kendo.destroy(Mocha.fixture);
    });

    it("default position inside containment", function() {
        let position;
        let containerPosition;

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);
        containerPosition = kendo.getOffset(containment);

        assert.equal(position.top, containerPosition.top);
        assert.equal(position.left, containerPosition.left);
    });

    it("position setting inside containment", function() {
        let position;
        let containerPosition;

        let wnd = setupWnd({
            visible: true,
            position: {
                top: 30,
                left: 30
            },
            draggable: {
                containment: containment
            }
        });

        containerPosition = kendo.getOffset(containment);
        position = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, 30 + containerPosition.top);
        assert.equal(position.left, 30 + containerPosition.left);
    });

    it("position inside containment with top and left", function() {
        let position;
        let containerPosition;
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);
        containerPosition = kendo.getOffset(containment);

        assert.equal(position.top, containerPosition.top);
        assert.equal(position.left, containerPosition.left);
    });

    it("position inside containment with position:fixed", function() {
        let position;
        containment = $(
            "<div style='height: 400px; width: 400px;'></div><div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: fixed;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, 0);
        assert.equal(position.left, 0);
    });

    it("position inside containment with position:relative", function() {
        let position;
        containment = $(
            "<div style='height: 400px; width: 400px;'></div><div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: relative;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, 0);
        assert.equal(position.left, 0);
    });

    it("position setting inside containment with top and left", function() {
        let position;
        let containerPosition;
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            position: {
                top: 30,
                left: 30
            },
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);
        containerPosition = kendo.getOffset(containment);
        assert.equal(position.top, containerPosition.top + 30);
        assert.equal(position.left, containerPosition.left + 30);
    });

    it("position setting inside containment with percentage", function() {
        let position;
        let containerPosition;
        let expectedOffset;
        containment = $(
            "<div id='container' style='height: 500px; width: 500px;position: relative; border: 1px solid grey;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            width: 50,
            height: 50,
            position: {
                top: "50%",
                left: "50%"
            },
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);
        containerPosition = kendo.getOffset(containment);

        roughlyEqual(position.top, containerPosition.top + containment.outerHeight() / 2, 1);
        roughlyEqual(position.left, containerPosition.left + containment.outerWidth() / 2, 1);
    });

    it("center inside containment with top and left", function() {
        let containerPosition;
        let expectedPosition;
        let currentPosition;
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        wnd.center();

        currentPosition = kendo.getOffset(wnd.wrapper);
        containerPosition = kendo.getOffset(containment);

        expectedPosition = {
            top:
                containerPosition.top +
                containment.height() / 2 -
                wnd.wrapper.outerHeight() / 2,
            left:
                containerPosition.left +
                containment.width() / 2 -
                wnd.wrapper.outerWidth() / 2
        };

        roughlyEqual(currentPosition.top, expectedPosition.top, 1);
        roughlyEqual(currentPosition.left, expectedPosition.left, 1);
    });

    it("maximize inside containment with top and left", function() {
        let position;
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        wnd.maximize();
        position = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, 200);
        assert.equal(position.left, 200);
        assert.equal(wnd.wrapper.outerWidth(), 400);
        assert.equal(wnd.wrapper.outerHeight(), 400);
    });

    it("maximize in browser context when pinned", function() {
        let position;
        let browserWindow = $(window);
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            pinned: true,
            draggable: {
                containment: containment
            }
        });

        wnd.maximize();
        position = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, 0);
        assert.equal(position.left, 0);
        assert.closeTo(wnd.wrapper.outerWidth(), browserWindow.width(), 1);
        assert.closeTo(
            wnd.wrapper.outerHeight(),
            browserWindow.height(),
            1
        );
    });

    it("keep position when restore inside containment with top and left", function() {
        let position;
        let expectedPosition;
        containment = $(
            "<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />"
        ).appendTo(Mocha.fixture);

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        position = kendo.getOffset(wnd.wrapper);
        wnd.minimize();
        wnd.restore();
        expectedPosition = kendo.getOffset(wnd.wrapper);

        assert.equal(position.top, expectedPosition.top);
        assert.equal(position.left, expectedPosition.left);
    });

    it("pin does not change position inside containment", function() {
        let positionBeforePin;
        let positionAfterPin;

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        positionBeforePin = kendo.getOffset(wnd.wrapper);
        wnd.pin();
        positionAfterPin = kendo.getOffset(wnd.wrapper);

        assert.equal(positionAfterPin.top, positionBeforePin.top);
        assert.equal(positionAfterPin.left, positionBeforePin.left);
    });

    it("pin unpin does not change position inside containment", function() {
        let positionBeforePin;
        let positionAfterPin;

        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        positionBeforePin = kendo.getOffset(wnd.wrapper);
        wnd.pin();
        wnd.unpin();
        positionAfterPin = kendo.getOffset(wnd.wrapper);

        assert.equal(positionAfterPin.top, positionBeforePin.top);
        assert.equal(positionAfterPin.left, positionBeforePin.left);
    });

    it("resizing horizontally is constrained to containment", function() {
        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        let containmentWidth = containment.width();

        resizewnd(wnd, "e", 500, 0);

        assert.equal(wnd.wrapper.outerWidth(), containmentWidth);
    });

    it("resizing horizontally is not constrained when pinned", function() {
        let wnd = setupWnd({
            visible: true,
            width: 100,
            height: 100,
            draggable: {
                containment: containment
            }
        });

        resizewnd(wnd, "e", 500, 0);

        assert.equal(wnd.wrapper.outerWidth(), 400);
    });

    it("resizing vertically is constrained to containment", function() {
        let wnd = setupWnd({
            visible: true,
            draggable: {
                containment: containment
            }
        });

        let containmentHeight = containment.height();

        resizewnd(wnd, "s", 0, 500);

        assert.equal(wnd.wrapper.outerHeight(), containmentHeight);
    });

    it("resizing vertically is not constrained when pinned", function() {
        let wnd = setupWnd({
            visible: true,
            width: 100,
            height: 100,
            draggable: {
                containment: containment
            }
        });

        resizewnd(wnd, "s", 0, 500);

        assert.equal(wnd.wrapper.outerHeight(), 400);
    });
});
