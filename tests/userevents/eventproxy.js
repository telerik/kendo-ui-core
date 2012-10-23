var EventProxy = kendo.EventProxy;

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
