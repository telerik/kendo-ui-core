export function roughlyEqual(actual, expected, precision) {
    let assertResult = false;

    if (isNaN(parseFloat(actual)) || isNaN(parseFloat(expected))) {
        assertResult = actual === expected;
    }
    else {
        assertResult = (Math.abs(parseFloat(actual) - parseFloat(expected)) <= precision);
    }

    assert.equal(assertResult, true, "Expected: " + expected + ", Actual: " + actual);
}

export function tap(element, x, y, id) {
    x = x || 0;
    y = y || 0;
    press(element, x, y, id);
    release(element, x, y, id);
}

export function clickAt(element, x, y) {
    element.trigger($.Event("click", { pageX: x, pageY: y }));
}

export function press(element, x, y, id) {
    triggerTouchEvent(element, "touchstart", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

export function move(element, x, y, id) {
    triggerTouchEvent(element, "touchmove", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

export function release(element, x, y, id) {
    triggerTouchEvent(element, "touchend", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

export function mousewheel(element, delta) {
    $(element).trigger($.Event("mousewheel", { originalEvent: { detail: delta * 3 }, preventDefault: $.noop, stopPropagation: $.noop }));
}

export function keydown(element, args) {
    let isPlainObject = $.isPlainObject(args);
    let eventInfo = {
        type: "keydown",
        ctrlKey: false,
        altKey: false
    };

    isPlainObject ? $.extend(eventInfo, args) : eventInfo.keyCode = args;

    element.trigger(eventInfo);
}

export function triggerTouchEvent(element, type, info) {
    info.target = element;
    element.trigger($.Event(type, { originalEvent: { changedTouches: [info] }, preventDefault: $.noop, stopPropagation: $.noop }));
}

export function jQueryEventsInfo(element, event) {
    let events = jQueryEvents(element);

    if (!events) {
        return undefined;
    }

    return events[getJQueryEventType(event)];
}

function getJQueryEventType(type) {
    //jQuery attaches "mouseenter" and "mouseleave" as "mouseover" and "mouseout"
    if (type === "mouseenter") {
        return "mouseover";
    }

    if (type === "mouseleave") {
        return "mouseout";
    }

    return type;
}

export function jQueryEvents(element) {
    if (!element) {
        return undefined;
    }

    return $._data(element[0] || element, "events");
}

export function assertEvent(element, options) {
    let selector = options.selector;
    let namespace = options.namespace || "";
    let events = jQueryEvents(element);
    let type = getJQueryEventType(options.type);
    let event = events[type][0];

    assert.equal(options.type, event.origType);
    assert.equal(type, event.type);
    assert.equal(selector, event.selector);
    assert.equal(namespace, event.namespace);
}

export function assertEvents(element, events) {
    assert.equal(Object.keys(jQueryEvents(element)).length, events.length);

    for (let i = 0; i < events.length; i++) {
        assertEvent(element, events[i]);
    }
}

export function propertyFrom(className, property) {
    let element = $("<span class='" + className + "' />").appendTo(Mocha.fixture);
    let result = element.css(property);

    element.remove();

    return result;
}

export function arrayClose(a, b, tolerance) {
    if (a.length != b.length) {
        assert.isOk(false, "Arrays differ in size " + "(expected " + b.length + ", got " + a.length + " elements)");
    } else if (a.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].length) {
                arrayClose(a[i], b[i], tolerance, "Values at index " + i);
            } else {
                assert.closeTo(a[i], b[i], tolerance, "Values at index " + i);
            }
        }
    } else {
        assert.isOk(true);
    }
}