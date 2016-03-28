(function() {
    var element, touch;

    function click(element, x, y) {
        element.trigger($.Event("click", { pageX: x, pageY: y}));
    }

    /* global press */
    /* global move */
    /* global release */
    module("touch events", {
        setup: function() {
            element = $("<i />");
            touch = element.kendoTouch().data("kendoTouch");
        },
        teardown: function() {
            touch.destroy();
        }
    });

    test("triggers touchstart on press", 1, function() {
        touch.bind("touchstart", function() {
            ok(true);
        });

        press(element);
    });

    test("triggers dragstart on press + move", 1, function() {
        touch.bind("dragstart", function() {
            ok(true);
        });

        press(element, 10, 10);
        move(element, 18, 18);
    });

    test("triggers drag on press + move", 1, function() {
        touch.bind("drag", function() {
            ok(true);
        });

        press(element, 10, 10);
        move(element, 18, 18);
    });

    module("tap events (fast tap)", {
        setup: function() {
            element = $("<i />");
            touch = element.kendoTouch({ minHold: 100, doubleTapTimeout: 100, fastTap: true }).data("kendoTouch");
        },
        teardown: function() {
            touch.destroy();
        }
    });

    test("triggers tap on press + release with fastTap", 1, function() {
        touch.bind("tap", function() {
            ok(true);
        });

        press(element, 10, 10);
        release(element, 10, 10);
    });

    test("triggers double tap on two subsequent taps", 1, function() {
        touch.bind("doubletap", function() {
            ok(true);
        });

        press(element, 10, 10);
        release(element, 10, 10);

        press(element, 10, 10);
        release(element, 10, 10);
    });

    test("too distant taps do not trigger double tap", 0, function() {
        touch.bind("doubletap", function() {
            ok(false);
        });

        press(element, 10, 10);
        release(element, 10, 10);

        press(element, 40, 40);
        release(element, 40, 40);
    });

    test("triple tapping triggers double tap once", 1, function() {
        touch.bind("doubletap", function() {
            ok(true);
        });

        press(element, 10, 10);
        release(element, 10, 10);

        press(element, 10, 10);
        release(element, 10, 10);

        press(element, 10, 10);
        release(element, 10, 10);
    });

    test("canceling in touchstart stops tap", 0, function() {
        touch.bind("touchstart", function() {
            touch.cancel();
        });

        touch.bind("tap", function(e) {
            ok(false);
        });

        press(element, 10, 10);
        release(element, 10, 10);
    });

    asyncTest("does not trigger double tap if second one is done after the doubleTapTimeout", 0, function() {
        touch.bind("doubletap", function() {
            ok(false);
        });

        press(element, 10, 10);
        release(element, 10, 10);

        setTimeout(function() {
            start();
            press(element, 10, 10);
            release(element, 10, 10);
        }, 200);
    });

    asyncTest("triggers hold if the threshold has passed", 1, function() {
        touch.bind("hold", function() {
            ok(true);
        });

        press(element, 10, 10);

        setTimeout(function() {
            start();
            release(element, 10, 10);
        }, 120);
    });

    asyncTest("moving the finger voids the  hold", 0, function() {
        touch.bind("hold", function() {
            ok(false);
        });

        press(element, 10, 10);
        move(element, 20, 20);

        setTimeout(function() {
            start();
            release(element, 20, 20);
        }, 120);
    });

    asyncTest("canceling the touchstart voids the  hold", 0, function() {
        touch.bind("touchstart", function() {
            touch.cancel();
        });

        touch.bind("hold", function() {
            ok(false);
        });

        press(element, 10, 10);

        setTimeout(function() {
            start();
            release(element, 20, 20);
        }, 120);
    });

    asyncTest("does not trigger hold if the the user releases before the threshold specified", 0, function() {
        touch.bind("hold", function() {
            ok(false);
        });

        press(element, 10, 10);

        setTimeout(function() {
            release(element);
        }, 10);

        setTimeout(function() {
            start();
        }, 120);
    });

    module("swipe events", {
        setup: function() {
            this.maxDuration = kendo.ui.Touch.fn.options.maxDuration;
            kendo.ui.Touch.fn.options.maxDuration = 100;
            element = $("<i />");
            touch = element.kendoTouch({ enableSwipe: true }).data("kendoTouch");
        },

        teardown: function() {
            touch.destroy();
            kendo.ui.Touch.fn.options.maxDuration = this.maxDuration;
        }
    });

    test("triggers swipe event on a long drag", 1, function() {
        touch.bind("swipe", function() {
            ok(true);
        });

        press(element, 1, 1);
        move(element, 20, 1);
        move(element, 40, 1);
        release(element, 40, 1);
    });

    test("ignores shorter swipes", 0, function(){
        touch.bind("swipe", function() {
            ok(false);
        });

        press(element, 1, 1);
        move(element, 10, 1);
        move(element, 11, 1);
        release(element, 11, 1);
    });

    test("ignores vertical swipes", 0, function() {
        touch.bind("swipe", function() {
            ok(false);
        });

        press(element, 1, 1);
        move(element, 40, 40);
        release(element, 40, 40);
    });

    asyncTest("ignores slow swipe event", 0, function() {
        touch.bind("swipe", function() {
            ok(false);
        });

        press(element, 1, 1);
        move(element, 20, 1);

        setTimeout(function() {
            start();
            move(element, 40, 1);
            release(element, 40, 1);
        }, 200);
    });

    test("detects right swipe", 1, function() {
        touch.bind("swipe", function(e) {
            equal(e.direction, "right");
        });

        press(element, 1, 1);
        move(element, 40, 1);
        release(element, 40, 1);
    });

    test("detects left swipe", 1, function() {
        touch.bind("swipe", function(e) {
            equal(e.direction, "left");
        });

        press(element, 40, 1);
        move(element, 1, 1);
        release(element, 1, 1);
    });

    module("gestures", {
        setup: function() {
            element = $('<div />');
            touch = element.kendoTouch({ multiTouch: true }).data("kendoTouch");

            press(element, 10, 20);
            move(element, 15, 25);
        },
        teardown: function() {
            touch.destroy();
        }
    });

    test("triggers gesturestart on second touch move", 1, function(){
        touch.bind("gesturestart", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    test("provides distance in the gesture start event", 1, function(){
        touch.bind("gesturestart", function(e) {
            equal(e.distance, 10);
        });

        press(element, 15, 15, 2);
        move(element, 30, 30, 2);
    });

    test("provides center in the gesture start event", 2, function(){
        touch.bind("gesturestart", function(e) {
            equal(e.center.x, 20);
            equal(e.center.y, 20);
        });

        press(element, 25, 15, 2);
        move(element, 30, 30, 2);
    });

    test("triggers gesturechange", 1, function(){
        touch.bind("gesturechange", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
    });

    test("triggers gestureend", 1, function(){
        touch.bind("gestureend", function(e) {
            ok(true);
        });

        press(element, 10, 20, 2);
        move(element, 15, 25, 2);
        release(element, 15, 25, 2);
    });

    module("tap events (click)", {
        setup: function() {
            element = $("<i />");
            touch = element.kendoTouch({ minHold: 100, doubleTapTimeout: 100 }).data("kendoTouch");
        },
        teardown: function() {
            touch.destroy();
        }
    });

    test("triggers tap on press + release with fastTap", 1, function() {
        touch.bind("tap", function() {
            ok(true);
        });

        click(element, 10, 10);
    });

    test("triggers double tap on two subsequent taps", 1, function() {
        touch.bind("doubletap", function() {
            ok(true);
        });

        click(element, 10, 10);
        click(element, 10, 10);
    });

    test("too distant taps do not trigger double tap", 0, function() {
        touch.bind("doubletap", function() {
            ok(false);
        });

        click(element, 10, 10);
        click(element, 50, 50);
    });

    test("triple tapping triggers double tap once", 1, function() {
        touch.bind("doubletap", function() {
            ok(true);
        });

        click(element, 10, 10);
        click(element, 10, 10);
        click(element, 10, 10);
    });

    asyncTest("does not trigger double tap if second one is done after the doubleTapTimeout", 0, function() {
        touch.bind("doubletap", function() {
            ok(false);
        });

        click(element, 10, 10);

        setTimeout(function() {
            start();
            click(element, 10, 10);
        }, 200);
    });

    /* global press */
    /* global move */
    /* global release */
    module("touch events (mvvm)", {
        setup: function() {
            element = $("<div data-role=touch data-filter=i><i>I</i><b>B</b></div>");
            kendo.bind(element, {});
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("filter is read from the attribute", function() {
        equal(element.data('kendoTouch').options.filter, 'i')
    })
})();
