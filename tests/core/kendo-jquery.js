var $$ = kendo.jQuery;

kendo.support.touch = true;

module("kendo jQuery");

test("Executes listener event handler", 1, function() {
    var div = $$("<div />").handler({ _click: function() { ok(true) } });

    div.on("click", "_click");

    div.trigger("click");
})

test("Unbinds all listeners", 1, function() {
    var div = $$("<div />").handler({ _click: function() { ok(true) } });

    div.autoApplyNS();
    div.on("click", "_click");

    div.trigger("click");
    div.kendoDestroy();
    div.trigger("click");
})


test("Recognizes event aliases", 2, function() {
    var div = $$("<div />").handler({ _up: function() { ok(true) } });

    div.on("up", "_up");

    div.trigger("mouseup");
    div.trigger("touchend");
})

// https://developer.mozilla.org/en/DOM/document.createEvent for the insanity below
function dispatchRealEvent(element, eventType) {
    var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    element[0].dispatchEvent(evt);
}

test("Skips syntetic mouse events", 3, function() {
    var div = $$("<div />").appendTo(document.body).handler({
            _down: function() { ok(true) },
            _move: function() { ok(true) },
            _up: function() { ok(true) }
        });

    div.on("up", "_up");
    div.on("move", "_move");
    div.on("down", "_down");

    div.trigger("touchstart");
    div.trigger("touchmove");
    div.trigger("touchend");
    dispatchRealEvent(div, "mousedown");
    dispatchRealEvent(div, "mousemove");
    dispatchRealEvent(div, "mouseup");
})

asyncTest("Registers real mouse events", 2, function() {
    var div = $$("<div />").handler({ _down: function() { ok(true) } });

    div.on("down", "_down");

    div.trigger("touchstart");
    div.trigger("touchmove");
    div.trigger("touchend");

    setTimeout(function() {
        start();
        dispatchRealEvent(div, "mousedown");
        dispatchRealEvent(div, "mousemove");
        dispatchRealEvent(div, "mouseup");
    }, 500);
})
