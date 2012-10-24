var EventProxy = kendo.EventProxy;

module("Event Proxy");

test("Executes listener event handler", 1, function() {
    var div = $("<div />"),
        proxy = new EventProxy(div, { _click: function() { ok(true) } });

    proxy.on("click", "_click");

    div.trigger("click");
})

test("Recognizes event aliases", 2, function() {
    var div = $("<div />"),
        proxy = new EventProxy(div, { _up: function() { ok(true) } });

    proxy.on("up", "_up");

    div.trigger("mouseup");
    div.trigger("touchend");
})

test("Skips syntetic mouse events", 3, function() {
    var div = $("<div />"),
        proxy = new EventProxy(div, {
            _down: function() { ok(true) },
            _move: function() { ok(true) },
            _up: function() { ok(true) }
        });

    proxy.on("up", "_up");
    proxy.on("move", "_move");
    proxy.on("down", "_down");

    div.trigger("touchstart");
    div.trigger("touchmove");
    div.trigger("touchend");
    div.trigger("mousedown");
    div.trigger("mousemove");
    div.trigger("mouseup");
})

asyncTest("Registers real mouse events", 2, function() {
    var div = $("<div />"),
        proxy = new EventProxy(div, {
            _down: function() { ok(true) }
        });

    proxy.on("down", "_down");

    div.trigger("touchstart");
    div.trigger("touchmove");
    div.trigger("touchend");

    setTimeout(function() {
        start();
        div.trigger("mousedown");
        div.trigger("mousemove");
        div.trigger("mouseup");
    }, 500);
})
