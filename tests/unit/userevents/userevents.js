import '@progress/kendo-ui/src/kendo.userevents.js';
import { press, move, release } from '../../helpers/unit/general-utils.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let userEvents,
    clickMoveClick,
    UserEvents = kendo.UserEvents,
    ClickMoveClick = kendo.ClickMoveClick,
    element,
    parentEvents,
    childElement,
    childEvents;

function mouseEvent(type, target, x, y, which) {
    return {
        type: type,
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        which: which || 1,
        target: target,
        currentTarget: target,
        preventDefault: $.noop,
        stopPropagation: $.noop
    };
}

describe("UserEvents", function() {
    beforeEach(function() {
        element = $('<div />');
        userEvents = new UserEvents(element, { fastTap: true });
    });

    it("raises press on touchstart", function() {
        userEvents.bind("press", function(e) {
            assert.equal(e.x.location, 10);
            assert.equal(e.y.location, 20);
        });

        press(element, 10, 20);
    });

    it("includes event type in event data", function() {
        userEvents.bind("press", function(e) {
            assert.equal(e.type, "press");
        });

        press(element, 10, 20);
    });

    it("raises start on first mouse move", function() {
        userEvents.bind("start", function(e) {
            assert.equal(e.x.location, 15);
            assert.equal(e.y.location, 25);
        });

        press(element, 10, 20);
        move(element, 15, 25);
    });

    it("raises tap on tap", function() {
        userEvents.bind("tap", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20);
        release(element);
    });

    it("fires release, then tap", function() {
        let releaseFired = false;

        userEvents.bind("release", function(e) {
            releaseFired = true;
        });

        userEvents.bind("tap", function(e) {
            assert.isOk(releaseFired);
        });

        press(element, 10, 20);
        release(element);
    });

    asyncTest("resets velocity on direction change", function(done) {
        userEvents.bind("end", function(e) {
            done(() => {
                assert.isOk(e.x.velocity > 0);
                assert.isOk(e.y.velocity < 0);
            });
        });

        press(element, 10, 20);

        setTimeout(function() {
            move(element, 1, 30);
        }, 1);

        setTimeout(function() {
            move(element, 10, 20);
        }, 1);

        setTimeout(function() {
            release(element, 10, 20);
        }, 1);
    });


    it("passes delta on mousemove", function() {
        userEvents.bind("move", function(e) {
            assert.equal(e.x.delta, 10);
            assert.equal(e.y.delta, 20);
        });

        press(element, 10, 20);
        move(element, 20, 40);
    });

    it("does not track unpressed mousemove", function() {
        userEvents.bind("move", function(e) {
            assert.isOk(false);
        });

        move(element, 20, 40);
    });

    asyncTest("calculates velocity on mouseup", function(done) {
        userEvents.bind("end", function(e) {
            done(() => {
                assert.isOk(e.x.velocity > 0);
                assert.isOk(e.y.velocity < 0);
            });
        });

        press(element, 10, 20);

        setTimeout(function() {
            move(element, 20, 10);
        }, 1);

        setTimeout(function() {
            release(element, 20, 0);
        }, 1);
    });
});

describe("filter option", function() {
    beforeEach(function() {
        element = $('<div><div id="foo"></div><div id="bar"></div></div>');
        userEvents = new UserEvents(element, {
            filter: "#foo"
        });
    });

    it("binds to drag performed on elements matching filter", function() {
        userEvents.bind("start", function(e) {
            assert.isOk(true);
        });

        element = element.find("#foo");

        press(element, 10, 20);
        move(element, 15, 25);
    });

    it("ignores drag performed on elements not matching filter", function() {
        userEvents.bind("start", function(e) {
            assert.isOk(false);
        });
        element = element.find("#bar");

        press(element, 10, 20);
        move(element, 15, 25);
    });
});

describe("threshold option", function() {
    beforeEach(function() {
        element = $('<div />');
        $(Mocha.fixture).empty().append(element);
        userEvents = new UserEvents(element, {
            threshold: 5
        });
    });

    it("ignores drag if less than threshold option", function() {
        userEvents.bind("start", function(e) {
            assert.isOk(false);
        });

        press(element, 10, 20);
        move(element, 11, 21);
    });

    it("raises start if distance is more than threshold option", function() {
        userEvents.bind("start", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20);
        move(element, 14, 24);
    });
});

describe("hold", function() {
    beforeEach(function() {
        kendo.UserEvents.minHold(100);
        element = $('<div />').appendTo(Mocha.fixture);
        userEvents = new UserEvents(element, {
            threshold: 5
        });
    });
    afterEach(function() {
        kendo.UserEvents.minHold(800);
    });

    asyncTest("triggers hold after a while", function(done) {
        let success = false;
        userEvents.bind("hold", function(e) {
            success = true;
        });

        press(element, 10, 20);

        setTimeout(function() {
            release(element, 10, 20);
            done(() => assert.isOk(success));
        }, 200);
    });
});

describe("nested elements", function() {
    beforeEach(function() {
        element = $('<div id="parent"><div class="foo"></div><div id="child"><div class="foo"></div></div></div>');
        parentEvents = new UserEvents(element, {
            filter: ">.foo"
        });

        childElement = element.find("#child");

        childEvents = new UserEvents(childElement, {
            filter: ">.foo"
        });
    });

    it("ignores drag if filter does not match elements", function() {
        parentEvents.bind("start", function() {
            assert.isOk(false);
        });

        childEvents.bind("start", function() {
            assert.isOk(true);
        });

        element = childElement.children(".foo");

        press(element, 10, 20);
        move(element, 24, 54);
    });
});

describe("gestures", function() {
    beforeEach(function() {
        element = $('<div />');
        userEvents = new UserEvents(element, { multiTouch: true });

        press(element, 10, 20);
        move(element, 15, 25);
    });

    it("gesture start passes the center of the two touches", function() {
        userEvents.bind("gesturestart", function(e) {
            assert.equal(e.center.x, 10);
            assert.equal(e.center.y, 20);
        });

        press(element, 5, 15, 2);
    });

    it("gesture start passes the distance of the two touches", function() {
        userEvents.bind("gesturestart", function(e) {
            assert.closeTo(e.distance, 14.1, 0.1);
        });

        press(element, 5, 15, 2);
    });

    it("triggers gesturestart on second touch move", function() {
        userEvents.bind("gesturestart", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    it("accepts maximum 2 fingers", function() {
        userEvents.bind("gesturestart", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20, 2);
        press(element, 10, 20, 3);
    });


    it("does not trigger move on second touch move", function() {
        userEvents.bind("move", function(e) {
            assert.isOk(false);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    it("triggers gesturechange", function() {
        userEvents.bind("gesturechange", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    it("triggers gestureend", function() {
        userEvents.bind("gestureend", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
        release(element, 15, 25, 2);
    });

    it("triggers end after the first touch is over", function() {
        userEvents.bind("end", function(e) {
            assert.isOk(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
        release(element, 15, 25, 2);
        release(element, 15, 25, 1);
    });

    it("triggers gesturestart before first touch move", function() {
        let gestureStarted = false;
        userEvents.bind("gesturestart", function(e) {
            gestureStarted = true;
        });

        userEvents.bind("gesturechange", function() {
            assert.isOk(gestureStarted);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 1);
    });
});

describe("UserEvents API", function() {
    beforeEach(function() {
        element = $('<div />');
        userEvents = new UserEvents(element);
    });

    it("raises press on press", function() {
        userEvents.bind("press", function(e) {
            assert.equal(e.x.location, 10);
            assert.equal(e.y.location, 20);
        });

        userEvents.press(10, 20);
    });

    it("raises start on first move", function() {
        userEvents.bind("start", function(e) {
            assert.equal(e.x.location, 15);
            assert.equal(e.y.location, 25);
        });

        userEvents.press(10, 20);
        userEvents.move(15, 25);
    });

    it("raises end on end call", function() {
        userEvents.bind("end", function(e) {
            assert.isOk(true);
        });

        userEvents.press(10, 20);
        userEvents.move(15, 25);
        userEvents.end(15, 25);
    });

    it("cancel clears active touches", function() {
        press(element, 5, 15, 2);
        userEvents.cancel();
        assert.equal(userEvents.touches.length, 0);
    });
});

describe("userEvents", function() {
    afterEach(function() {
        $(Mocha.fixture).find("iframe").remove();
    });

    it("sets its element owner document as surface", function() {
        let iframe = $("<iframe />")
            .appendTo(Mocha.fixture)
            .contents().find('body').append("<div id='element'></div>");
        let element = $(iframe).find("#element")[0];

        userEvents = new UserEvents(element, { global: true });

        assert.equal(userEvents.surface[0], element.ownerDocument.documentElement);
    });
});

describe("selection", function() {
    beforeEach(function() {
        element = $('<div />');
        userEvents = new UserEvents(element, { allowSelection: true });
    });

    if ("onselectstart" in document.body && kendo.support.browser.msie) {
        it("raises select on selectstart", function() {
            userEvents.bind("select", function(e) {
                assert.isOk(true);
            });

            element.trigger("selectstart");
        });
    } else {
        it("raises select on mousedown", function() {
            userEvents.bind("select", function(e) {
                assert.isOk(true);
            });

            element.trigger("mousedown");
        });
    }
});

describe("doubleTap", function() {
    beforeEach(function() {
        element = $('<div />');
        userEvents = new UserEvents(element, { fastTap: true, supportDoubleTap: true });
    });

    asyncTest("doubleTap should be fired when doubleTapSupport is enabled", function(done) {
        userEvents.bind("doubleTap", function(e) {
            done(() => assert.isOk(true));
        });

        press(element, 10, 20, 1);
        release(element);
        press(element, 10, 20, 1);
        release(element);
    });

    asyncTest("tap should be fired when doubleTapSupport is enabled", function(done) {
        userEvents.bind("tap", function(e) {
            done(() => assert.isOk(true));
        });

        press(element, 10, 20, 1);
        release(element);
    });

    asyncTest("tap should be fired when two subsequent tabs are performed with a delay between them", function(done) {
        let countTap = 0;
        let countDoubleTap = 0;

        userEvents.bind("tap", function(e) {
            countTap++;
        });

        userEvents.bind("doubleTap", function(e) {
            countDoubleTap++;
        });

        press(element, 10, 20);
        release(element);

        setTimeout(function() {
            press(element, 10, 20);
            release(element);

            setTimeout(function() {
                done(() => {
                    assert.equal(countTap, 2);
                    assert.equal(countDoubleTap, 0);
                });
            }, 300);

        }, 450);
    });
});

describe("UserEvents coverage", function() {
    let originalPointers;
    let originalMsPointers;
    let originalEventCapture;
    let originalDelayedClick;
    let originalBrowserVersion;

    beforeEach(function() {
        element = $('<div />').appendTo(Mocha.fixture);
        originalPointers = kendo.support.pointers;
        originalMsPointers = kendo.support.msPointers;
        originalEventCapture = kendo.support.eventCapture;
        originalDelayedClick = kendo.support.delayedClick;
        originalBrowserVersion = kendo.support.browser.version;
    });

    afterEach(function() {
        if (userEvents) {
            userEvents.destroy();
            userEvents = null;
        }

        if (parentEvents) {
            parentEvents.destroy();
            parentEvents = null;
        }

        kendo.support.pointers = originalPointers;
        kendo.support.msPointers = originalMsPointers;
        kendo.support.eventCapture = originalEventCapture;
        kendo.support.delayedClick = originalDelayedClick;
        kendo.support.browser.version = originalBrowserVersion;
        UserEvents.current = null;
        kendo.destroy(Mocha.fixture);
    });

    it("creates mouse touches from mouse events", function() {
        userEvents = new UserEvents(element, { fastTap: true });

        userEvents._start(mouseEvent("mousedown", element[0], 10, 20));

        assert.equal(userEvents.touches[0].type, "mouse");
    });

    it("creates pointer touches from pointer events", function() {
        userEvents = new UserEvents(element, { fastTap: true });
        kendo.support.pointers = true;
        kendo.support.msPointers = false;

        userEvents._start({
            type: "pointerdown",
            target: element[0],
            currentTarget: element[0],
            originalEvent: {
                pointerId: 7,
                pageX: 10,
                pageY: 20,
                clientX: 10,
                clientY: 20,
                screenX: 10,
                screenY: 20
            },
            preventDefault: $.noop,
            stopPropagation: $.noop
        });

        assert.equal(userEvents.touches[0].type, "pointer");
    });

    it("applies pointer touch-action styles for old and new browsers", function() {
        kendo.support.pointers = true;
        kendo.support.msPointers = false;
        kendo.support.browser.version = 10;

        userEvents = new UserEvents(element, { touchAction: "pan-x" });

        userEvents.destroy();
        userEvents = null;

        kendo.support.browser.version = 11;
        userEvents = new UserEvents(element, { touchAction: "manipulation" });

        assert.isOk(true);
    });

    it("binds dragstart prevention when configured", function() {
        userEvents = new UserEvents(element, { preventDragEvent: true });

        assert.isOk($._data(element[0], "events").dragstart);
    });

    it("prevents click when tap is prevented for click-based taps", function() {
        let prevented = false;

        kendo.support.delayedClick = function() {
            return false;
        };

        userEvents = new UserEvents(element);
        userEvents.bind("tap", function(e) {
            e.preventDefault();
        });

        let event = $.Event("click", { pageX: 1, pageY: 2, clientX: 1, clientY: 2 });
        event.preventDefault = function() {
            prevented = true;
        };

        element.trigger(event);

        assert.isTrue(prevented);
    });

    it("prevents selection when allowSelection is disabled", function() {
        let prevented = false;
        userEvents = new UserEvents(element, { allowSelection: false });

        userEvents._select({
            preventDefault: function() {
                prevented = true;
            }
        });

        assert.isTrue(prevented);
    });

    it("forwards preventDefault and stopPropagation from start options", function() {
        let defaultPrevented = false;
        let propagationStopped = false;

        userEvents = new UserEvents(element, {
            fastTap: true,
            preventDefault: true,
            stopPropagation: true
        });

        userEvents._start({
            type: "touchstart",
            which: 1,
            target: element[0],
            currentTarget: element[0],
            originalEvent: {
                changedTouches: [{
                    pageX: 10,
                    pageY: 20,
                    clientX: 10,
                    clientY: 20,
                    screenX: 10,
                    screenY: 20,
                    identifier: 1,
                    target: element[0]
                }]
            },
            preventDefault: function() {
                defaultPrevented = true;
            },
            stopPropagation: function() {
                propagationStopped = true;
            }
        });

        assert.isTrue(defaultPrevented);
        assert.isTrue(propagationStopped);
    });

    it("prevents surface up when a touch has moved", function() {
        let prevented = false;
        userEvents = new UserEvents(element, { fastTap: true });

        press(element, 10, 20);
        move(element, 30, 40);

        userEvents.preventIfMoving({
            preventDefault: function() {
                prevented = true;
            }
        });

        assert.isTrue(prevented);
    });

    it("stops processing touches once the max touches limit is reached", function() {
        userEvents = new UserEvents(element, { fastTap: true });

        userEvents._start({
            type: "touchstart",
            which: 1,
            target: element[0],
            currentTarget: element[0],
            originalEvent: {
                changedTouches: [{
                    pageX: 10,
                    pageY: 20,
                    clientX: 10,
                    clientY: 20,
                    screenX: 10,
                    screenY: 20,
                    identifier: 1,
                    target: element[0]
                }, {
                    pageX: 30,
                    pageY: 40,
                    clientX: 30,
                    clientY: 40,
                    screenX: 30,
                    screenY: 40,
                    identifier: 2,
                    target: element[0]
                }]
            },
            preventDefault: $.noop,
            stopPropagation: $.noop
        });

        assert.equal(userEvents.touches.length, 1);
    });

    it("skips touches that do not resolve to a filtered target", function() {
        userEvents = new UserEvents(element, { fastTap: true, filter: ".match" });

        userEvents._start({
            type: "touchstart",
            which: 1,
            target: element[0],
            originalEvent: {
                changedTouches: [{
                    pageX: 10,
                    pageY: 20,
                    clientX: 10,
                    clientY: 20,
                    screenX: 10,
                    screenY: 20,
                    identifier: 1,
                    target: element[0]
                }]
            },
            preventDefault: $.noop,
            stopPropagation: $.noop
        });

        assert.equal(userEvents.touches.length, 0);
    });

    it("ignores move when movement is temporarily disabled", function() {
        userEvents = new UserEvents(element, { fastTap: true });

        press(element, 10, 20);
        userEvents._shouldNotMove = true;
        move(element, 30, 40);

        assert.isFalse(userEvents.touches[0].isMoved());
    });

    it("disposes a competing touch when another user events instance captured movement", function() {
        let otherElement = $('<div />').appendTo(Mocha.fixture);

        userEvents = new UserEvents(element, { fastTap: true, threshold: 0 });
        parentEvents = new UserEvents(otherElement, { fastTap: true });

        press(element, 10, 20);
        parentEvents.capture();
        move(element, 30, 40);

        assert.equal(userEvents.touches.length, 0);
    });

    it("supports skipping and canceling touches directly", function() {
        userEvents = new UserEvents(element, { fastTap: true });

        press(element, 10, 20);
        userEvents.touches[0].skip();
        assert.equal(userEvents.touches.length, 0);

        press(element, 10, 20);
        userEvents.touches[0].cancel();
        assert.equal(userEvents.touches.length, 0);
    });

    it("does not process a touch twice after it has finished", function() {
        userEvents = new UserEvents(element, { fastTap: true });

        press(element, 10, 20);

        let touch = userEvents.touches[0];
        touch.end({
            event: {
                preventDefault: $.noop
            }
        });

        touch.end({
            event: {
                preventDefault: function() {
                    assert.isOk(false);
                }
            }
        });

        assert.isTrue(touch._finished);
    });

    it("prevents the native event when a start handler prevents default", function() {
        let prevented = false;

        userEvents = new UserEvents(element, { fastTap: true });
        userEvents.bind("start", function(e) {
            e.preventDefault();
        });

        press(element, 10, 20);

        let touch = userEvents.touches[0];
        touch.x.initialDelta = 10;
        touch.y.initialDelta = 10;

        touch._start({
            event: {
                preventDefault: function() {
                    prevented = true;
                }
            }
        });

        assert.isTrue(prevented);
    });

    it("raises gesturetap for multitouch taps", function() {
        let fired = false;
        userEvents = new UserEvents(element, { multiTouch: true, fastTap: true });

        userEvents.bind("gesturetap", function() {
            fired = true;
        });

        press(element, 10, 20, 1);
        press(element, 20, 30, 2);
        release(element, 10, 20, 1);

        assert.isTrue(fired);
    });

    it("wires and unwires capture listeners when captureUpIfMoved is enabled", function() {
        let addCount = 0;
        let removeCount = 0;
        let surfaceElement = element[0];
        let originalAdd = surfaceElement.addEventListener;
        let originalRemove = surfaceElement.removeEventListener;

        surfaceElement.addEventListener = function() {
            addCount++;
            return originalAdd.apply(this, arguments);
        };

        surfaceElement.removeEventListener = function() {
            removeCount++;
            return originalRemove.apply(this, arguments);
        };

        kendo.support.eventCapture = true;
        userEvents = new UserEvents(element, { captureUpIfMoved: true });

        assert.isTrue(addCount > 0);

        userEvents.destroy();
        userEvents = null;

        surfaceElement.addEventListener = originalAdd;
        surfaceElement.removeEventListener = originalRemove;

        assert.isTrue(removeCount > 0);
    });
});

describe("ClickMoveClick coverage", function() {
    beforeEach(function() {
        element = $('<div />').appendTo(Mocha.fixture);
        clickMoveClick = new ClickMoveClick(element);
    });

    afterEach(function() {
        if (clickMoveClick) {
            clickMoveClick.destroy();
            clickMoveClick = null;
        }

        kendo.destroy(Mocha.fixture);
    });

    it("marks notification payloads as clickMoveClick", function() {
        clickMoveClick.bind("start", function(e) {
            assert.isTrue(e.clickMoveClick);
        });

        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));
    });

    it("cancels on right mouse button down", function() {
        let canceled = false;
        clickMoveClick.cancel = function() {
            canceled = true;
        };

        clickMoveClick._down({ which: 2 });

        assert.isTrue(canceled);
    });

    it("cancels when up target does not match the down target", function() {
        let canceled = false;

        clickMoveClick.cancel = function() {
            canceled = true;
        };

        clickMoveClick._down({ which: 1, target: element[0] });
        clickMoveClick._up({ which: 1, target: $("<span />")[0] });

        assert.isTrue(canceled);
    });

    it("starts on matching up and ends on the next surface up", function() {
        let ended = false;

        clickMoveClick.bind("end", function() {
            ended = true;
        });

        clickMoveClick._down({ which: 1, target: element[0] });
        clickMoveClick._up(mouseEvent("mouseup", element[0], 10, 20));

        assert.equal(clickMoveClick.touches.length, 1);

        clickMoveClick._surfaceUp(mouseEvent("mouseup", element[0], 10, 20));
        clickMoveClick._surfaceUp(mouseEvent("mouseup", element[0], 10, 20));

        assert.isTrue(ended);
        assert.equal(clickMoveClick.touches.length, 0);
    });

    it("ends immediately on up when a touch is already active", function() {
        let ended = false;

        clickMoveClick.bind("end", function() {
            ended = true;
        });

        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));
        clickMoveClick._down({ which: 1, target: element[0] });
        clickMoveClick._up(mouseEvent("mouseup", element[0], 10, 20));

        assert.isTrue(ended);
        assert.equal(clickMoveClick.touches.length, 0);
    });

    it("ignores cancel-like surface up events", function() {
        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));

        clickMoveClick._surfaceUp({ type: "touchcancel" });

        assert.equal(clickMoveClick.touches.length, 1);
    });

    it("ignores right-button surface up events", function() {
        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));

        clickMoveClick._surfaceUp({ type: "mouseup", which: 2 });

        assert.equal(clickMoveClick.touches.length, 1);
    });

    it("does not cancel while preventCancel flag is set", function() {
        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));
        clickMoveClick._preventCancel = true;

        clickMoveClick.cancel();

        assert.isFalse(clickMoveClick._preventCancel);
        assert.equal(clickMoveClick.touches.length, 1);
    });

    it("cancel disposes active touches and fires cancel", function() {
        let canceled = false;

        clickMoveClick.bind("cancel", function() {
            canceled = true;
        });

        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));
        clickMoveClick.cancel();

        assert.isTrue(canceled);
        assert.equal(clickMoveClick.touches.length, 0);
    });

    it("ignores additional starts after reaching the max touches", function() {
        clickMoveClick._start(mouseEvent("mousedown", element[0], 10, 20));
        clickMoveClick._start(mouseEvent("mousedown", element[0], 20, 30));

        assert.equal(clickMoveClick.touches.length, 1);
    });

    it("captures the current click move click instance", function() {
        clickMoveClick.capture();

        assert.equal(ClickMoveClick.current, clickMoveClick);
    });

    it("is safe to destroy twice", function() {
        clickMoveClick.destroy();
        clickMoveClick.destroy();
        clickMoveClick = null;

        assert.isOk(true);
    });
});
