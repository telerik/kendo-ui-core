(function() {
    var $$ = kendo.jQuery;

    module("kendo jQuery", {
        setup: function() {
            kendo.support.touch = true;
        },
        teardown: function() {
            kendo.support.touch = false;
        }
    });

    test("Executes listener event handler", 1, function() {
        var div = $$("<div />").handler({ _click: function() { ok(true) } });

        div.on("click", "_click");

        div.trigger("click");
    });

    test("Unbinds all listeners", 1, function() {
        var div = $$("<div />").handler({ _click: function() { ok(true) } });

        div.autoApplyNS();
        div.on("click", "_click");

        div.trigger("click");
        div.kendoDestroy();
        div.trigger("click");
    });


    // https://developer.mozilla.org/en/DOM/document.createEvent for the insanity below
    function dispatchRealEvent(element, eventType) {
        var evt = document.createEvent("MouseEvents");
          evt.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        element[0].dispatchEvent(evt);
    }

    if (!kendo.support.browser.msie) {
        test("Recognizes event aliases", 2, function() {
            var div = $$("<div />").handler({ _up: function() { ok(true) } });

            div.on("up", "_up");

            div.trigger("mouseup");
            div.trigger("touchend");
        });

        test("Skips synthetic mouse events", 3, function() {
            var mouseAndTouchPresent = kendo.support.mouseAndTouchPresent;
            kendo.support.mouseAndTouchPresent = true;

            try {
                var div = $$("<div />").appendTo(QUnit.fixture).handler({
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
            }
            finally {
                kendo.support.mouseAndTouchPresent = mouseAndTouchPresent;
            }
        });

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
        });
    }

    test("Is instance of jQuery", function() {
        ok($$() instanceof jQuery);
    });

    test("Creates instances of kendo.jQuery", function() {
        ok($$() instanceof $$);
    });

    test("find returns instances of kendo.jQuery", function() {
        ok($$().find("body") instanceof $$);
    });
})();
