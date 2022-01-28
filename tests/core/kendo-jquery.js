(function() {
    var $$ = kendo.jQuery;

    describe("kendo jQuery", function () {
        beforeEach(function() {
            kendo.support.touch = true;
        });
        afterEach(function() {
            kendo.support.touch = false;
        });

    it("Executes listener event handler", function() {
        var div = $$("<div />").handler({ _click: function() { assert.isOk(true) } });

        div.on("click", "_click");

        div.trigger("click");
    });

    it("Unbinds all listeners", function() {
        var div = $$("<div />").handler({ _click: function() { assert.isOk(true) } });

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
        it("Recognizes event aliases", function() {
            var div = $$("<div />").handler({ _up: function() { assert.isOk(true) } });

            div.on("up", "_up");

            div.trigger("mouseup");
            div.trigger("touchend");
        });

        it("Skips synthetic mouse events", function() {
            var mouseAndTouchPresent = kendo.support.mouseAndTouchPresent;
            kendo.support.mouseAndTouchPresent = true;

            try {
                var div = $$("<div />").appendTo(Mocha.fixture).handler({
                        _down: function() { assert.isOk(true) },
                        _move: function() { assert.isOk(true) },
                        _up: function() { assert.isOk(true) }
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

        it("Registers real mouse events", function(done) {
            var div = $$("<div />").handler({ _down: function() { assert.isOk(true) } });

            div.on("down", "_down");

            div.trigger("touchstart");
            div.trigger("touchmove");
            div.trigger("touchend");

            setTimeout(function() {
                dispatchRealEvent(div, "mousedown");
                dispatchRealEvent(div, "mousemove");
                dispatchRealEvent(div, "mouseup");
                done();
            }, 500);
        });
    }

    it("Is instance of jQuery", function() {
        assert.isOk($$() instanceof jQuery);
    });

    it("Creates instances of kendo.jQuery", function() {
        assert.isOk($$() instanceof $$);
    });

    it("find returns instances of kendo.jQuery", function() {
        assert.isOk($$().find("body") instanceof $$);
    });
    });
}());
